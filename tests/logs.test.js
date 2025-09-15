const request = require('supertest');
const app = require('../index');
const { seedLogsBasic } = require('./seed');

describe('GET /api/logs', () => {
  beforeEach(async () => {
    await seedLogsBasic();
  });

  it('returns logs with default limit ≤ 50', async () => {
    const res = await request(app).get('/api/logs');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeLessThanOrEqual(50);
  });

  it('filters by userid', async () => {
    const res = await request(app).get('/api/logs?userid=1');
    expect(res.status).toBe(200);
    expect(res.body.every(l => l.userid === 1 || l.userid === '1')).toBe(true);
  });

  it('respects explicit limit', async () => {
    const res = await request(app).get('/api/logs?limit=1');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeLessThanOrEqual(1);
  });
});
