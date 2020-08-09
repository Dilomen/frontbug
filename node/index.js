const Koa = require('koa');
const app = new Koa();
const Router = require("koa-router");
const fs = require('fs');
const bodyParser = require("koa-bodyparser");
const path = require('path');
const loopSourceMap = require('./loopSourceMap')
const router = new Router();
const dayjs = require('dayjs')
const userAgent = require('koa2-useragent');
const coBody = require('co-body')
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
let errorList = []
const file = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8');
router.get("/", async (ctx) => {
  // ctx.body = { msg: "Hello Koa" };
  ctx.body = file
});

router.get('/error-list', async (ctx) => {
  ctx.body = errorList
})

router.get('/error-detail/:id', async (ctx) => {
  const { id = '' } = ctx.params
  const matchError = errorList.filter(item => item.id == id)
  if (matchError.length === 0) {
    ctx.body = { msg: "当前记录不存在", code: 404 }
  }
  ctx.body = matchError[0]
})

router.post('/errorRequestFromBeacon', async (ctx) => {
  const userAgent = getDeviceInfo(ctx)
  const data = await coBody.json(ctx.req).then(data => {
    data.userAgent = userAgent
    handleError(data, ctx)
  })
})

router.post('/errorRequest', async (ctx)  => {
  const userAgent = getDeviceInfo(ctx)
  ctx.request.body = ctx.request.body ? ctx.request.body : {}
  ctx.request.body.userAgent = userAgent
  handleError(ctx.request.body, ctx)
});

router.get('/errorRequest', async (ctx) => {
  // console.log(decodeURIComponent(ctx.request.query))
  const userAgent = getDeviceInfo(ctx)
  let data = JSON.parse(JSON.parse(Object.keys(ctx.request.query)[0]))
  data.userAgent = userAgent
  handleError(data, ctx)
});

function getDeviceInfo (ctx) {
  const { platform, os, browser, version } = ctx.userAgent
  return { platform, os, browser, version }
}

function handleError(data, ctx) {
  const {url = '', msg = '', path = '', lineNo = '', columnNo = '', error = '', framework = '', stack = '', userAgent = {}, eventsRecord = [] } = data
  console.log(data)
  if (framework) {
    loopSourceMap(path + '.map', lineNo, columnNo, (data) => {
      const { sourcesContent, line, source, column } = data;
      let sourceContentArr = sourcesContent.split('\n');
      data = {
        // 行号是从1开始的，索引是0开始的，slice的第二个参数的不包含的
        sourcesContent: sourceContentArr.slice(line - 4, line + 3),
        msg,
        happenTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        id: new Date().getTime(),
        url,
        userAgent,
        eventsRecord,
        line,
        column,
        source
      }
      errorList.push(data)
      // res.send({ code: 200, success: '成功' });
      ctx.body = data
    })
  } else {
    // const data = {
    //   column: columnNo,
    //   line: lineNo,
    //   errorMsg: msg,
    //   id: new Date().getTime(),
    //   happenTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    //   source: path
    // }
    // console.log(msg)
    // errorList.push(data)
  }
}

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
