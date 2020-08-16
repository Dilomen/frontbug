const sourceMap = require('source-map');
const fs = require('fs');
const path = require('path');
let sourcesPathMap = {};
function fixPath(filepath) {
  return filepath.replace(/\.[\.\/]+/g, '');
}
async function loopSourceMap(filepath, line, column, callback) {
  let data
  try { data = fs.readFileSync(path.resolve(__dirname, './map/' + filepath), 'utf-8'); } catch(e) { data = false }
  if (!data) return {}
  var fileContent = data.toString(),
    fileObj = JSON.parse(fileContent),
    sources = fileObj.sources;
  sources.map((item) => {
    sourcesPathMap[fixPath(item)] = item;
  });
  var consumer = await new sourceMap.SourceMapConsumer(fileContent);
  var lookup = {
    line: parseInt(line),
    column: parseInt(column),
  };
  //
  var result = consumer.originalPositionFor(lookup);
  var originSource = sourcesPathMap[result.source],
  // 在gragh数组中找到对应模块下的代码
    sourcesContent = fileObj.sourcesContent[sources.indexOf(originSource)];
    consumer.sourceContentFor(originSource)
  result.sourcesContent = sourcesContent;
  callback && callback(result);
  // 当consumer不再使用，必须调用destroy
  // consumer && consumer.destroy();
}

module.exports = loopSourceMap