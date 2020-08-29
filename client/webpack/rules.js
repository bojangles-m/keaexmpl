const ENV = require('./settings');

/////////////////////////////////////////////////////////
// JAVASCRIPT RULES
/////////////////////////////////////////////////////////
const r_jsx = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    // options: { cacheDirectory: true },
  },
};

/////////////////////////////////////////////////////////
// STYLE RULES
/////////////////////////////////////////////////////////

/*********
 * style-loader
 * Loading style into DOM
 */
let style_loader = require('mini-css-extract-plugin').loader;
if (ENV.IS_DEVELOPMENT) {
  style_loader = { loader: 'style-loader' };
}

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

// for DEV
if (ENV.IS_DEVELOPMENT) {
  css_loader.options['sourceMap'] = true;
}

/*********
 * sass-loader
 */
const sass_loader = { loader: 'sass-loader' };

// for DEV
if (ENV.IS_DEVELOPMENT) {
  sass_loader.options = { sourceMap: true };
}

/*********
 * postcss-loader
 */
const postcss_loader = { loader: 'postcss-loader' };

// for DEV
if (ENV.IS_DEVELOPMENT) {
  postcss_loader.options = { sourceMap: true };
}

const r_css = {
  // test: /\.css$/,
  test: /\.s?[ac]ss$/i,
  exclude: /node_modules/,
  use: [style_loader, css_loader, postcss_loader, sass_loader],
};

module.exports = [r_jsx, r_css];
