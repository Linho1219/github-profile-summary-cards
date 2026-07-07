import {defineConfig, globalIgnores} from 'eslint/config';
import prettier from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([
    globalIgnores(['dist/', 'node_modules/', 'eslint.config.ts']),
    {
        files: ['**/*.ts'],
        extends: compat.extends('google', 'plugin:prettier/recommended'),

        plugins: {
            prettier
        },

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 12,
            sourceType: 'module',

            parserOptions: {
                project: './tsconfig.test.json'
            }
        },

        rules: {
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto'
                }
            ],

            'require-jsdoc': 0,
            'valid-jsdoc': 0
        }
    }
]);
