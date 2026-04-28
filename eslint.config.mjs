import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts'
  ]),
  {
    name: 'quiet',
    rules: {
      'react/prop-types': 0,
      'react/display-name': 0,
      'react/no-unescaped-entities': 0,
      'react/no-direct-mutation-state': 'off',
      'react/no-render-return-value': 'off',
      'react/no-string-refs': 'off',
      'react/require-render-return': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/error-boundaries': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/exhaustive-deps': 0,
      '@next/next/no-img-element': 0,
      '@next/next/no-page-custom-font': 0,
      'prefer-const': 0,
      'no-var': 0,
      'no-unused-vars': 0,
      'import/named': 0,
      'import/no-named-as-default': 0,
      'import/no-anonymous-default-export': 'off',
      'import/no-unresolved': [0, { caseSensitive: false }],
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-empty-object-type': 0,
      '@typescript-eslint/no-unused-expressions': 0,
      '@typescript-eslint/no-unused-vars': 0,
      '@typescript-eslint/no-this-alias': 0,
    }
  }
]);

export default eslintConfig;
