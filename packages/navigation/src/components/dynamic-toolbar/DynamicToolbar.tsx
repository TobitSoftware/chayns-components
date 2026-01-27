import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@chayns-components/core';
import {
    StyledDynamicToolbarContent,
    StyledDynamicToolbarOverflowTrigger,
    StyledMotionDynamicToolbar,
} from './DynamicToolbar.styles';
import type { DynamicToolbarItem, DynamicToolbarProps } from './DynamicToolbar.types';
import { DynamicToolbarLayout } from './DynamicToolbar.types';
import { AnimatePresence } from 'motion/react';
import DynamicToolbarItemButton from './dynamic-toolbar-item-button/DynamicToolbarItemButton';

const BADGE_MAX_VALUE = 99;
const MIN_ITEM_WIDTH = 64;
const SCROLL_HIDE_DELTA = 20;

const DynamicToolbar: FC<DynamicToolbarProps> = ({
    activeItemId,
    className,
    items = [],
    layout = DynamicToolbarLayout.Floating,
    onItemSelect,
}) => {
    const [isAutoHidden, setIsAutoHidden] = useState(false);
    const [isOverflowTrayOpen, setIsOverflowTrayOpen] = useState(false);
    const [toolbarWidth, setToolbarWidth] = useState<number>();

    const previousScrollYRef = useRef(0);
    const scrollAnimationFrame = useRef<number>();
    const toolbarRef = useRef<HTMLDivElement>(null);

    const isHidden =
        (layout === DynamicToolbarLayout.Floating && isAutoHidden) ||
        layout === DynamicToolbarLayout.Hidden ||
        items.length === 0;

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

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

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            if (scrollAnimationFrame.current) {
                window.cancelAnimationFrame(scrollAnimationFrame.current);
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const element = toolbarRef.current;

        if (!element) {
            return undefined;
        }

        setToolbarWidth(element.clientWidth);

        if (typeof ResizeObserver !== 'undefined') {
            const observer = new ResizeObserver((entries) => {
                const entry = entries[0];

                if (entry) {
                    setToolbarWidth(entry.contentRect.width);
                }
            });

            observer.observe(element);

            return () => {
                observer.disconnect();
            };
        }

        const handleResize = () => {
            setToolbarWidth(element.clientWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
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
        if (!toolbarWidth) {
            return { visibleItems: items, overflowItems: [] };
        }

        const totalSlots = Math.max(1, Math.floor(toolbarWidth / MIN_ITEM_WIDTH));

        if (items.length <= totalSlots) {
            return { visibleItems: items, overflowItems: [] };
        }

        const visibleCount = Math.max(1, totalSlots - 1);

        return {
            visibleItems: items.slice(0, visibleCount),
            overflowItems: items.slice(visibleCount),
        };
    }, [items, toolbarWidth]);

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

    const shouldRenderOverflowTrigger = overflowItems.length > 0;

    if (isHidden) return null;

    return (
        <AnimatePresence initial={false}>
            {!isHidden && (
                <StyledMotionDynamicToolbar ref={toolbarRef} className={className}>
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
