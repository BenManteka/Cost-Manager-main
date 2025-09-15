const request = require('supertest');
const app = require('../index');

describe('GET /api/about', () => {
  it('returns team members', async () => {
    const res = await request(app).get('/api/about');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // minimal check for input right the names filed ( first_name, last_name)
    const names = res.body.map(x => `${x.first_name} ${x.last_name}`.toLowerCase());
    expect(names).toEqual(expect.arrayContaining(['ben manteka', 'priel tarrab']));
  });
});
