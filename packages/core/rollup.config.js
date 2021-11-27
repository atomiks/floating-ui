import path from 'path';
import {babel} from '@rollup/plugin-babel';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import {terser} from 'rollup-plugin-terser';

const input = path.join(__dirname, 'src/index.ts');

const bundles = [
  {
    input,
    output: {
      file: path.join(__dirname, 'dist/floating-ui.core.mjs'),
      format: 'esm',
    },
  },
  {
    input,
    output: {
      file: path.join(__dirname, 'dist/floating-ui.core.min.mjs'),
      format: 'esm',
    },
  },
  {
    input,
    output: {
      name: 'FloatingUIPosition',
      file: path.join(__dirname, 'dist/floating-ui.core.js'),
      format: 'umd',
    },
  },
  {
    input,
    output: {
      name: 'FloatingUIPosition',
      file: path.join(__dirname, 'dist/floating-ui.core.min.js'),
      format: 'umd',
    },
  },
];

const buildExport = bundles.map(({input, output, minify}) => ({
  input,
  output,
  plugins: [
    nodeResolve({extensions: ['.ts']}),
    babel({babelHelpers: 'bundled', extensions: ['.ts']}),
    replace({
      __DEV__: output.file.includes('.min.')
        ? 'false'
        : 'process.env.NODE_ENV !== "production"',
      preventAssignment: true,
    }),
    output.file.includes('.min.') && terser(),
  ],
}));

const devExport = {
  input: path.join(__dirname, 'src/index.ts'),
  output: {
    file: path.join(__dirname, `dist/floating-ui.core.mjs`),
    format: 'esm',
  },
  plugins: [
    nodeResolve({extensions: ['.ts']}),
    babel({babelHelpers: 'bundled', extensions: ['.ts']}),
  ],
};

export default process.env.NODE_ENV === 'build' ? buildExport : devExport;
