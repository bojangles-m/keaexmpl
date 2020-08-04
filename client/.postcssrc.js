module.exports = {
  plugins: {
    'postcss-import': {
      path: 'src/css/',
    },
    autoprefixer: true,
    'postcss-nested': true,
    'postcss-hexrgba': true,
    'postcss-preset-env': {
      browsers: ['last 2 versions', '> 1%'],
      stage: 0,
      features: {
        'nesting-rules': true,
      },
    },
  },
};
