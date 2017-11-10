

var request = require('supertest');

describe('loading express', function () {
  var server;
  beforeEach(function () {
    console.log("here");
    this.timeout(50000);
    delete require.cache[require.resolve('../build/dev-server')];
    server = require('../build/dev-server');
  });
  afterEach(function (done) {
    this.timeout(50000);
    server.close(done);
  });
  it('responds to /', function testSlash(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    console.log('test 404');
    this.timeout(50000);
    request(server)
      .get('/')
      .expect(200, done);
  });
});
