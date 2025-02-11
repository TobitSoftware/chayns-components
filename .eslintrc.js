module.exports = {
    rules: {
        'no-void': 'off',
        // We organize imports on commit so this is not needed.
        'import/order': 'off',
        'react/react-in-jsx-scope': 'off',
    },
    extends: ['@chayns-toolkit', 'plugin:storybook/recommended'],
};
