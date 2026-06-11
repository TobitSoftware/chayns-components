import React, { Children, FC, ReactElement, useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { MasonryProps } from './Masonry.types';
import { StyledMasonry } from './Masonry.styles';
import { MasonryItem } from './masonry-item/MasonryItem';
import { useMasonryLayout } from './Masonry.hooks';
import { useElementSize } from '../../hooks/element';

const getItemKey = (item: ReactElement, index: number) =>
    item.key != null ? String(item.key) : String(index);

const Masonry: FC<MasonryProps> = ({ children, gap = 16, minColumnWidth = 260 }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const containerSize = useElementSize(containerRef);

    const containerWidth = containerSize?.width ?? 0;

    const [itemHeights, setItemHeights] = useState<Record<string, number>>({});

    const items = useMemo(() => Children.toArray(children) as ReactElement[], [children]);

    const itemKeys = useMemo(() => items.map(getItemKey), [items]);

    const handleHeightChange = useCallback((key: string, height: number) => {
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

    const { layouts, containerHeight } = useMasonryLayout({
        itemKeys,
        itemHeights,
        containerWidth,
        gap,
        minColumnWidth,
    });

    return (
        <StyledMasonry ref={containerRef} $height={containerHeight}>
            <AnimatePresence>
                {items.map((item, index) => {
                    const itemKey = getItemKey(item, index);

                    return (
                        <MasonryItem
                            key={itemKey}
                            itemKey={itemKey}
                            layout={layouts[itemKey]}
                            onHeightChange={handleHeightChange}
                        >
                            {item}
                        </MasonryItem>
                    );
                })}
            </AnimatePresence>
        </StyledMasonry>
    );
};

Masonry.displayName = 'Masonry';

export default Masonry;
