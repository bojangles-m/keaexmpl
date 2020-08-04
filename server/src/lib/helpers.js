const ENV = require(`../environment/env.${process.env.ENVIRONMENT || 'dist'}`);

module.exports = {
    ENV,
};
