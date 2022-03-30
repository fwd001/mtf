import typescript from 'rollup-plugin-typescript2';
import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import babel from '@rollup/plugin-babel';
import { builtinModules } from 'module';
import { DEFAULT_EXTENSIONS } from '@babel/core';

import pkg from './package.json';

// 一段自定义的内容，以下内容会添加到打包结果中
const footer = `
if(typeof window !== 'undefined') {
  window._MTF_VERSION_ = '${pkg.version}'
}`;
export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      name: 'HLL_MTF',
      footer,
    },
    {
      file: pkg.module,
      format: 'esm',
      name: 'HLL_MTF',
      sourcemap: true,
      footer,
    },
  ],
  plugins: [
    external(),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    }),
    del({ targets: ['dist/*'] }),
  ],
  external: [
    ...builtinModules,
    ...(pkg.dependencies == null ? [] : Object.keys(pkg.dependencies)),
    ...(pkg.devDependencies == null ? [] : Object.keys(pkg.devDependencies)),
    ...(pkg.peerDependencies == null ? [] : Object.keys(pkg.peerDependencies)),
    // 对于 @babel/runtime 使用正则来排除
    /@babel\/runtime/,
  ],
};
