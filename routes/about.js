const express = require('express'); // Import the Express framework
const router = express.Router(); // Create an Express router instance

// Route: Get team member details
router.get('/about', (req, res) => {
    try {
        res.json([
            { first_name: 'Ben', last_name: 'Manteka' },
            { first_name: 'Priel', last_name: 'Tarrab' }
        ]);
    } catch (err) {
        console.error('Error in /api/about:', err);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to fetch team members'
        });
    }
});

// Export the router to make it available for use in other parts of the application
module.exports = router;
