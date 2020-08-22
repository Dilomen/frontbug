const request = require('supertest');
const app = require('../app')
const agent = request.agent(app)
module.exports = agent
describe('GET /', function() {
  it('获取文件内容', function(done) {
    agent
      .get('/')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});





// const request = require('supertest');

// request(app)
//   .get('/user')
//   .expect('Content-Type', /json/)
//   .expect('Content-Length', '15')
//   .expect(200)
//   .end(function(err, res) {
//     if (err) throw err;
//   });

//   describe('GET /user', function() {
//     it('responds with json', function(done) {
//       request(app)
//         .get('/user')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200, done);
//     });
//   });


//   describe('POST /users', function() {
//     it('responds with json', function(done) {
//       request(app)
//         .post('/users')
//         .send({name: 'john'})
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .end(function(err, res) {
//           if (err) return done(err);
//           done();
//         });
//     });
//   });