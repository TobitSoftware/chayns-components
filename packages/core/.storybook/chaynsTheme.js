import { create } from '@storybook/theming';

export const chaynsTheme = create({
    base: 'light',

    colorPrimary: '#005EB8',
    colorSecondary: '#005EB8',

    appBg: '#F1F5F9',
    appContentBg: '#F8FAFC',
    appBorderColor: '#CFD8E3',
    appBorderRadius: 2,

    fontBase: '"Roboto", sans-serif',
    fontCode: '"JetBrains Mono", monospace',

    textColor: '#1A202E',
    textInverseColor: '#F8FAFC',

    barTextColor: '#475569',
    barSelectedColor: '#005EB8',
    barBg: '#FFF',

    inputBg: '#F1F5F9',
    inputBorder: '#CFD8E3',
    inputTextColor: '#364152',
    inputBorderRadius: 2,

    brandTitle: 'chayns-components',
    brandUrl: 'https://chayns.org/',
    brandImage: 'https://chayns.space/77896-21884/chayns_components.png',
});
