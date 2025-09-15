const express = require('express'); // Import the Express framework
const router = express.Router(); // Create an Express router instance
const User = require('../models/user'); // Import the User model
const Cost = require('../models/cost'); // Import the Cost model

// Route: Add a new user => POST /api/users/add
// Required body: { id, first_name, last_name, birthday }
// Returns: the created user as JSON (or JSON error)

router.post('/add', async (req, res) => {
    // Pino log: entering endpoint
    req.log?.info({ action: 'ENDPOINT_USERS_ADD_ENTER', body: req.body }, 'add user called');

    try {
        const { id, first_name, last_name, birthday, marital_status} = req.body;

        // Basic validation (avoid rejecting 0 with "!" checks)
        if (id == null || !first_name || !last_name || !birthday || !marital_status) {
            return res.status(400).json({
                error: 'Bad Request',
                message: "Missing required fields: 'id', 'first_name', 'last_name', 'birthday', or 'marital_status'."
            });
        }

        // Ensure numeric id and prevent duplicates
        const numericId = Number(id);
        if (Number.isNaN(numericId)) {
            return res.status(400).json({ error: 'Bad Request', message: 'id must be a number' });
        }

        const exists = await User.findOne({ id: numericId }).lean();
        if (exists) {
            return res.status(409).json({ error: 'Conflict', message: `User ${numericId} already exists` });
        }

        // Create and save the user
        const user = new User({
            id: numericId,
            first_name,
            last_name,
            birthday: new Date(birthday),
            marital_status 
        });

        const savedUser = await user.save();

        // Pino log: success
        req.log?.info({ action: 'ENDPOINT_USERS_ADD_SUCCESS', id: savedUser.id }, 'user saved');

        return res.status(200).json(savedUser);
    } catch (err) {
        // Pino log: error
        req.log?.error({ action: 'ENDPOINT_USERS_ADD_ERROR', err: err.message }, 'failed to add user');

        console.error('Error adding user:', err);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: `An error occurred while adding the user: ${err.message}`
        });
    }
});


// Route: List of all users => GET /api/users
// Returns: an array of users as stored in the 'users' collection (or JSON error)
router.get('/', async (req, res) => {
    // Pino log: entering endpoint
    req.log?.info({ action: 'ENDPOINT_USERS_LIST_ENTER' }, 'users list requested');

    try {
        // Fetch all users from MongoDB
        const users = await User.find({}).lean();

        // Pino log: success
        req.log?.info({ action: 'ENDPOINT_USERS_LIST_SUCCESS', count: users.length }, 'users list served');

        return res.json(users);
    } catch (err) {
        // Pino log: error
        req.log?.error({ action: 'ENDPOINT_USERS_LIST_ERROR', err: err.message }, 'failed to list users');

        console.error('Error listing users:', err);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: `An error occurred while listing the users: ${err.message}`
        });
    }
});

// Route: Get user details by ID => { first_name, last_name, id, total }
router.get('/:id', async (req, res) => {
    // Pino log: entering endpoint
    req.log?.info({ action: 'ENDPOINT_USER_DETAILS_ENTER', params: req.params }, 'user details requested');

    try {
        const userId = Number(req.params.id.trim()); // Remove leading and trailing spaces from the ID

        // Validate numeric id
        if (Number.isNaN(userId)) {
            return res.status(400).json({ error: 'Bad Request', message: 'id must be a number' });
        }
        
        // Find the user by ID
        const user = await User.findOne({ id: userId }).lean();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Calculate the total cost for the user (sum over all time)
        const totalCosts = await Cost.aggregate([
            {
                $match: { userid: userId } // Filter costs by user ID
            },
            {
                $group: {
                    _id: null, // Group all results together
                    total: { $sum: '$sum' } // Sum the 'sum' field across all matched documents
                }
            }
        ]);

        // Extract total cost from aggregation result (default to 0 if no costs exist)
        const total = totalCosts.length > 0 ? totalCosts[0].total : 0;

        // Pino log: success
        req.log?.info({ action: 'ENDPOINT_USER_DETAILS_SUCCESS', userid: userId, total }, 'user details served');

        // Return the user details along with total cost
        res.json({
            first_name: user.first_name,
            last_name: user.last_name,
            id: user.id,
            total: total
        });

    } catch (err) {
        // Pino log: error
        req.log?.error({ action: 'ENDPOINT_USER_DETAILS_ERROR', err: err.message }, 'failed to get user details');

        console.error('Error fetching user details:', err);
        res.status(500).json({ error: 'An error occurred while fetching the user details' });
    }
});

// Export the router to make it available for use in other parts of the application
module.exports = router;
