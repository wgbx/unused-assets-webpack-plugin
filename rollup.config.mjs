import NodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

const name = 'unused-assets-webpack-plugin'

export default {
  input: './packages/index',
  output: [
    {
      name,
      file: 'dist/unused-assets-webpack-plugin.cjs',
      format: 'cjs',
      plugins: [terser()]
    },
    {
      name,
      file: 'dist/unused-assets-webpack-plugin.mjs',
      format: 'es',
      plugins: [terser()]
    }
  ],
  plugins: [
    NodeResolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
  ],
}
