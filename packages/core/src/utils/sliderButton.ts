import type { AnimationScope } from 'motion/react';

interface GetNearestPointProps {
    position: number;
    snapPoints: number[];
    scrollLeft: number;
}
export const getNearestPoint = ({ snapPoints, position, scrollLeft }: GetNearestPointProps) => {
    let nearestIndex = -1;
    let nearestPoint = -Infinity;

    for (let i = 0; i < snapPoints.length; i++) {
        const index = snapPoints[i];

        if (index && index < position + scrollLeft && index > nearestPoint) {
            nearestPoint = index;
            nearestIndex = i;
        }
    }

    nearestIndex = nearestIndex === -1 ? 0 : nearestIndex;
    nearestPoint = nearestPoint === -Infinity ? 0 : nearestPoint;

    return { nearestIndex, nearestPoint };
};

interface GetThumbPositionProps {
    scope: AnimationScope;
    itemWidth: number;
}

export const getThumbPosition = ({ itemWidth, scope }: GetThumbPositionProps) => {
    if (!scope.current) {
        return undefined;
    }

    const { transform } = (scope.current as HTMLElement).style;
    let position;

    if (transform === 'none') {
        position = 0;
    } else {
        const match = transform.match(/translateX\(([-\d.]+)px\)/);

        if (match && match[1]) {
            position = parseFloat(match[1]);
        }
    }

    if (typeof position !== 'number' && !position) {
        return undefined;
    }

    return { left: position, right: position + itemWidth, middle: position + itemWidth / 2 };
};
