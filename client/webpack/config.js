const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const ENV = require('./settings');

// --------------
// PATHS
// --------------
const paths = {
  publicPath: ENV.PUBLIC_PATH,
  build: path.resolve(__dirname, '../build'),
  src: path.resolve(__dirname, '../src'),
  js: path.resolve(__dirname, '../src/js'),
  css: path.resolve(__dirname, '../src/css'),
  img: path.resolve(__dirname, '../src/assets/img'),
  assets: path.resolve(__dirname, '../src/assets'),
};

// --------------
// ENTRY POINTS
// --------------
const entry = path.join(paths.js, 'index.js');

// --------------
// OUTPUT FILES
// --------------
const outputFiles = {
  js: 'js/[name]-[hash]-bundle.js',
  css: 'css/[name]-[hash]-bundle.css',
  vendor: 'js/[name]-[hash]-bundle.js',
};

// ----------
// PLUGINS
// ----------
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const plugins = [
  new CopyPlugin({
    patterns: [{from: paths.img, to: 'img'}],
  }),
  new HtmlWebpackPlugin({
    template: path.join(paths.src, 'index.html'),
    path: paths.build,
    filename: 'index.html',
    minify: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      useShortDoctype: true,
    },
  }),
  new MiniCssExtractPlugin({
    filename: outputFiles.css,
  }),
  // Injects env variables into the app
  new webpack.DefinePlugin({
    __ENV__: JSON.stringify(ENV),
  }),
];

// --------------
// WATCH OPTIONS
// Necessary for file changes inside the bind mount to get picked up
// --------------
const watchOptions = {
  // aggregateTimeout: 300,
  // poll: true,
  ignored: ['**/*.test.js', 'node_modules'],
};

// ----------
// RESOLVE
// ----------

const resolve = {
  modules: ['node_modules', paths.assets, paths.css],
};

// ----------
// CLI STATS
// ----------
const stats = {
  assets: true,
  children: false,
  chunks: false,
  colors: true,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: true,
  warnings: true,
};

// --------------
// DEV SERVER
// --------------
const devServer = {
  contentBase: ENV.IS_PRODUCTION ? paths.build : paths.src,
  port: ENV.CLIENT_PORT,
  host: ENV.CLIENT_HOST,
  hot: ENV.IS_PRODUCTION, // Activate hot loading on DEV environment
  historyApiFallback: true, // Webpack Dev Server to redirect all server requests to index.html.
  compress: ENV.IS_PRODUCTION,
  inline: !ENV.IS_PRODUCTION, // Change to false for IE10 dev mode
  // disableHostCheck: true, // To enable local network testing
  historyApiFallback: {
    disableDotRule: true,
  },
  overlay: true, // Shows a full-screen overlay in the browser when there are compiler errors
  stats, // This option lets you precisely control what bundle information gets displayed.
};

module.exports = {
  context: paths.js, // The base directory, an absolute path, for resolving entry points
  mode: ENV.IS_PRODUCTION ? 'production' : 'development',
  devtool: ENV.IS_PRODUCTION ? false : 'source-map',
  entry,
  output: {
    path: paths.build,
    filename: outputFiles.js,
    publicPath: paths.publicPath,
  },
  module: {
    rules: require('./rules'),
  },
  resolve,
  devServer,
  plugins,
  stats,
  watchOptions,
  optimization: {
    // Creates vendor chunk from modules coming from node_modules folder
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: path.resolve(__dirname, '../node_modules'),
          name: 'vendor',
          filename: outputFiles.vendor,
          enforce: true,
        },
      },
    },
  },
};
