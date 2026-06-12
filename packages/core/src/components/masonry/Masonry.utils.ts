import { ReactElement } from 'react';
import {
    MasonryItemProps,
    MasonryLayoutItem,
    PackedMasonryGrid,
    PackedMasonryItem,
} from './Masonry.types';

export const getMasonryItemKey = (item: ReactElement<MasonryItemProps>, index: number) =>
    item.key != null ? String(item.key) : String(index);

interface IsAreaFreeParams {
    grid: boolean[][];
    startColumn: number;
    startRow: number;
    columns: number;
    rows: number;
    columnCount: number;
}

const isAreaFree = ({
    grid,
    startColumn,
    startRow,
    columns,
    rows,
    columnCount,
}: IsAreaFreeParams) => {
    if (startColumn + columns > columnCount) {
        return false;
    }

    for (let row = startRow; row < startRow + rows; row += 1) {
        for (let column = startColumn; column < startColumn + columns; column += 1) {
            if (grid[row]?.[column]) {
                return false;
            }
        }
    }

    return true;
};

interface OccupyAreaParams {
    grid: boolean[][];
    startColumn: number;
    startRow: number;
    columns: number;
    rows: number;
}

const occupyArea = ({ grid, startColumn, startRow, columns, rows }: OccupyAreaParams) => {
    for (let row = startRow; row < startRow + rows; row += 1) {
        if (!grid[row]) {
            // eslint-disable-next-line no-param-reassign
            grid[row] = [];
        }

        for (let column = startColumn; column < startColumn + columns; column += 1) {
            // eslint-disable-next-line no-param-reassign
            (grid[row] as boolean[])[column] = true;
        }
    }
};

interface PackMasonryGridParams {
    items: MasonryLayoutItem[];
    columnCount: number;
    columnWidth: number;
    rowHeight: number;
    gap: number;
}

export const packMasonryGrid = ({
    items,
    columnCount,
    columnWidth,
    rowHeight,
    gap,
}: PackMasonryGridParams): PackedMasonryGrid => {
    const grid: boolean[][] = [];
    const packedItems: Record<string, PackedMasonryItem> = {};

    let maxRow = 0;

    items.forEach((item) => {
        const columns = Math.min(Math.max(item.columns, 1), columnCount);
        const rows = Math.max(item.rows, 1);

        let placed = false;
        let row = 0;

        while (!placed) {
            for (let column = 0; column < columnCount; column += 1) {
                const canPlaceItem = isAreaFree({
                    grid,
                    startColumn: column,
                    startRow: row,
                    columns,
                    rows,
                    columnCount,
                });

                if (!canPlaceItem) {
                    continue;
                }

                occupyArea({
                    grid,
                    startColumn: column,
                    startRow: row,
                    columns,
                    rows,
                });

                packedItems[item.key] = {
                    key: item.key,
                    x: column * (columnWidth + gap),
                    y: row * (rowHeight + gap),
                    width: columns * columnWidth + (columns - 1) * gap,
                };

                maxRow = Math.max(maxRow, row + rows);
                placed = true;
                break;
            }

            if (!placed) {
                row += 1;
            }
        }
    });

    return {
        items: packedItems,
        height: maxRow * rowHeight + Math.max(0, maxRow - 1) * gap,
    };
};

export const calculateColumnCount = ({
    containerWidth,
    columnWidth,
    gap,
}: {
    containerWidth: number;
    columnWidth: number;
    gap: number;
}) => {
    if (!containerWidth) {
        return 1;
    }

    return Math.max(1, Math.floor((containerWidth + gap) / (columnWidth + gap)));
};

export const calculateRowSpan = ({
    height,
    rowHeight,
    gap,
}: {
    height: number;
    rowHeight: number;
    gap: number;
}) => Math.max(1, Math.ceil((height + gap) / (rowHeight + gap)));
