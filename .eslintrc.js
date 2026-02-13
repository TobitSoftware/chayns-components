module.exports = {
    plugins: ['react-hooks'],
    rules: {
        '@typescript-eslint/no-misused-promises': [
            'error',
            {
                checksVoidReturn: false,
            },
        ],
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
        'react-hooks/rules-of-hooks': 'warn',
        'react-hooks/exhaustive-deps': 'warn',
    },
    extends: ['@chayns-toolkit', 'plugin:storybook/recommended', 'plugin:react-hooks/recommended'],
};
