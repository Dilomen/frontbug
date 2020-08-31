const loopSourceMap = require('../utils/loopSourceMap');
const dayjs = require('dayjs');
class ErrorService {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async handleError(data = {}) {
    const {
      url = '',
      msg = '',
      path = '',
      lineNo = '',
      columnNo = '',
      error = '',
      framework = '',
      userAgent = {},
      eventsRecord = [],
      // network部分
      errorInfo = '',
      requestUrl = '',
      status = '',
      type = ''
    } = data;
    const happenTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    let errorData = { msg, happenTime, userAgent, url, eventsRecord, error, errorInfo, requestUrl, status, type };
    if (framework) {
        const sourceData = await loopSourceMap(path + '.map', lineNo, columnNo)
        const { sourcesContent, line, source, column } = sourceData;
        const sourceContentArr = sourcesContent.split('\n');
        errorData = { ...errorData, sourcesContent: sourceContentArr.slice(line - 4, line + 3), line, column, source };
    } else {
        errorData = {
        ...errorData,
        column: columnNo,
        line: lineNo,
        source: path,
      };
      console.log(errorData)
    }
    return true;
  }
}

module.exports = ErrorService;
