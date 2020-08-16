const loopSourceMap = require('../utils/loopSourceMap')
const dayjs = require('dayjs')
class ErrorService {
    constructor(ctx) {
        this.ctx = ctx
    }

    handleError(data = {}) {
        const {url = '', msg = '', path = '', lineNo = '', columnNo = '', error = '', framework = '', stack = '', userAgent = {}, eventsRecord = []} = data
        if (framework) {
            loopSourceMap(path + '.map', lineNo, columnNo, (data) => {
                const {sourcesContent, line, source, column} = data;
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
                // errorList.push(data)
                // res.send({ code: 200, success: '成功' });
                this.ctx.body = data
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
        return true
    }

}

module.exports = ErrorService