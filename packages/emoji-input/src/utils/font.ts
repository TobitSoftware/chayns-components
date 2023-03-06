export const getRootFontFamily = () => {
    const rootElement = document.querySelector(':root');

    if (!rootElement) {
        return '';
    }

    return window.getComputedStyle(rootElement).getPropertyValue('font-family');
};
