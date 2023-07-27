import { hexToHsl, rgb255ToHsl } from '@chayns/colors';
import type { HSL, HSLA } from '@chayns/colors/lib/types/hsl';
import type { CSSProperties, RefObject } from 'react';
import type { Coordinates, RGB, Scale } from '../types';

interface GetColorFromCoordinatesOptions {
    coordinates: Coordinates;
    canvas: RefObject<HTMLCanvasElement>;
    opacity: number;
    scale: Scale;
}

export const getColorFromCoordinates = ({
    coordinates,
    canvas,
    opacity,
    scale,
}: GetColorFromCoordinatesOptions) => {
    if (!canvas.current) {
        return undefined;
    }

    const { top, left } = canvas.current.getBoundingClientRect();

    const x = (coordinates.x - left) * scale.scaleX;
    const y = (coordinates.y - top) * scale.scaleY;

    const ctx = canvas.current?.getContext('2d');
    const pixels = ctx?.getImageData(x, y, 1, 1).data;

    if (!pixels) {
        return undefined;
    }

    // If transparency
    if (pixels[0] === 0 && pixels[1] === 0 && pixels[2] === 0 && pixels[3] === 0) {
        return 'transparent';
    }

    return `rgba(${pixels[0] ?? 0}, ${pixels[1] ?? 0}, ${pixels[2] ?? 0}, ${opacity})`;
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

    const rgb = splitRgb(color);

    if (!rgb) {
        return undefined;
    }

    console.log('DATA', data);

    console.log('RGBA', rgb);

    // iterating x/y instead of forward to get position the easy way
    for (; y < 150; y++) {
        // common value for all x
        const p = y * 4 * 300;

        for (x = 0; x < 300; x++) {
            // next pixel (skipping 4 bytes as each pixel is RGBA bytes)
            const px = p + x * 4;

            // if red component match check the others
            if (data[px] === rgb.r) {
                if (data[px + 1] === rgb.g && data[px + 2] === rgb.b) {
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

export const splitRgb = (color: CSSProperties['color']): null | RGB => {
    const rgba = color?.match(/[\d.]+/g);

    if (!rgba) {
        return null;
    }

    return { r: Number(rgba[0]), g: Number(rgba[1]), b: Number(rgba[2]), a: Number(rgba[3]) };
};
