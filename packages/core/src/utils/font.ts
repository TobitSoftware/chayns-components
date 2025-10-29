import {
    IconStyle,
    type ParagraphFormat,
} from '../components/color-scheme-provider/ColorSchemeProvider.types';

export const convertIconStyle = (iconStyle: IconStyle) => {
    switch (iconStyle) {
        case IconStyle.SOLID:
            return 'fa-solid';
        case IconStyle.DUOTONE:
            return 'fa-duotone';
        case IconStyle.SHARP:
            return 'fa-sharp';
        case IconStyle.LIGHT:
            return 'fa-light';
        default:
            return 'fa-regular';
    }
};

const hexToRgb = (hex: string) => {
    let r: number;
    let g: number;
    let b: number;
    let a: number;

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);

    if (result) {
        r = parseInt(result[1] ?? '0', 16);
        g = parseInt(result[2] ?? '0', 16);
        b = parseInt(result[3] ?? '0', 16);
        a = result[4] ? parseInt(result[4], 16) / 100 : 1;

        return { r, g, b, a };
    }

    return undefined;
};

export const getHeadlineColorSelector = (data: ParagraphFormat[]) => {
    const themeResult: { [key: string]: string } = {};
    const headlineMap: { [key: string]: string } = {
        h1: 'headline-1',
        h2: 'headline-2',
        h3: 'headline-3',
        h4: 'headline-4',
        h5: 'headline-5',
        h6: 'headline-6',
        p: 'text',
        footer: 'footer',
        '.button': 'button',
    };

    data.forEach(({ selector, color, backgroundColor }) => {
        const selectors = selector.split(',');

        const tag = selectors[selectors.length - 1]?.trim();

        const path = headlineMap[tag ?? ''];

        if (!path) {
            return;
        }

        if (path === 'button' && backgroundColor) {
            themeResult[`${path}BackgroundColor`] = backgroundColor;

            if (color) {
                themeResult[`${path}Color`] = color;
            }

            return;
        }

        if (!color) {
            return;
        }

        themeResult[path] = color;

        const rgb = hexToRgb(color);

        if (!rgb) {
            return;
        }

        const { r, g, b } = rgb;

        themeResult[`${path}-rgb`] = `${r}, ${g}, ${b}`;
    });

    return { themeResult };
};
