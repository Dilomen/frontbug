// ???有没有必要
class FrontError {
  constructor(msg, line, column, url, happenTime, sourcesContent, userAgent) {
    this.msg = msg
    this.line = line
    this.column = column
    this.url = url
    this.happenTime = happenTime
    this.sourcesContent = sourcesContent
    this.userAgent = userAgent
    this.eventsRecord = eventsRecord
    this.source = source
  }
  getAll() {
    
  }
}