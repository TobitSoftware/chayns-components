module.exports = {
    rules: {
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
};
