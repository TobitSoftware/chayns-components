import React, { FC, ReactElement, useEffect, useRef } from 'react';
import { MasonryItemLayout } from '../Masonry.types';
import { StyledMasonryItem } from './MasonryItem.styles';

interface MasonryItemProps {
    children: ReactElement;
    itemKey: string;
    layout?: MasonryItemLayout;
    onHeightChange: (key: string, height: number) => void;
}

export const MasonryItem: FC<MasonryItemProps> = ({
    children,
    itemKey,
    layout,
    onHeightChange,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const element = ref.current;

        if (!element) return undefined;

        let frameId: number | undefined;

        const updateHeight = () => {
            if (frameId) {
                window.cancelAnimationFrame(frameId);
            }

            frameId = window.requestAnimationFrame(() => {
                onHeightChange(itemKey, element.getBoundingClientRect().height);
            });
        };

        updateHeight();

        const observer = new ResizeObserver(updateHeight);

        observer.observe(element);

        return () => {
            if (frameId) {
                window.cancelAnimationFrame(frameId);
            }

            observer.disconnect();
        };
    }, [itemKey, onHeightChange]);

    return (
        <StyledMasonryItem
            ref={ref}
            initial={{
                opacity: 0,
                scale: 0.96,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                x: layout?.x ?? 0,
                y: layout?.y ?? 0,
                width: layout?.width ?? 0,
            }}
            exit={{
                opacity: 0,
                scale: 0.96,
            }}
            transition={{
                type: 'spring',
                stiffness: 320,
                damping: 34,
                mass: 0.8,
            }}
        >
            {children}
        </StyledMasonryItem>
    );
};
