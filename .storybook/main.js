const path = require('path');

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
    webpackFinal: async (config) => {
        /**
         * This webpack rule is needed so that the storybook can handle the "mjs" files
         * of the "framer-motion" package in version 5 or higher.
         */
        config.module.rules.push({
            include: /node_modules/,
            test: /\.mjs$/,
            type: 'javascript/auto',
        });

        config.resolve.alias = {
            ...config.resolve.alias,
            'styled-components': path.resolve(
                __dirname,
                '../packages/core/node_modules/styled-components'
            ),
        };

        return config;
    },
};
