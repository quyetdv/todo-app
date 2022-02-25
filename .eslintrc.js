module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['jest', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      { semi: true, singleQuote: true, tabWidth: 2, useTabs: false },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.test.js', '.jsx'] }],
  },
};
