//let mongoose = require('mongoose')

let request = require('supertest')
//var assert = require('assert')
//var db = mongoose.connect('mongodb://127.0.0.1:27017/test',{
 // useMongoClient: true})

// ENSURE EMPTY DATABASE

describe('loading express', function () {
  let server
  beforeEach(function () {
    this.timeout(10000)
    //delete require.cache[require.resolve('../build/dev-server')];
    server = require('../build/dev-server');
    // let db = mongoose.connect('URL', {
    // useMongoClient: true})
    //db.connection.db.dropDatabase()
  })
  afterEach(function () {
    server.close()
  })
  it('load server', function setUp(done){
    request(server)
      .get('/v1/test')
      .expect(404, done)
  })

  it('test registration for new email login', function testRoute(done) {
    request(server)
      .post('/v1/googlelogin')
      .send({
        'name': 'Tim Tom Tum',
        'email': 'ms@columbia.edu'
      })
      .expect(200, done)
  });

  it('test registration for new email login', function testRoute(done) {
    request(server)
      .post('/v1/googlelogin')
      .send({
        'name': 'Pim Pom Pum',
        'email': 'ps@columbia.edu'
      })
      .expect(200, done)
  });

  it('test signing for existing email login', function testRoute(done) {
    request(server)
      .post('/v1/googlelogin')
      .send({
        'name': 'Tim Tom Tum',
        'email': 'ms@columbia.edu'
      })
      .expect(200, done)
  });

  it('test account', function testRoute(done) {
    request(server)
      .post('/v1/account')
      .send({
        'email': 'ms@columbia.edu'
      })
      .expect(200, done)
  });

  let bid;
  var getbid = function(res) {
    bid = res.body.book._id;
    console.log("get bid")
    console.log(bid);
  };
  it('test add book', function testRoute(done) {
    request(server)
      .post('/v1/addbook')
      .send({
        'email': 'ms@columbia.edu',
        'title': 'Introduction to Psychology',
        'author': 'Adam',
        'remarks': 'new, paper'
      })
      .expect(200)
      .expect(getbid)
      .end(done)
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
  });

  it('test getbooks', function testRoute(done) {
    request(server)
      .post('/v1/getbooks')
      .send({
        'email': 'ms@columbia.edu'
      })
      .expect(200, done)
  });

  it('test getbooks with invalid email', function testRoute(done) {
    request(server)
      .post('/v1/getbooks')
      .send({
        'email': 'zz@columbia.edu',
      })
      .expect(400, done)
  })
  it('test sendreq', function testRoute(done) {
     request(server)
       .post('/v1/sendreq')
       .send({
         'from' : 'ps@columbia.edu',
         'to': 'ms@columbia.edu',
         'bid': bid
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
      }).expect(200, done)
  });

})
