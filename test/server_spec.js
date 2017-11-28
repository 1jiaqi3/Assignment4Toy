//let mongoose = require('mongoose')

let request = require('supertest')
describe('loading express', function () {
  let server
  beforeEach(function () {
    this.timeout(50000)
    server = require('../build/dev-server')
    // let db = mongoose.connect('URL', {
  // useMongoClient: true})
    //db.connection.db.dropDatabase()
  })
  afterEach(function () {
    server.close()
  })

  it('test registration', function testRoute(done) {
    request(server)
      .post('/v1/reg')
      .send({
        'first_name': 'Mar',
        'last_name': 'Smith',
        'email': 'ms@columbia.edu4',
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
        'email': 'js@columbia.edu4',
        'password': 'passpass'
      })
      .expect(200, done)
  });

  it('test registration for an existent account', function testRoute(done) {
    request(server)
      .post('/v1/reg')
      .send({
        'first_name': 'John1',
        'last_name': 'Smith1',
        'email': 'js@columbia.edu',
        'password': 'passpass'
      })
      .expect(401, done)
  });

  it('test account', function testRoute(done) {
    request(server)
      .post('/v1/account')
      .send({
        'email': 'js@columbia.edu'
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

  it('test invalid log in', function testRoute(done) {
    request(server)
      .post('/v1/login')
      .send({
        'email': 'ms@columbia.edu',
        'password': 'pass'
      })
      .expect(401, done)
  });

  it('test add book', function testRoute(done) {
    request(server)
      .post('/v1/addbook')
      .send({
        'email': 'ms@columbia.edu',
        'title': 'Introduction to Psychology',
        'author': 'Adam',
        'remarks': 'new, paper'
      })
      .expect(200, done)
  });

  it('test add book with invalid email', function testRoute(done) {
    request(server)
      .post('/v1/addbook')
      .send({
        'email': 'zz@columbia.edu',
        'title': 'nothing',
        'author': 'nothing',
        'remarks': 'nothing'
      })
      .expect(400, done)
  })

  let bid;
  it('test getbook', function testRoute(done) {
    request(server)
      .post('/v1/getbook')
      .send({
        'email': 'ms@columbia.edu'
      })
      .expect(200, done)
  });

  it('test getbook with invalid email', function testRoute(done) {
    request(server)
      .post('/v1/getbook')
      .send({
        'email': 'zz@columbia.edu',
      })
      .expect(400, done)
  })
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

  it('test getreqs', function testRoute(done) {
    request(server)
      .post('/v1/getreqs')
      .send({
        'email': 'ms@columbia.edu'
      })
      .expect(200, done)
  });
  it('test search', function testRoute(done) {
    request(server)
      .post('/v1/search')
      .send({
        'titleOrAuthor': 'Adam'
      })
      .expect(200, done)
  });
  it('test search with blank string', function testRoute(done) {
    request(server)
      .post('/v1/search')
      .send({
        'titleOrAuthor': ''
      })
      .expect(200, done)
  });
  it('test search with blank spaces', function testRoute(done) {

    request(server)
      .post('/v1/search')
      .send({
        'titleOrAuthor': '   '
      })
      .expect(200, done)
  });
  it('test search with blanks on either side of term', function testRoute(done) {
    request(server)
      .post('/v1/search')
      .send({
        'titleOrAuthor': ' Adam '
      })
      .expect(200, done)
  });
  it('test search with two terms', function testRoute(done) {
    request(server)
      .post('/v1/search')
      .send({
        'titleOrAuthor': 'Adam Psychology'
      })
      .expect(200, done)
  });

})
