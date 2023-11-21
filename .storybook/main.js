import { dirname, join } from 'path';
module.exports = {
    stories: ['../packages/**/*.stories.mdx', '../packages/**/*.stories.@(js|jsx|ts|tsx)'],

    addons: [
        getAbsolutePath('@storybook/addon-links'),
        {
            name: '@storybook/addon-essentials',
            options: {
                measure: false,
                outline: false,
                toolbars: false,
            },
        },
        getAbsolutePath('@storybook/addon-mdx-gfm'),
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

        return config;
    },

    framework: {
        name: getAbsolutePath('@storybook/react-webpack5'),
        options: {},
    },

    docs: {
        autodocs: true,
    },
};

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, 'package.json')));
}
