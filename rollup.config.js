import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/index.js',
  dest: 'www/index.js',
  plugins: [babel(), nodeResolve(), commonjs()]
};
