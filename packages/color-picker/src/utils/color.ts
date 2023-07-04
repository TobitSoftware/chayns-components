import { hexToHsl, rgb255ToHsl } from '@chayns/colors';
import type { HSL, HSLA } from '@chayns/colors/lib/types/hsl';
import type { RefObject } from 'react';
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

    const x = coordinates.x - offsetTop;
    const y = coordinates.y - offsetLeft;

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
