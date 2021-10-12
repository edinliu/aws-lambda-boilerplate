module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
      {
        usePrettierrc: true,
      },
    ],
  },
  overrides: [
    {
      files: ['*.js'],
      env: {
        es2021: true,
        node: true,
      },
      extends: ['airbnb-base'],
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
      },
      rules: {},
    },
  ],
};
