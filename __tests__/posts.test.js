const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/posts should display a list of posts', async () => {
    const response = await request(app).get('/api/v1/posts');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(4);
    expect(response.body[0]).toEqual({
      id: expect.any(String),
      userID: expect.any(String),
      content: expect.any(String),
    });
  });

  afterAll(() => {
    pool.end();
  });
});

