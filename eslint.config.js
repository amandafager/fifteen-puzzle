import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import styledComponentsA11y from 'eslint-plugin-styled-components-a11y';
import styledComponentsConfig from 'eslint-plugin-styled-components-config';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: [
          './tsconfig.json',
          './tsconfig.app.json',
          './tsconfig.node.json',
        ],
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'styled-components-a11y': styledComponentsA11y,
      'styled-components-config': styledComponentsConfig,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Styled Components rules
      'styled-components-config/display-name-required': 'error',
      'styled-components-a11y/click-events-have-key-events': 'error',
      'styled-components-a11y/no-noninteractive-element-interactions': 'error',
      'styled-components-a11y/alt-text': 'error',
      'styled-components-a11y/aria-props': 'error',
      'styled-components-a11y/aria-role': 'error',
      // Prettier rules
      ...prettier.rules,
    },
  }
);
