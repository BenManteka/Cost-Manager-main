const request = require('supertest');
const app = require('../index');
const { seedUsers } = require('./seed');

describe('POST /api/users/add', () => {
  beforeEach(async () => {
    await seedUsers(); // כבר יש id=1 ו-id=2
  });

  it('creates a new user (happy path)', async () => {
    const res = await request(app).post('/api/users/add').send({
      id: 3,
      first_name: 'Bob',
      last_name: 'Miller',
      birthday: '2000-01-01',
      marital_status: 'single'
    });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 3, first_name: 'Bob', last_name: 'Miller' });
  });

  it('409 on duplicate id', async () => {
    const res = await request(app).post('/api/users/add').send({
      id: 2,
      first_name: 'Alice',
      last_name: 'Lee',
      birthday: '1995-06-15',
      marital_status: 'single'
    });
    expect(res.status).toBe(409);
  });

  it('400 on missing fields', async () => {
    const res = await request(app).post('/api/users/add').send({ id: 10 });
    expect(res.status).toBe(400);
  });

  it('400 on non-numeric id', async () => {
    const res = await request(app).post('/api/users/add').send({
      id: 'abc',
      first_name: 'A',
      last_name: 'B',
      birthday: '2000-01-01',
      marital_status: 'single'
    });
    expect(res.status).toBe(400);
  });
});
