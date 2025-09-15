const request = require('supertest');
const app = require('../index');
const { seedUsers } = require('./seed');

describe('GET /api/users', () => {
  beforeEach(async () => {
    await seedUsers();
  });

  it('lists users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('first_name');
    expect(res.body[0]).toHaveProperty('last_name');
  });
});
