module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        project: './tsconfig.eslint.json',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint', 'import', 'jsx-a11y', 'react', 'react-hooks'],
    root: true,
    rules: {
        'no-void': [
            'error',
            {
                allowAsStatement: true,
            },
        ],
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: '*',
                next: 'return',
            },
        ],
        'semi': ['error', 'never', { beforeStatementContinuationChars: 'never' }],
        'semi-spacing': ['error', { after: true, before: false }],
        'semi-style': ['error', 'first'],
        'no-extra-semi': 'error',
        'no-unexpected-multiline': 'error',
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
        'react/function-component-definition': [
            2,
            { namedComponents: 'arrow-function' },
        ],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': ['off'],
        'react/jsx-no-useless-fragment': 'off',
        'react/require-default-props': 'off',
        "import/no-default-export": 'error',
        "react/no-unused-prop-types": 'warn',
        'no-underscore-dangle': 'off'
    },
    overrides: [
        {
            files: ['*.tsx'],
            rules: {
                'react/prop-types': 'off',
            },
        },
    ],
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
            },
        },
    },
}
