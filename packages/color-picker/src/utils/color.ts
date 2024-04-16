import type { CSSProperties, RefObject } from 'react';

import { hexToHsl, rgb255ToHsl, rgb255ToHsv } from '@chayns/colors';
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

    const xCords = coordinates.x;
    const yCords = coordinates.y;

    const x = (xCords - 0.5) * scale.scaleX;
    const y = (yCords - 0.5) * scale.scaleY;

    const ctx = canvas.current?.getContext('2d', { willReadFrequently: true });
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
    tolerance?: number;
}

export const getCoordinatesFromColor = ({
    canvas,
    color,
    tolerance = 0,
}: GetCoordinatesFromColorOptions) => {
    const ctx = canvas.current?.getContext('2d', { willReadFrequently: true });

    if (!ctx) {
        return null;
    }

    const height = canvas.current?.height ?? 150;
    const width = canvas.current?.width ?? 300;

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    const rgb = splitRgb(color);

    if (!rgb) {
        return null;
    }

    const { r: targetR, g: targetG, b: targetB } = rgb;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const r = pixels[index] ?? 0;
            const g = pixels[index + 1] ?? 0;
            const b = pixels[index + 2] ?? 0;

            if (
                Math.abs(targetR - r) <= tolerance &&
                Math.abs(targetG - g) <= tolerance &&
                Math.abs(targetB - b) <= tolerance
            ) {
                return { x, y };
            }
        }
    }

    return null;
};

export const isValidRGBA = (rgbaString: string): boolean => {
    if (rgbaString === '') {
        return false;
    }

    const rgbaRegex = /^rgba\(\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*((0?\.\d+)|(1|0))\s*\)$/;
    if (!rgbaRegex.test(rgbaString)) {
        return false;
    }

    const matches = rgbaString.match(rgbaRegex);
    if (!matches) {
        return false;
    }

    const red = parseInt(matches[1] ?? '', 10);
    const green = parseInt(matches[2] ?? '', 10);
    const blue = parseInt(matches[3] ?? '', 10);
    const alpha = parseFloat(matches[4] ?? '');

    return !(
        red < 0 ||
        red > 255 ||
        green < 0 ||
        green > 255 ||
        blue < 0 ||
        blue > 255 ||
        alpha < 0 ||
        alpha > 1
    );
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

            return `hsl(${Math.floor(hsl.h)},100%,100%)`;
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

            return `hsl(${Math.floor(hsl.h)},100%,100%)`;
        case hslRegex.test(newColor):
            return color;
        default:
            return undefined;
    }
};

export const rgbToHsv = (color: CSSProperties['color']) =>
    rgb255ToHsv(extractRgbValues(color ?? ''));

export const extractHsl = (hsl: string) => {
    const match = hsl.match(
        /hsl\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*\)/i,
    );

    if (!match) {
        return null;
    }

    const h = parseFloat(match[1] ?? '');
    const s = parseFloat(match[2] ?? '') / 100;
    const l = parseFloat(match[3] ?? '') / 100;

    return { h, s, l };
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
        const r = parseInt(match[1] ?? '', 10);
        const g = parseInt(match[2] ?? '', 10);
        const b = parseInt(match[3] ?? '', 10);
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
        a = result[4] ? parseInt(result[4], 16) / 100 : 1;

        return { r, g, b, a };
    }

    return {
        r: 255,
        g: 255,
        b: 255,
        a: 1,
    };
};

export const rgbToHex = ({ r, g, b, a = 1 }: RGBA): string => {
    const clamp = (value: number) => Math.max(0, Math.min(255, Math.round(value)));
    const alpha = Math.max(0, Math.min(1, a));
    const hex = (x: number) => {
        const hexValue = clamp(x).toString(16);
        return hexValue.length === 1 ? `0${hexValue}` : hexValue;
    };
    return `#${hex(r)}${hex(g)}${hex(b)}${alpha <= 1 ? hex(alpha * 100) : ''}`;
};
