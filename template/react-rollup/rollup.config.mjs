import rollupConfig from '@dxsixpc/configs/rollup-config/index.js';
import replace from '@rollup/plugin-replace';
// import { readJson } from 'fs-extra/esm';
// import { resolve } from 'path';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

// const pakg = await readJson(resolve('package.json'));

export default rollupConfig({
  input: 'src/index.tsx',
  output: [
    // 打包为commonJS模块
    // {
    //   dir: 'dist',
    //   format: 'cjs',
    //   sourcemap: true,
    // },
    // 打包为ES6模块
    // {
    //   file: 'dist/index.esm.js',
    //   format: 'esm',
    //   sourcemap: true,
    // },
    {
      file: 'dist/bundle.js',
      format: 'iife', // immediately-invoked function expression — suitable for <script> tags
      sourcemap: true,
    },
  ],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    serve({
      open: true,
      verbose: true,
      contentBase: ['', 'dist'],
      historyApiFallback: true,
      host: 'localhost',
      port: 3000,
    }),
    livereload({ watch: 'dist' }),
  ],
  commonjsOptions: {
    include: ['node_modules/**'],
  },
  nodeResolveOptions: {
    extensions: ['ts', 'tsx'],
  },
});
