// tests/seed.js
const User = require('../models/user');
const Cost = require('../models/cost');
const Log = require('../models/log');

async function seedLogsBasic() {
  await Log.create([
    { action: 'HTTP_REQUEST', userid: 1, payload: { msg: 'req1' } },
    { action: 'LOG',          userid: 2, payload: { msg: 'req2' } },
  ]);
}

async function seedUsers() {
  await User.create([
    { id: 1, first_name: 'John', last_name: 'Doe', birthday: new Date('1990-01-01'), marital_status: 'single' },
    { id: 2, first_name: 'Alice', last_name: 'Lee', birthday: new Date('1995-06-15'), marital_status: 'single' },
  ]);
}

async function seedCosts() {
  // all the seed costs define to the same month date (february) for the report
  await Cost.create([
    { userid: 1, sum: 200, category: 'housing', description: 'rent',    date: new Date('2025-02-01') },
    { userid: 1, sum: 100, category: 'food',    description: 'pizza',   date: new Date('2025-02-10') },
    { userid: 1, sum:  50, category: 'health',  description: 'vitamins',date: new Date('2025-02-11') },
  ]);
}

module.exports = { seedUsers, seedCosts, seedLogsBasic };
