import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyledDynamicToolbarContent, StyledMotionDynamicToolbar } from './DynamicToolbar.styles';
import type { DynamicToolbarItem, DynamicToolbarProps } from './DynamicToolbar.types';
import { DynamicToolbarLayout } from './DynamicToolbar.types';
import { AnimatePresence } from 'motion/react';
import DynamicToolbarItemButton from './dynamic-toolbar-item-button/DynamicToolbarItemButton';

const BADGE_MAX_VALUE = 99;
const MIN_ITEM_WIDTH = 64;
const SCROLL_HIDE_DELTA = 20;
const VIEWPORT_WIDTH_RATIO = 0.8;

const DynamicToolbar: FC<DynamicToolbarProps> = ({
    activeItemId,
    className,
    items = [],
    layout = DynamicToolbarLayout.Floating,
    onItemSelect,
}) => {
    const [isAutoHidden, setIsAutoHidden] = useState(false);
    const [isOverflowTrayOpen, setIsOverflowTrayOpen] = useState(false);
    const [availableWidth, setAvailableWidth] = useState<number>();

    const previousScrollYRef = useRef(0);
    const scrollAnimationFrame = useRef<number>();

    const isHidden =
        (layout === DynamicToolbarLayout.Floating && isAutoHidden) ||
        layout === DynamicToolbarLayout.Hidden ||
        items.length === 0;

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const updateAvailableWidth = () => {
            setAvailableWidth(window.innerWidth * VIEWPORT_WIDTH_RATIO);
        };

        const handleScroll = () => {
            if (scrollAnimationFrame.current) {
                return;
            }

            scrollAnimationFrame.current = window.requestAnimationFrame(() => {
                scrollAnimationFrame.current = undefined;

                const currentScrollY = window.scrollY;
                const previousScrollY = previousScrollYRef.current;
                const isScrollingDown = currentScrollY > previousScrollY;
                const hasReachedHideThreshold =
                    Math.abs(currentScrollY - previousScrollY) > SCROLL_HIDE_DELTA;

                if (isScrollingDown && hasReachedHideThreshold) {
                    previousScrollYRef.current = currentScrollY;
                    setIsAutoHidden(true);
                    setIsOverflowTrayOpen(false);

                    return;
                }

                if (!isScrollingDown && hasReachedHideThreshold) {
                    previousScrollYRef.current = currentScrollY;
                    setIsAutoHidden(false);

                    return;
                }

                previousScrollYRef.current = currentScrollY;
            });
        };

        updateAvailableWidth();

        window.addEventListener('resize', updateAvailableWidth);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('resize', updateAvailableWidth);
            window.removeEventListener('scroll', handleScroll);

            if (scrollAnimationFrame.current) {
                window.cancelAnimationFrame(scrollAnimationFrame.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isHidden && isOverflowTrayOpen) {
            setIsOverflowTrayOpen(false);
        }
    }, [isHidden, isOverflowTrayOpen]);

    const handleItemSelection = useCallback(
        (item: DynamicToolbarItem) => {
            if (item.isDisabled) {
                return;
            }

            onItemSelect?.(item);
        },
        [onItemSelect],
    );

    const { visibleItems, overflowItems } = useMemo(() => {
        // Derive how many items fit into the toolbar before overflowing.
        if (!availableWidth) {
            return { visibleItems: items, overflowItems: [] };
        }

        const totalSlots = Math.max(1, Math.floor(availableWidth / MIN_ITEM_WIDTH));

        if (items.length <= totalSlots) {
            return { visibleItems: items, overflowItems: [] };
        }

        const visibleCount = Math.max(1, totalSlots - 1);

        return {
            visibleItems: items.slice(0, visibleCount),
            overflowItems: items.slice(visibleCount),
        };
    }, [availableWidth, items]);

    useEffect(() => {
        if (overflowItems.length === 0 && isOverflowTrayOpen) {
            setIsOverflowTrayOpen(false);
        }
    }, [overflowItems.length, isOverflowTrayOpen]);

    const renderedVisibleItems = useMemo(
        () =>
            visibleItems.map((item) => (
                <DynamicToolbarItemButton
                    badgeMaxValue={BADGE_MAX_VALUE}
                    isActive={item.id === activeItemId}
                    item={item}
                    key={item.id}
                    onSelect={handleItemSelection}
                />
            )),
        [activeItemId, handleItemSelection, visibleItems],
    );

    return (
        <AnimatePresence initial={false}>
            {!isHidden && (
                <StyledMotionDynamicToolbar
                    animate={{ y: 0 }}
                    className={className}
                    exit={{ y: '100%' }}
                    initial={{ y: '100%' }}
                >
                    <StyledDynamicToolbarContent $layout={layout}>
                        {renderedVisibleItems}
                    </StyledDynamicToolbarContent>
                </StyledMotionDynamicToolbar>
            )}
        </AnimatePresence>
    );
};

DynamicToolbar.displayName = 'DynamicToolbar';

export default DynamicToolbar;
