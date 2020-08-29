const path = require('path');

const ENVIRONMENT = process.env.ENVIRONMENT || 'production';
const IS_PRODUCTION = ENVIRONMENT === 'production';
const IS_DEVELOPMENT = ENVIRONMENT === 'development';

const envFile = path.resolve(__dirname, `../environment/env.${ENVIRONMENT}.js`);

module.exports = {
  ...require(envFile),
  IS_PRODUCTION,
  IS_DEVELOPMENT,
};
