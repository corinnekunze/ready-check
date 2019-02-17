const request = require('supertest');
const server = require('../index');

describe('node server', () => {
  it('returns 200 for relevant routes', () => {
    // Expectation using promise
    return request(server).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
    });
  });

  it('returns 404 for paths not found', () => {
    // Supertest Syntax way
    request(server).get('/foo/another').expect(404);
  });
});
