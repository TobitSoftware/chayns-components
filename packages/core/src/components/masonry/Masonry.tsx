import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { useElementSize } from '../../hooks/element';
import { MasonryComponent, MasonryItemProps, MasonryProps } from './Masonry.types';
import { MasonryContext } from './Masonry.context';
import { StyledMasonry } from './Masonry.styles';
import { useMasonryColumnCount, useMasonryItems, useMasonryLayout } from './Masonry.hooks';
import { getMasonryItemKey } from './Masonry.utils';
import MasonryItem, { InternalMasonryItem } from './masonry-item/MasonryItem';

const MasonryBase: FC<MasonryProps> = ({ children, gap = 8, columnWidth = 80, rowHeight = 80 }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const size = useElementSize(ref);

    const containerWidth = size?.width ?? 0;

    const [itemHeights, setItemHeights] = useState<Record<string, number>>({});

    const items = useMasonryItems({ children });

    const columnCount = useMasonryColumnCount({
        containerWidth,
        columnWidth,
        gap,
    });

    const layout = useMasonryLayout({
        items,
        itemHeights,
        columnCount,
        columnWidth,
        rowHeight,
        gap,
    });

    const registerItem = useCallback((key: string, height: number) => {
        setItemHeights((currentHeights) => {
            if (currentHeights[key] === height) {
                return currentHeights;
            }

            return {
                ...currentHeights,
                [key]: height,
            };
        });
    }, []);

    const contextValue = useMemo(
        () => ({
            registerItem,
        }),
        [registerItem],
    );

    return (
        <MasonryContext.Provider value={contextValue}>
            <StyledMasonry ref={ref} $height={layout.height}>
                <AnimatePresence>
                    {items.map((item, index) => {
                        const key = getMasonryItemKey(
                            item as React.ReactElement<MasonryItemProps>,
                            index,
                        );

                        const packedItem = layout.items[key];

                        if (!packedItem) {
                            return null;
                        }

                        return (
                            <InternalMasonryItem
                                key={key}
                                itemKey={key}
                                x={packedItem.x}
                                y={packedItem.y}
                                width={packedItem.width}
                            >
                                {item.props.children}
                            </InternalMasonryItem>
                        );
                    })}
                </AnimatePresence>
            </StyledMasonry>
        </MasonryContext.Provider>
    );
};

MasonryBase.displayName = 'Masonry';

const Masonry = Object.assign(MasonryBase, {
    Item: MasonryItem,
}) as MasonryComponent;

export default Masonry;
