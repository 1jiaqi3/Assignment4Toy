
let request = require('supertest')
describe('loading express', function () {
  let server
  beforeEach(function () {
    this.timeout(50000)
    server = require('../build/dev-server')
  })
  afterEach(function () {
    server.close()
  })
  it('responds to /', function testSlash(done) {
    request(server)
      .post('/v1/reg')
      .send({
        'first_name': 'mnb',
        'last_name': 'mnb',
        'email': 'lkc',
        'password': 'mnb'
      })
      .expect(200, done)
  })
})
