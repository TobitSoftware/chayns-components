module.exports = {
    rules: {
        // not properly setup and this is already handled in chayns-toolkit base config
        // '@typescript-eslint/no-misused-promises': [
        //     'error',
        //     {
        //         checksVoidReturn: false,
        //     },
        // ],
        'no-void': 'off',
        // We organize imports on commit so this is not needed.
        'import/order': 'off',
        // Relax the "import/extensions" rule to avoid requiring explicit file extensions (e.g., ".mjs")
        // for imports from packages like "motion/react". This improves compatibility with Node-style
        // module resolution and avoids unnecessary noise for valid package entry points.
        'import/extensions': [
            'warn',
            'ignorePackages',
            {
                ts: 'never',
                tsx: 'never',
                js: 'never',
                jsx: 'never',
                mjs: 'never',
            },
        ],
    },
    extends: ['@chayns-toolkit', 'plugin:storybook/recommended'],
    // use another tsconfig for linting to avoid including test files and other non-source files
    parserOptions: {
        project: './tsconfig.lint.json',
    },
};
