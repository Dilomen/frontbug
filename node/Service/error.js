const loopSourceMap = require('../utils/loopSourceMap');
const dayjs = require('dayjs');
const axios = require('axios')
class ErrorService {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async handleError(data = {}) {
    const {
      url:excepUrl = '',
      msg:excepMsg = '',
      path:excepFilePath = '',
      lineNo:excepLine = '',
      columnNo:excepColumn = '',
      error:excepStack = '',
      framework = false,
      userAgent:excepUserAgent = {},
      eventsRecord = [],
      // network部分
      errorInfo = '',
      requestUrl = '',
      status = '',
      type = ''
    } = data;
    const happenTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    let errorData = { excepMsg, userAgent, excepUrl, eventsRecord, excepStack, errorInfo, requestUrl, status, type, excepFilePath };
    if (framework) {
        const sourceData = await loopSourceMap(excepFilePath + '.map', excepLine, excepColumn)
        const { sourcesContent, line, source, column } = sourceData;
        const sourceContentArr = sourcesContent.split('\n');
        errorData = { ...errorData, excepContent: sourceContentArr.slice(line - 4, line + 3), exepLine, exepColumn, source };
    } else {
        errorData = {
        ...errorData,
        column: columnNo,
        line: lineNo,
        source: path,
      };
    }
    const response = await this.sendError(errorData).catch(() => {})
    return response;
  }

  sendError(data) {
    return axios({
      url: '',
      method: 'post',
      data: errorData
    })
  }
}

module.exports = ErrorService;
