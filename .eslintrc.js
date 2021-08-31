module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: '@typescript-eslint/parser',
  extends: ['prettier/@typescript-eslint', 'plugin:prettier/recommended'],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  plugins: ['react-hooks'],
  rules: {
    // semi: 'off',
    // '@typescript-eslint/semi': ['warn', 'never'],
    // '@typescript-eslint/explicit-function-return-type': 'off',
    'no-console': 0,
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'none',
        singleQuote: true
      }
    ],
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn'
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
};
