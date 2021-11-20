module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      generators: true,
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  plugins: ['react'],
  rules: {
    'linebreak-style': 0,
    'indent': ['error', 2],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'no-console': 0,
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.jsx', '.js'],
      },
    ],
    'for-direction': 'off',
    'react/button-has-type': 0,
    'react/jsx-props-no-spreading': 0,
    'no-useless-constructor': 0,
    'no-nested-ternary': 0,
    'react/prop-types': 0, // must be remove soon
    'max-len': 0,
    'import/no-cycle': 0,
    'no-return-assign': 0,
    'no-shadow': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'react/no-danger': 0,
    'no-unused-vars': 0,
    'import/prefer-default-export': 0,
    'no-param-reassign': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    'quote-props': ['error', 'consistent-as-needed'],
    'operator-linebreak': [2, 'after', { overrides: { '?': 'ignore', ':': 'ignore' } }],
    'implicit-arrow-linebreak': ['off', 'below'],
    'object-curly-newline': ['off', 'never'],
    'no-lonely-if': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@assets', './src/assets'],
          ['@icons', './src/assets/icons'],
          ['@utils', './src/utils'],
          ['@views', './src/views'],
          ['@styles', './src/styles'],
          ['@layouts', './src/views/layouts'],
          ['@constants', './src/constants'],
          ['@reduxModules', './src/reduxModules'],
          ['@components', './src/views/components'],
          ['@containers', './src/views/containers'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
};
