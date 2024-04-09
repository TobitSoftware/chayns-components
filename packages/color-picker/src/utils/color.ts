import type { CSSProperties, RefObject } from 'react';

import { hexToHsl, rgb255ToHsl } from '@chayns/colors';
import type { HSL, HSLA } from '@chayns/colors/lib/types/hsl';
import type { Coordinates, RGBA, Scale } from '../types';

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

export const splitRgb = (color: CSSProperties['color']): null | RGBA => {
    const rgba = color?.match(/[\d.]+/g);

    if (!rgba) {
        return null;
    }

    return { r: Number(rgba[0]), g: Number(rgba[1]), b: Number(rgba[2]), a: Number(rgba[3]) };
};

export const extractRgbValues = (rgbString: string): RGBA => {
    const rgbaRegex = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/;
    const match = rgbString.match(rgbaRegex);

    if (match) {
        const r = parseInt(match[1] ?? '');
        const g = parseInt(match[2] ?? '');
        const b = parseInt(match[3] ?? '');
        const a = parseFloat(match[4] ?? '');
        return { r, g, b, a };
    }

    return {
        r: 255,
        g: 255,
        b: 255,
        a: 1,
    };
};

export const hexToRgb = (hex: string): RGBA => {
    let r: number;
    let g: number;
    let b: number;
    let a: number;

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);

    if (result) {
        r = parseInt(result[1] ?? '0', 16);
        g = parseInt(result[2] ?? '0', 16);
        b = parseInt(result[3] ?? '0', 16);
        a = result[4] ? parseInt(result[4], 16) / 255 : 1;
        return { r, g, b, a };
    }

    return {
        r: 255,
        g: 255,
        b: 255,
        a: 255,
    };
};

export const rgbToHex = ({ r, g, b, a = 1 }: RGBA): string => {
    const clamp = (value: number) => Math.max(0, Math.min(255, Math.round(value)));
    const alpha = Math.max(0, Math.min(1, a));
    const hex = (x: number) => {
        const hexValue = clamp(x).toString(16);
        return hexValue.length === 1 ? `0${hexValue}` : hexValue;
    };
    return `#${hex(r)}${hex(g)}${hex(b)}${alpha < 1 ? hex(alpha * 255) : ''}`;
};
