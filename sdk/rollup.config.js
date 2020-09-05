import path from 'path'
import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'

const extensions = ['.js', '.ts'];

const resolve = function(...args) {
  return path.resolve(__dirname, ...args);
};

const jobs = {
  esm: {
    output: {
      format: 'esm',
      file: resolve(pkg.module),
      name: 'vangen'
    },
  },
  umd: {
    output: {
      format: 'umd',
      file: resolve(pkg.main),
      name: 'vangen',
    },
  },
  iife: {
    output: {
      format: 'iife',
      file: resolve(pkg.module.replace(/(.\w+)$/, '.iife.js')),
      name: 'vangen',
    }
  },
};

const outputConfig = jobs[process.env.FORMAT || 'esm'];
module.exports = {
  input: resolve('./src/index.ts'),
  ...outputConfig,
  plugins: [
    nodeResolve({
      extensions,
      // modulesOnly: true
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      extensions,
      babelHelpers: 'runtime'
    }),
  ],
};
