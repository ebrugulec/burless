module.exports = {
  'root': true,
  'settings': {
    'react': {
      'version': 'detect'
    }
  },
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'plugin:prettier/recommended',
    'plugin:css-modules/recommended',
    'plugin:react/recommended'
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'no-useless-escape': 'off',
    'no-debugger': 'off',
    'space-before-function-paren': ['error', 'always'],
    'react/prop-types': ['off'],
    'indent': ['error', 2],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'eol-last': [
      'error',
      'always'
    ]
  }
}
