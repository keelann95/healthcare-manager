import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'plugin:prettier/recommended'),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off', // Disable the unused-vars rule
      'react/no-unescaped-entities': 'off', // Disable unescaped-entities rule
      '@typescript-eslint/no-explicit-any': 'off', // Disable the explicit-any rule
    },
  },
];

export default eslintConfig;
