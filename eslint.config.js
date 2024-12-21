// @ts-check
const eslint = require('@eslint/js');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const angularPlugin = require('@angular-eslint/eslint-plugin');
const angularParser = require('@angular-eslint/template-parser');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  // TypeScript-Konfiguration
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'], // Nutzt TypeScript-Projektkontext
        createDefaultProgram: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@angular-eslint': angularPlugin,
    },
    rules: {
      // Angular-spezifische Best Practices
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      '@angular-eslint/no-input-rename': 'error',
      '@angular-eslint/no-output-native': 'error',
      '@angular-eslint/use-lifecycle-interface': 'warn',
      '@angular-eslint/use-injectable-provided-in': 'error',

      // Typisierung und Konsistenz
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',

      // Codequalität
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],

      // Maximal erlaubte Zeilen pro Datei
      'max-lines': [
        'warn',
        { max: 400, skipBlankLines: true, skipComments: true },
      ],

      // Maximale Zeilenlänge
      'max-len': [
        'warn',
        {
          code: 120,
          tabWidth: 2,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreComments: true,
        },
      ],

      // Prettier-Integration
      'prettier/prettier': 'error',
    },
    extends: [
      eslint.configs.recommended, // Basis-Empfehlungen von ESLint
      tsPlugin.configs.recommended,
      tsPlugin.configs['recommended-requiring-type-checking'],
      angularPlugin.configs['recommended'],
      prettierConfig,
    ],
  },

  // Template-spezifische Konfiguration (HTML)
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularParser,
    },
    plugins: {
      '@angular-eslint/template': angularPlugin,
    },
    rules: {
      // Angular-Template-Best Practices
      '@angular-eslint/template/no-negated-async': 'error',
      '@angular-eslint/template/cyclomatic-complexity': [
        'warn',
        { maxComplexity: 5 },
      ],
      '@angular-eslint/template/accessibility-label-for': 'error',
      '@angular-eslint/template/no-any': 'warn',

      // Prettier-Integration für Templates
      'prettier/prettier': ['error', { parser: 'angular' }],
    },
    extends: [
      angularPlugin.configs['template-recommended'],
      angularPlugin.configs['template-accessibility'],
      prettierConfig,
    ],
  },
];
