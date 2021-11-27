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
      file: path.join(__dirname, 'dist/floating-ui.dom.mjs'),
      format: 'esm',
    },
  },
  {
    input,
    output: {
      file: path.join(__dirname, 'dist/floating-ui.dom.min.mjs'),
      format: 'esm',
    },
  },
  {
    input,
    output: {
      name: 'FloatingUI',
      file: path.join(__dirname, 'dist/floating-ui.dom.js'),
      format: 'umd',
      globals: {
        '@floating-ui/position': 'FloatingUIPosition',
      },
    },
  },
  {
    input,
    output: {
      name: 'FloatingUI',
      file: path.join(__dirname, 'dist/floating-ui.dom.min.js'),
      format: 'umd',
      globals: {
        '@floating-ui/position': 'FloatingUIPosition',
      },
    },
  },
];

const buildExport = bundles.map(({input, output, minify}) => ({
  input,
  output,
  external: ['@floating-ui/position'],
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
    file: path.join(__dirname, `test/visual/dist/index.mjs`),
    format: 'esm',
  },
  plugins: [
    nodeResolve({extensions: ['.ts']}),
    babel({babelHelpers: 'bundled', extensions: ['.ts']}),
    replace({
      __DEV__: 'true',
      preventAssignment: true,
    }),
  ],
};

export default process.env.NODE_ENV === 'build' ? buildExport : devExport;
