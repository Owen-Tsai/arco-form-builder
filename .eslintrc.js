// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  env: {
    'node': true,
    'vue/setup-compiler-macros': true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: path.resolve(__dirname, './tsconfig.json'),
      },
    },
  },
  globals: {
    JSX: true,
  },
  rules: {
    'prettier/prettier': 2,
    // report debug messages on production
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // vue-eslint rules modification
    'vue/block-tag-newline': 1,
    'vue/script-indent': [
      'error',
      2,
      {
        switchCase: 1,
      },
    ],
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-v-html': 0,
    'vue/no-v-text': 1,
    'vue/multiline-html-element-content-newline': 0,
    'vue/multi-word-component-names': 0,
    'vue/require-default-prop': 0,

    // import-plugin rules modification
    'import/no-extraneous-dependencies': 0,
    'import/extensions': [
      2,
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': [
      1,
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
        groups: [
          'builtin',
          'external',
          'internal',
          'unknown',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
      },
    ],
    // other rules modification
    'no-param-reassign': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'prefer-regex-literals': 0,
    'no-plusplus': 0,
    'class-methods-use-this': 0,
    'vue/max-attributes-per-line': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': [
      1,
      {
        typedefs: false,
      },
    ],
  },
}
