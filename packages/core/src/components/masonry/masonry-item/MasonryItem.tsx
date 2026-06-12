import React, { FC, useEffect, useRef } from 'react';
import { InternalMasonryItemProps, MasonryItemProps } from '../Masonry.types';
import { useMasonryContext } from '../Masonry.context';
import { StyledMasonryItem } from './MasonryItem.styles';

const MasonryItem: FC<MasonryItemProps> = ({ children }) => <>{children}</>;

export const InternalMasonryItem: FC<InternalMasonryItemProps> = ({
    children,
    itemKey,
    x,
    y,
    width,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const { registerItem } = useMasonryContext();

    useEffect(() => {
        const element = ref.current;

        if (!element) {
            return undefined;
        }

        let frameId: number | undefined;

        const updateHeight = () => {
            if (frameId) {
                window.cancelAnimationFrame(frameId);
            }

            frameId = window.requestAnimationFrame(() => {
                registerItem(itemKey, element.getBoundingClientRect().height);
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
    }, [itemKey, registerItem, width]);

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
                x,
                y,
                width,
            }}
            exit={{
                opacity: 0,
                scale: 0.96,
            }}
            transition={{
                type: 'spring',
                stiffness: 320,
                damping: 34,
                mass: 0.85,
            }}
        >
            {children}
        </StyledMasonryItem>
    );
};

MasonryItem.displayName = 'Masonry.Item';

export default MasonryItem;
