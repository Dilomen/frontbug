const agent = require('./index')

// 正常数据
const errorData = {
  columnNo: 452,
  eventsRecord: [],
  framework: true,
  lineNo: 1,
  msg: "a is not defined",
  path: "main.3b12361d.chunk.js",
  url: "http://localhost:3090/",
  error: 'Error: a is not defined\n' +
    '    at t.value (http://localhost:3090/static/js/main.3b12361d.chunk.js:1:452)\n' +
    '    at jo (http://localhost:3090/static/js/2.e02c90b3.chunk.js:2:86155)\n' +
    '    at Do (http://localhost:3090/static/js/2.e02c90b3.chunk.js:2:85948)\n' +
    '    at ya (http://localhost:3090/static/js/2.e02c90b3.chunk.js:2:121859)\n'
}

const errorURLdata = `http://localhost:3090/errorRequest?%7B%22path%22%3A%22app.js%22%2C%22lineNo%22%3A5376%2C%22columnNo%22%3A27%2C%22msg%22%3A%22Initialize%20failed%3A%20invalid%20dom.%22%2C%22error%22%3A%22Error%3A%20Initialize%20failed%3A%20invalid%20dom.%5Cn%20%20%20%20at%20Object.init%241%20%5Bas%20init%5D%20(https%3A%2F%2Fcdn.bootcdn.net%2Fajax%2Flibs%2Fecharts%2F5.0.0-alpha.1%2Fecharts.common.js%3A27041%3A15)%5Cn%20%20%20%20at%20VueComponent.mounted%20(http%3A%2F%2Flocalhost%3A8081%2Fapp.js%3A5376%3A27)%5Cn%20%20%20%20at%20invokeWithErrorHandling%20(http%3A%2F%2Flocalhost%3A8081%2Fapp.js%3A21491%3A57)%5Cn%20%20%20%20at%20callHook%20(http%3A%2F%2Flocalhost%3A8081%2Fapp.js%3A23851%3A7)%5Cn%20%20%20%20at%20Object.insert%20(http%3A%2F%2Flocalhost%3A8081%2Fapp.js%3A22774%3A7)%5Cn%20%20%20%20at%20invokeInsertHook%20(http%3A%2F%2Flocalhost%3A8081%2Fapp.js%3A25974%3A28)%5Cn%20%20%20%20at%20Vue.patch%20%5Bas%20__patch__%5D%20(http%3A%2F%2Flocalhost%3A8081%2Fapp.js%3A26193%3A5)%5Cn%20%20%20%20at%20Vue._update%20(http%3A%2F%2Flocalhost%3A8081%2Fapp.js%3A23577%3A19)%5Cn%20%20%20%20at%20Vue.updateComponent%20(http%3A%2F%2Flocalhost%3A8081%2Fapp.js%3A23698%3A10)%5Cn%20%20%20%20at%20Watcher.get%20(http%3A%2F%2Flocalhost%3A8081%2Fapp.js%3A24111%3A25)%22%2C%22eventsRecord%22%3A%5B%5D%2C%22url%22%3A%22http%3A%2F%2Flocalhost%3A8081%2F%22%2C%22framework%22%3Atrue%7D`

describe('POST /errorRequest', function() {
  it('post错误上传', function(done) {
    agent
      .post('/errorRequest')
      .send(errorData)
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
      .send(errorURLdata)
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
      .send(errorData)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
})

const CDNError = {
  columnNo: 1779,
  error: "Error: Initialize failed: invalid dom.↵    at Object.init$1 [as init] (https://cdn.bootcdn.net/ajax/libs/echarts/5.0.0-alpha.1/echarts.common.js:27041:15)↵    at a.mounted (http://localhost:3090/js/app.4cf1b5ee.js:1:1779)↵    at ne (http://localhost:3090/js/chunk-vendors.0013f18c.js:7:11677)↵    at Dn (http://localhost:3090/js/chunk-vendors.0013f18c.js:7:29145)↵    at Object.insert (http://localhost:3090/js/chunk-vendors.0013f18c.js:7:20796)↵    at $ (http://localhost:3090/js/chunk-vendors.0013f18c.js:7:47562)↵    at Or.__patch__ (http://localhost:3090/js/chunk-vendors.0013f18c.js:7:48878)↵    at Or.In.t._update (http://localhost:3090/js/chunk-vendors.0013f18c.js:7:27008)↵    at Or.r (http://localhost:3090/js/chunk-vendors.0013f18c.js:7:27814)↵    at nr.get (http://localhost:3090/js/chunk-vendors.0013f18c.js:7:30684)",
  eventsRecord: [],
  framework: true,
  lineNo: 1,
  msg: "Initialize failed: invalid dom.",
  path: "app.4cf1b5ee.js",
  url: "http://localhost:3090/",
}

describe('POST /errorRequest', function() {
  it('post错误上传', function(done) {
    agent
      .post('/errorRequest')
      .send(CDNError)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
})