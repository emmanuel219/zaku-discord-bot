import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      // 🔹 Indentation
      'indent': ['error', 2],

      // 🔹 Spacing
      'space-before-function-paren': ['error', 'never'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-infix-ops': 'error',
      'space-in-parens': ['error', 'never'],
      'array-bracket-spacing': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'comma-spacing': ['error', { before: false, after: true }],
      'func-call-spacing': ['error', 'never'],

      // 🔹 Semicolons
      'semi': ['error', 'always'],
      'semi-spacing': ['error', { before: false, after: true }],
      'no-extra-semi': 'error',

      // 🔹 Quotes
      'quotes': ['error', 'single', { avoidEscape: true }],

      // 🔹 Braces & line breaks
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'block-spacing': ['error', 'always'],
      'eol-last': ['error', 'always'],
      'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
      'no-multiple-empty-lines': ['error', { max: 1 }],

      // 🔹 Commas
      'comma-dangle': ['error', 'always-multiline'],

      // 🔹 Variable rules
      'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
      'prefer-const': 'error',
      'no-var': 'error',
      'one-var': ['error', 'never'],

      // 🔹 Equality
      'eqeqeq': ['error', 'always'],

      // 🔹 Arrow functions
      'arrow-spacing': ['error', { before: true, after: true }],
      'prefer-arrow-callback': 'error',

      // 🔹 Misc
      'no-trailing-spaces': 'error',
      'curly': ['error', 'all'],
    },
  },
]);
