import { MasonryLayouts } from './Masonry.types';

interface CalculateMasonryLayoutParams {
    itemKeys: string[];
    itemHeights: Record<string, number>;
    containerWidth: number;
    gap: number;
    minColumnWidth: number;
}

export const calculateMasonryLayout = ({
    itemKeys,
    itemHeights,
    containerWidth,
    gap,
    minColumnWidth,
}: CalculateMasonryLayoutParams) => {
    if (!containerWidth) {
        return {
            layouts: {} as MasonryLayouts,
            containerHeight: 0,
            columnWidth: 0,
            columnCount: 1,
        };
    }

    const columnCount = Math.max(1, Math.floor((containerWidth + gap) / (minColumnWidth + gap)));

    const columnWidth = (containerWidth - gap * (columnCount - 1)) / columnCount;

    const columnHeights = Array.from({ length: columnCount }, () => 0);
    const layouts: MasonryLayouts = {};

    itemKeys.forEach((key) => {
        const smallestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));

        const x = smallestColumnIndex * (columnWidth + gap);
        const y = columnHeights[smallestColumnIndex];

        layouts[key] = {
            x,
            y,
            width: columnWidth,
        };

        columnHeights[smallestColumnIndex] += (itemHeights[key] ?? 0) + gap;
    });

    const containerHeight = Math.max(...columnHeights, 0) - gap;

    return {
        layouts,
        containerHeight: Math.max(containerHeight, 0),
        columnWidth,
        columnCount,
    };
};
