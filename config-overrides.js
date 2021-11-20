/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
const { alias } = require('react-app-rewire-alias');
const { removeModuleScopePlugin } = require('customize-cra');

module.exports = function override(config, env) {
  config.module.rules = config.module.rules.map((rule) => {
    if (rule.oneOf instanceof Array) {
      return {
        ...rule,
        oneOf: [
          {
            test: /\.svg$/,
            use: [require.resolve('svg-sprite-loader')],
          },
          ...rule.oneOf,
        ],
      };
    }

    return rule;
  });

  if (!config.plugins) {
    config.plugins = [];
  }
  removeModuleScopePlugin()(config);

  alias({
    '@': 'src',
    '@assets': 'src/assets',
    '@icons': 'src/assets/icons',
    '@utils': 'src/utils',
    '@views': 'src/views',
    '@layouts': 'src/views/layouts',
    '@constants': 'src/constants',
    '@styles': 'src/styles',
    '@reduxModules': 'src/reduxModules',
    '@components': 'src/views/components',
    '@containers': 'src/views/containers',
  })(config);

  return config;
};
