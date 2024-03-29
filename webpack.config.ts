import { resolve } from 'path';
import webpack from 'webpack';

import 'webpack-dev-server';

const config: webpack.Configuration = {
  mode: 'production',
  entry: './src/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: 'ts-loader',
        exclude: [resolve(__dirname, 'node_modules')],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'bundle'),
  },
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
};

export default config;
