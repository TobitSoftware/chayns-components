module.exports = {
    stories: ['../packages/**/*.stories.mdx', '../packages/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        {
            name: '@storybook/addon-essentials',
            options: {
                measure: false,
                outline: false,
                toolbars: false,
            },
        },
    ],
};
