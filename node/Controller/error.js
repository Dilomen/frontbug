const coBody = require('co-body')
const { getDeviceInfo } = require('../utils/device')
const ErrorService = require('../Service/error')

class ErrorController {
    constructor(ctx) {
        this.ctx = ctx
    }

    async saveErrorFromBeacon() {
        const userAgent = getDeviceInfo(this.ctx)
        await coBody.json(this.ctx.req).then(data => {
            data.userAgent = userAgent
            const result = new ErrorService(this.ctx).handleError(data)
            this.ctx.body = result ? { code: 200, msg: '上报成功' } : { msg: '上报失败' }
        })
    }

    saveErrorUseGet() {
        const userAgent = getDeviceInfo(this.ctx)
        let data = JSON.parse(JSON.parse(Object.keys(this.ctx.request.query)[0]))
        data.userAgent = userAgent
        const result = new ErrorService(this.ctx).handleError(data)
        this.ctx.body = result ? { code: 200, msg: '上报成功' } : { msg: '上报失败' }
    }

    saveErrorUsePost() {
        const userAgent = getDeviceInfo(this.ctx)
        this.ctx.request.body = this.ctx.request.body ? this.ctx.request.body : {}
        this.ctx.request.body.userAgent = userAgent
        const result = new ErrorService(this.ctx).handleError(data)
        this.ctx.body = result ? { code: 200, msg: '上报成功' } : { msg: '上报失败' }
    }
}

module.exports = ErrorController
