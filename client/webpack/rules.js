const ENV = require('./settings');

/////////////////////////////////////////////////////////
// JAVASCRIPT RULES
/////////////////////////////////////////////////////////
const r_jsx = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: ['babel-loader'],
};

/////////////////////////////////////////////////////////
// STYLE RULES
/////////////////////////////////////////////////////////

/*********
 * css-loader
 */
const css_loader = {
  loader: 'css-loader',
  options: {
    // how many loaders before css-loader should be applied to
    // 0 => no loaders (default); 1 => postcss-loader; ...
    importLoaders: 1,
  },
};

if (ENV.IS_PRODUCTION)
  css_loader.options['modules'] = {localIdentName: '[local]--[hash:base64:5]'};

// for DEV
if (ENV.IS_DEVELOPMENT) {
  css_loader.options['modules'] = {localIdentName: '[path][name]__[local]'};
  css_loader.options['sourceMap'] = true;
}

/*********
 * postcss-loader
 */
const postcss_loader = {loader: 'postcss-loader'};

// for DEV
if (ENV.IS_DEVELOPMENT) postcss_loader['options'] = {sourceMap: true};

const r_css = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: [require('mini-css-extract-plugin').loader, css_loader, postcss_loader],
};

module.exports = [r_jsx, r_css];
