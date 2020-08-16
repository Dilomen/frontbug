const Koa = require('koa');
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const userAgent = require('koa2-useragent');
const KoaStatic = require('koa-static');
app.use((async function(ctx,next){
  if (ctx.path === '/errorRequestFromBeacon') ctx.disableBodyParser = true;//判断请求的路由路径
  await next();
})).use(bodyParser())
app.use(userAgent());
//设置跨域访问
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  ctx.set("X-Powered-By", ' 3.2.1')
  // ctx.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  await next();
})

// let errorList = []
const router = require('./router/index')
//
// router.get('/error-list', async (ctx) => {
//   ctx.body = errorList
// })
//
// router.get('/error-detail/:id', async (ctx) => {
//   const { id = '' } = ctx.params
//   const matchError = errorList.filter(item => item.id == id)
//   if (matchError.length === 0) {
//     ctx.body = { msg: "当前记录不存在", code: 404 }
//   }
//   ctx.body = matchError[0]
// })


// let cache = {}
// app.post('/upload', (req, res) => {
//   cache = req.body
// });
//
// app.get('/video', (req, res) => {
//   console.log(cache)
//   res.send(JSON.stringify(cache))
// })


app.use(router.routes())
    .use(router.allowedMethods())
    .use(KoaStatic('./dist'))
    .use(KoaStatic('./build'))
    .use(KoaStatic('./map'));
app.listen('3090', () => console.log('http://localhost:3090'));
