var log4js = require('log4js');

log4js.configure({
  appenders:{
      std: { type: "stdout", level: "all", layout:{type: "basic", } },
      file: { type: "file", filename: "log.txt", encoding: "utf-8" }
  },
  categories: {
      default: {appenders: ["std"], level: "debug"},
      custom: {appenders: ["std", "file"], level: "all"}
  }
});

var logger = log4js.getLogger("custom");
module.exports = logger