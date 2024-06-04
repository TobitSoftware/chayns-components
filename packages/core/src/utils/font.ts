import { IconStyle, type ParagraphFormat } from '../types/colorSchemeProvider';

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

export const getFontSize = () => {
    const element = document.createElement('p');

    element.style.position = 'absolute';
    element.style.opacity = '0';

    element.textContent = 'Ich war hier';

    document.body.appendChild(element);

    const { fontSize } = window.getComputedStyle(element);

    document.body.removeChild(element);

    return fontSize.replace('px', '');
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
    const colorResult: { [key: string]: string } = {};
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

    data.forEach(({ selector, color, backgroundColor, design }) => {
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

            if (design) {
                themeResult[`${path}Design`] = String(design);
            }

            return;
        }

        if (!color) {
            return;
        }

        const hexPath = `--chayns-color--${path}`;
        const rgbPath = `--chayns-color-rgb--${path}`;

        colorResult[hexPath] = color;
        themeResult[path] = color;

        const rgb = hexToRgb(color);

        if (!rgb) {
            return;
        }

        const { r, g, b } = rgb;

        colorResult[rgbPath] = `${r}, ${g}, ${b}`;
        themeResult[`${path}-rgb`] = `${r}, ${g}, ${b}`;
    });

    return { colorResult, themeResult };
};
