import { Children, ReactNode, useMemo } from 'react';
import { MasonryChild, MasonryItemProps, MasonryLayoutItem } from './Masonry.types';
import {
    calculateColumnCount,
    calculateRowSpan,
    getMasonryItemKey,
    packMasonryGrid,
} from './Masonry.utils';

interface UseMasonryItemsParams {
    children: ReactNode;
}

export const useMasonryItems = ({ children }: UseMasonryItemsParams) =>
    useMemo(() => Children.toArray(children) as MasonryChild[], [children]);

interface UseMasonryLayoutParams {
    items: MasonryChild[];
    itemHeights: Record<string, number>;
    columnCount: number;
    columnWidth: number;
    rowHeight: number;
    gap: number;
}

export const useMasonryLayout = ({
    items,
    itemHeights,
    columnCount,
    columnWidth,
    rowHeight,
    gap,
}: UseMasonryLayoutParams) =>
    useMemo(() => {
        const layoutItems: MasonryLayoutItem[] = items.map((item, index) => {
            const key = getMasonryItemKey(item as React.ReactElement<MasonryItemProps>, index);

            const height = itemHeights[key] ?? rowHeight;

            return {
                key,
                columns: item.props.columns ?? 1,
                rows: calculateRowSpan({
                    height,
                    rowHeight,
                    gap,
                }),
            };
        });

        return packMasonryGrid({
            items: layoutItems,
            columnCount,
            columnWidth,
            rowHeight,
            gap,
        });
    }, [items, itemHeights, columnCount, columnWidth, rowHeight, gap]);

interface UseMasonryColumnCountParams {
    containerWidth: number;
    columnWidth: number;
    gap: number;
}

export const useMasonryColumnCount = ({
    containerWidth,
    columnWidth,
    gap,
}: UseMasonryColumnCountParams) =>
    useMemo(
        () =>
            calculateColumnCount({
                containerWidth,
                columnWidth,
                gap,
            }),
        [containerWidth, columnWidth, gap],
    );
