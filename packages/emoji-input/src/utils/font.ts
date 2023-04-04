import { getIsMacOS, getIsMobile } from './environment';

const getRootFontFamily = () => {
    const rootElement = document.querySelector(':root');

    if (!rootElement) {
        return '';
    }

    return window.getComputedStyle(rootElement).getPropertyValue('font-family');
};

export const getFontFamily = () =>
    `${getRootFontFamily()}${getIsMobile() || getIsMacOS() ? '' : ', Noto Color Emoji'}, serif`;
