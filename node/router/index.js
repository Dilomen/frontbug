const Router = require("koa-router");
const router = new Router();
const fs = require('fs')
const path = require('path');
const ErrorController = require('../controller/error')
const file = fs.readFileSync(path.resolve(__dirname, '../public/dist/index.html'), 'utf-8');
router.get("/", async (ctx) => {
    ctx.body = file
});
router.post("/errorRequestFromBeacon", async (ctx) => new ErrorController(ctx).saveErrorFromBeacon());
router.get("/errorRequest", async (ctx) => new ErrorController(ctx).saveErrorUseGet());
router.post("/errorRequest", async (ctx) => new ErrorController(ctx).saveErrorUsePost());

module.exports = router