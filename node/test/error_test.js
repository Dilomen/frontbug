const agent = require('./index')

describe('POST /errorRequest', function() {
  it('post错误上传', function(done) {
    agent
      .post('/errorRequest')
      .send({url: 'www.asdasd.com', msg: 'sdfasdf', path: 'app.js', lineNo: '11', columnNo: '22', error: 'asdfasd\nasdasd', framework: true, stack: '', eventsRecord: []})
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
})

describe('GET /errorRequest', function() {
  it('responds with json', function(done) {
    agent
      .get('/errorRequest')
      .send({name: 'john'})
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
})

describe('POST /errorRequestFromBeacon', function() {
  it('sendBeacon方式错误上传', function(done) {
    agent
      .post('/errorRequestFromBeacon')
      .send({url: '', msg: '', path: '', lineNo: '', columnNo: '', error: '', framework: '', stack: '', eventsRecord: []})
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
})
