const request = require('supertest');
const app = require('../src/bin/www');

describe('Test user not found', () => {
  test(' the user GET method', async done => {
    const response = await request(app).get('/api/user/123');
    expect(response.statusCode).toBe(200);
    done();
  });
});
