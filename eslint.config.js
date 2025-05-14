// eslint.config.js
import js from '@eslint/js'
import * as path from 'node:path'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['dist', 'node_modules'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        project: path.resolve('tsconfig.app.json'),
        tsconfigRootDir: path.resolve(),
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },
]
