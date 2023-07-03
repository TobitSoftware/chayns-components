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
    const { offsetTop, offsetLeft } = canvas.current;
    const x = coordinates.x - offsetTop;
    const y = coordinates.y - offsetLeft;
    const c = canvas.current?.getContext('2d');
    const p = c?.getImageData(x, y, 1, 1).data;

    if (!p) {
        return undefined;
    }

    // If transparency on the image
    if (p[0] === 0 && p[1] === 0 && p[2] === 0 && p[3] === 0) {
        return 'transparent';
    }

    return `rgba(${p[0] ?? 0}, ${p[1] ?? 0}, ${p[2] ?? 0}, ${p[3] ?? 0})`;
};
