const coBody = require('co-body')
const { getDeviceInfo } = require('../utils/device')
const ErrorService = require('../service/error')

class ErrorController {
    constructor(ctx) {
        this.ctx = ctx
    }

    async saveErrorFromBeacon() {
        const userAgent = getDeviceInfo(this.ctx)
        await coBody.json(this.ctx.req).then(data => {
            data.userAgent = userAgent
            const response = new ErrorService(this.ctx).handleError(data)
            this.ctx.body = response
        })
    }

    saveErrorUseGet() {
        const userAgent = getDeviceInfo(this.ctx)
        let data = JSON.parse(this.ctx.request.query.error || '{}')
        data.userAgent = userAgent
        const response = new ErrorService(this.ctx).handleError(data)
        this.ctx.body = response
    }

    saveErrorUsePost() {
        const userAgent = getDeviceInfo(this.ctx)
        let data = this.ctx.request.body ? this.ctx.request.body : {}
        data.userAgent = userAgent
        const response = new ErrorService(this.ctx).handleError(data)
        this.ctx.body = response
    }
}

module.exports = ErrorController
