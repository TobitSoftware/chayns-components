import type { AnimationScope } from 'framer-motion';

interface GetNearestPointProps {
    position: number;
    snapPoints: number[];
}
export const getNearestPoint = ({ snapPoints, position }: GetNearestPointProps) => {
    let nearestIndex = -1;
    let nearestPoint = -Infinity;

    for (let i = 0; i < snapPoints.length; i++) {
        const index = snapPoints[i];

        if (index && index < position && index > nearestPoint) {
            nearestPoint = index;
            nearestIndex = i;
        }
    }

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

    if (!position) {
        return undefined;
    }

    return position + itemWidth / 2;
};
