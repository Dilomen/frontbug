// rollup.config.js
const json = require('rollup-plugin-json');
// rollup-plugin-node-resolve 插件可以告诉 Rollup 如何查找外部模块
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
// 使用babel
const babel = require('rollup-plugin-babel');

module.exports = {
  input: "./lib/report.js",
  output: [{
    name: 'index.js',
    file: 'es/index.js',
    format: 'es',
    minify: true
  }, {
    name: 'index.js',
    file: 'iife/index.js',
    format: 'iife',
    minify: true
  }],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      extensions: ['js', 'jsx']
    }),
    json()]
}

