var cluster = require('cluster')
var cpus = require('os').cpus()

cluster.setupMaster({
  exec: './app.js'
})

for (let i = 0; i < cpus.length; i++) {
  cluster.fork()
}

cluster.on('exit', (worker, code, signal) => {
  console.log('worker ' + worker.process.pid + ' died')
  cluster.fork()
})

console.log("http://localhost:3090")