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
      .expect(200, done)
  })
  let uid1;
  var getuid1 = function(res) {
    uid1 = res.body.id;
    console.log("get uid")
    console.log(uid1);
  };

  it('test registration for new email login', function testRoute(done) {
    this.timeout(10000)
    request(server)
      .post('/v1/googlelogin')
      .send({
        'name': 'Tim Tom Tum',
        'email': 'ms@columbia.edu'
      })
      .expect(200)
      .expect(getuid1)
      .end(done)
  });

  it('test registration for new email login 2', function testRoute(done) {
    request(server)
      .post('/v1/googlelogin')
      .send({
        'name': 'Pim Pom Pum',
        'email': 'ps@columbia.edu'
      })
      .expect(200, done)
  });
  let uid;
  var getuid = function(res) {
    uid = res.body.id;
    console.log("get uid")
    console.log(uid);
  };
  it('test registration for new email login 3', function testRoute(done) {
    this.timeout(10000)
    request(server)
      .post('/v1/googlelogin')
      .send({
        'name': 'Kim Kom Kum',
        'email': 'ks@columbia.edu'
      })
      .expect(200)
      .expect(getuid)
      .end(done)
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

  it('test account for existing email', function testRoute(done) {
    request(server)
      .post('/v1/account')
      .send({
        'email': 'ms@columbia.edu'
      })
      .expect(200, done)
  });
  it('test account for non-existing email', function testRoute(done) {
    request(server)
      .post('/v1/account')
      .send({
        'email': 'ts@columbia.edu'
      })
      .expect(404, done)
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
  it('test getbooks with valid email, but no books', function testRoute(done) {
    request(server)
      .post('/v1/getbooks')
      .send({
        'email': 'ks@columbia.edu',
      })
      .expect(400, done)
  })
  it('test getbook', function testRoute(done) {
    request(server)
      .post('/v1/getbook')
      .send({
        'bid': bid,
      })
      .expect(200, done)
  })
  it('test getbook with invalid bid', function testRoute(done) {
    request(server)
      .post('/v1/getbook')
      .send({
        'bid': '555',
      })
      .expect(400, done)
  })
  it('test getuser with valid uid', function testRoute(done) {
    request(server)
      .post('/v1/getuser')
      .send({
        'uid': uid
      })
      .expect(200, done)
  })
  it('test getuser with valid email', function testRoute(done) {
    request(server)
      .post('/v1/getuser')
      .send({
        'email': 'ks@columbia.edu'
      })
      .expect(200, done)
  })
  it('test getuser with invalid email', function testRoute(done) {
    request(server)
      .post('/v1/getuser')
      .send({
        'email': 'ts@columbia.edu'
      })
      .expect(400, done)
  })
  it('test getuser with invalid uid', function testRoute(done) {
    request(server)
      .post('/v1/getuser')
      .send({
        'uid': '555'
      })
      .expect(400, done)
  })
  let rObj;
  var getrObj = function(res) {
    rObj = res.body;
    console.log("get rObj")
    console.log(rObj);
  };

  it('test sendreq', function testRoute(done) {
    request(server)
      .post('/v1/sendreq')
      .send({
        'from' : 'ps@columbia.edu',
        'to': uid1,
        'bid': bid
      })
      .expect(200)
      .expect(getrObj)
      .end(done)
  });
  it('test sendreq to self', function testRoute(done) {
    request(server)
      .post('/v1/sendreq')
      .send({
        'from' : 'ms@columbia.edu',
        'to': uid1,
        'bid': bid
      })
      .expect(400, done)
  });
  it('test sendreq to invalid user', function testRoute(done) {
    request(server)
      .post('/v1/sendreq')
      .send({
        'from' : 'ps@columbia.edu',
        'to': '221',
        'bid': bid
      })
      .expect(400, done)
  });
  it('test sendreq from invalid user', function testRoute(done) {
    request(server)
      .post('/v1/sendreq')
      .send({
        'from' : 'ts@columbia.edu',
        'to': uid1,
        'bid': bid
      })
      .expect(400, done)
  });
  it('test sendreq with invalid bid', function testRoute(done) {
    request(server)
      .post('/v1/sendreq')
      .send({
        'from' : 'ps@columbia.edu',
        'to': uid1,
        'bid': '555'
      })
      .expect(400, done)
  });
  it('test sendreq with valid bid and non-owner', function testRoute(done) {
    request(server)
      .post('/v1/sendreq')
      .send({
        'from': 'ps@columbia.edu',
        'to': uid,
        'bid': bid
      })
      .expect(400, done)
  });
  it('test sendreq repeat request', function testRoute(done) {
    request(server)
      .post('/v1/sendreq')
      .send({
        'from': 'ps@columbia.edu',
        'to': uid1,
        'bid': bid
      })
      .expect(401, done)
  });

  it('test getreqs', function testRoute(done) {
    request(server)
      .post('/v1//getRecvReqs')
      .send({
        'email': 'ms@columbia.edu'
      })
      .expect(200, done)
  });
  it('test getreqs with invalid user', function testRoute(done) {
    request(server)
      .post('/v1//getRecvReqs')
      .send({
        'email': 'ts@columbia.edu'
      })
      .expect(400, done)
  });
  it('test getreqs with valid user with no requests', function testRoute(done) {
    request(server)
      .post('/v1//getRecvReqs')
      .send({
        'email': 'ps@columbia.edu'
      })
      .expect(400, done)
  });

  it('test getSentReqs', function testRoute(done) {
    request(server)
      .post('/v1//getSentReqs')
      .send({
        'email': 'ms@columbia.edu'
      })
      .expect(200, done)
  });
  it('test getSentReqs with invalid user', function testRoute(done) {
    request(server)
      .post('/v1//getSentReqs')
      .send({
        'email': 'ts@columbia.edu'
      })
      .expect(400, done)
  });

  it('test getunread', function testRoute(done) {
    request(server)
      .post('/v1/getUnread')
      .send({
        'email': 'ms@columbia.edu'
      })
      .expect(200, done)
  });

  it('test getreq', function testRoute(done) {
    request(server)
      .post('/v1/getreq')
      .send({
        'rid': rObj._id,
      })
      .expect(200, done)
  });

  it('test acceptreq', function testRoute(done) {
    request(server)
      .post('/v1/acceptreq')
      .send({
        'req_id': rObj._id,
        'bid': rObj.bid,
        'uid': rObj._from
      })
      .expect(200, done)
  });
  it('test acceptreq with accepted request', function testRoute(done) {
    request(server)
      .post('/v1/acceptreq')
      .send({
        'req_id': rObj._id,
        'bid': rObj.bid,
        'uid': rObj._from
      })
      .expect(400, done)
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
