// vue.config.js
module.exports = {
  publicPath: './',
  lintOnSave: false,
  configureWebpack: config => {
    // config.module.rules[config.module.rules.length - 2].use.shift()
    // console.log(config.module.rules[config.module.rules.length - 2].use)
    //调试JS
    config.devtool = "source-map";
  },
};
