
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

  it('test registration', function testRoute(done) {
    request(server)
      .post('/v1/reg')
      .send({
        'first_name': 'Mary',
        'last_name': 'Smith',
        'email': 'ms@columbia.edu',
        'password': 'passpass'
      })
      .expect(200, done)
  });

  it('test registration for u2', function testRoute(done) {
    request(server)
      .post('/v1/reg')
      .send({
        'first_name': 'John',
        'last_name': 'Smith',
        'email': 'js@columbia.edu',
        'password': 'passpass'
      })
      .expect(200, done)
  });

  it('test log in', function testRoute(done) {
    request(server)
      .post('/v1/login')
      .send({
        'email': 'ms@columbia.edu',
        'password': 'passpass'
      })
      .expect(200, done)
  });

  it('test add book', function testRoute(done) {
    request(server)
      .post('/v1/addbook')
      .send({
        'email': 'ms@columbia.edu',
        'title': 'Introduction to Psychology',
        "author": 'Adam',
        'remarks': 'new, paper'
      })
      .expect(200, done)

  });

  let bid;
  it('test getbook', function testRoute(done) {
    request(server)
      .post('/v1/getbook', function(err, res) {
        // bid = res.body[0].bid;
      })
      .send({
        'email': 'ms@columbia.edu'
      })

      .expect(200, done)
  });

  // it('test sendreq', function testRoute(done) {
  //   request(server)
  //     .post('/v1/sendreq')
  //     .send({
  //       'from' : 'js@columbia.edu',
  //       'to': 'ms@columbia.edu',
  //       'bid':bid
  //     })
  //     .expect(200, done)
  // });

  it('test getreqs', function testRoute(done) {
    request(server)
      .post('/v1/getreqs')
      .send({
        'email': 'ms@columbia.edu'
      })
      .expect(200, done)
  });
})
