/* eslint-disable @typescript-eslint/no-var-requires */
const json = require('@rollup/plugin-json')
const typescript = require('rollup-plugin-typescript2')
// const {
//   cleandir
// } = require('rollup-plugin-cleandir')
const {
  nodeResolve
} = require('@rollup/plugin-node-resolve')

const extensions = ['.js', '.ts']

module.exports = {
  input: [
    './src/index.ts',
    './src/test/observable.ts',
    './src/test/observableGenFn.ts',
    './src/test/operator.ts',
    './src/test/subject.ts',
    
  ],
  output: {
    dir: 'dist',
    format: 'cjs' // amd, cjs, es, iife, umd
  },
  plugins: [
    // cleandir('./dist'),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: "ESNext"
        }
      },
    }),
    nodeResolve({
      extensions,
      modulesOnly: true,
      preferredBuiltins: false
    }),
    json(),
  ],
}
