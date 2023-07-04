import { hexToHsl, rgb255ToHsl } from '@chayns/colors';
import type { HSL, HSLA } from '@chayns/colors/lib/types/hsl';
import type { CSSProperties, RefObject } from 'react';
import type { Coordinates } from '../types';

interface GetColorFromCoordinatesOptions {
    coordinates: Coordinates;
    canvas: RefObject<HTMLCanvasElement>;
}

export const getColorFromCoordinates = ({
    coordinates,
    canvas,
}: GetColorFromCoordinatesOptions) => {
    if (!canvas.current) {
        return undefined;
    }

    const { offsetTop, offsetLeft } = canvas.current;

    const { x } = coordinates;
    const { y } = coordinates;

    const ctx = canvas.current?.getContext('2d');
    const pixels = ctx?.getImageData(x, y, 1, 1).data;

    if (!pixels) {
        return undefined;
    }

    // If transparency
    if (pixels[0] === 0 && pixels[1] === 0 && pixels[2] === 0 && pixels[3] === 0) {
        return 'transparent';
    }

    return `rgba(${pixels[0] ?? 0}, ${pixels[1] ?? 0}, ${pixels[2] ?? 0}, ${pixels[3] ?? 0})`;
};

interface GetCoordinatesFromColorOptions {
    color: CSSProperties['color'];
    canvas: RefObject<HTMLCanvasElement>;
}

export const getCoordinatesFromColor = ({ canvas, color }: GetCoordinatesFromColorOptions) => {
    const ctx = canvas.current?.getContext('2d');

    if (!ctx || !color) {
        return undefined;
    }

    const { data } = ctx.getImageData(0, 0, 300, 150); /// get image data
    let x = 0;
    let y = 0;
    let p;
    let px;

    const rgba = color.match(/[\d.]+/g);

    if (!rgba) {
        return undefined;
    }

    console.log(data);

    console.log(rgba);

    // iterating x/y instead of forward to get position the easy way
    for (; y < 150; y++) {
        // common value for all x
        p = y * 4 * 300;

        for (x = 0; x < 300; x++) {
            // next pixel (skipping 4 bytes as each pixel is RGBA bytes)
            px = p + x * 4;

            // if red component match check the others
            if (data[px] === Number(rgba[0])) {
                console.log('eee', data[px]);
                if (data[px + 1] === rgba[1] && data[px + 2] === rgba[2]) {
                    return { x, y };
                }
            }
        }
    }
    return null;
};

export const convertColorToHsl = (color: string) => {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const rgbRegex =
        /^rgb(a)?\(\s*((25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\s*,\s*){2}(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\s*(,\s*\d+(\.\d+)?)?\)$/i;
    const hslRegex =
        /^hsla?\(\s*((360|3[0-5]\d|[12]\d{2}|[1-9]\d|\d)\s*,\s*){2}(360|3[0-5]\d|[12]\d{2}|[1-9]\d|\d)\s*(,\s*\d+(\.\d+)?)?\)$/i;

    let rgba: string[] | null;
    let hsl: HSL | HSLA | null;

    const newColor = color.replaceAll('%', '');

    switch (true) {
        case hexRegex.test(newColor):
            hsl = hexToHsl(color);

            if (!hsl) {
                return undefined;
            }

            return `hsl(${Math.floor(hsl.h)},100%,50%)`;
        case rgbRegex.test(newColor):
            rgba = color.match(/[\d.]+/g);

            if (!rgba) {
                return undefined;
            }

            hsl = rgb255ToHsl({
                r: Number(rgba[0]),
                g: Number(rgba[1]),
                b: Number(rgba[2]),
            });

            if (!hsl) {
                return undefined;
            }

            return `hsl(${Math.floor(hsl.h)},100%,50%)`;
        case hslRegex.test(newColor):
            return color;
        default:
            return undefined;
    }
};
