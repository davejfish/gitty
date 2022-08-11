const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#DELETE /sessions should return 401 when not signed in', async () => {
    const response = await request(app).delete('/api/v1/github/sessions');
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: 401,
      message: 'You must be signed in to continue',
    });
  });

  afterAll(() => {
    pool.end();
  });

  it('should login and redirect users to /api/v1/github/dashboard', async () => {
    const response = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);
      
    expect(response.body).toEqual({
      id: expect.any(String),
      username: 'fraud',
      email: 'fraud@scam.com',
      avatar: expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });
});

