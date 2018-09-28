const request = require('supertest');
const server = require('../../src/server/index.js');

describe('loading express', () => {
  it('returns 200 for relevant routes', (done) => {
    request(server).get('/').expect(200, done);
  });

  it('returns 404 for paths not found', (done) => {
    request(server).get('/foo/another').expect(404, done);
  });
});
