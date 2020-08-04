const dotenv = require('dotenv');
const path = require('path');

const ENVIRONMENT = process.env.ENVIRONMENT || 'production';
const IS_PRODUCTION = ENVIRONMENT === 'production';
const IS_DEVELOPMENT = ENVIRONMENT === 'development';

const ENV = {
  ...dotenv.config({
    path: path.resolve(__dirname, `../environment/.env.${ENVIRONMENT}`),
  }).parsed,
  IS_PRODUCTION,
  IS_DEVELOPMENT,
};

module.exports = ENV;
