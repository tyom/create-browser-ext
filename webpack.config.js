const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  watch: process.env.NODE_ENV !== 'production',
  entry: {
    popup: './src/popup.tsx',
    content: './src/content.tsx',
    options: './src/options.tsx',
    background: './src/background.ts',
    'hot-reload': './src/hot-reload.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
};
