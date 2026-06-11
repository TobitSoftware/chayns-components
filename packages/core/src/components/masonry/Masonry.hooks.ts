import { useMemo } from 'react';
import { calculateMasonryLayout } from './Masonry.utils';

interface UseMasonryLayoutParams {
    itemKeys: string[];
    itemHeights: Record<string, number>;
    containerWidth: number;
    gap: number;
    minColumnWidth: number;
}

export const useMasonryLayout = ({
    itemKeys,
    itemHeights,
    containerWidth,
    gap,
    minColumnWidth,
}: UseMasonryLayoutParams) =>
    useMemo(
        () =>
            calculateMasonryLayout({
                itemKeys,
                itemHeights,
                containerWidth,
                gap,
                minColumnWidth,
            }),
        [itemKeys, itemHeights, containerWidth, gap, minColumnWidth],
    );
