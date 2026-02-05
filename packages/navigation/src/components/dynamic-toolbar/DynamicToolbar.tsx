import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Icon } from '@chayns-components/core';
import DynamicToolbarItemButton from './dynamic-toolbar-item-button/DynamicToolbarItemButton';
import DynamicToolbarOverflowTray from './dynamic-toolbar-overflow-tray/DynamicToolbarOverflowTray';
import {
    StyledDynamicToolbarBackground,
    StyledDynamicToolbarContent,
    StyledDynamicToolbarOverflowTrigger,
    StyledMotionDynamicToolbar,
} from './DynamicToolbar.styles';
import {
    DYNAMIC_TOOLBAR_BADGE_MAX_VALUE,
    DYNAMIC_TOOLBAR_BASE_CLASS,
    DYNAMIC_TOOLBAR_MIN_ITEM_WIDTH,
    DYNAMIC_TOOLBAR_SCROLL_HIDE_DELTA,
    DYNAMIC_TOOLBAR_VIEWPORT_WIDTH_RATIO,
} from './DynamicToolbar.constants';
import type { DynamicToolbarItem, DynamicToolbarProps } from './DynamicToolbar.types';
import { DynamicToolbarLayout } from './DynamicToolbar.types';

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

    const toolbarClassName = className
        ? `${DYNAMIC_TOOLBAR_BASE_CLASS} ${className}`
        : DYNAMIC_TOOLBAR_BASE_CLASS;

    const isHidden =
        (layout === DynamicToolbarLayout.Floating && isAutoHidden) ||
        layout === DynamicToolbarLayout.Hidden ||
        items.length === 0;

    const handleToggleOverflowTrayVisibility = useCallback(() => {
        setIsOverflowTrayOpen((prevState) => !prevState);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const updateAvailableWidth = () => {
            setAvailableWidth(window.innerWidth * DYNAMIC_TOOLBAR_VIEWPORT_WIDTH_RATIO);
        };

        // Toggle the floating toolbar visibility while tracking the last scroll position.
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
                    Math.abs(currentScrollY - previousScrollY) > DYNAMIC_TOOLBAR_SCROLL_HIDE_DELTA;

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

        const totalSlots = Math.max(1, Math.floor(availableWidth / DYNAMIC_TOOLBAR_MIN_ITEM_WIDTH));

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
                    badgeMaxValue={DYNAMIC_TOOLBAR_BADGE_MAX_VALUE}
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
                    className={toolbarClassName}
                    exit={{ y: '100%' }}
                    initial={{ y: '100%' }}
                    key="dynamic-toolbar"
                    transition={{ duration: 0.2, type: 'tween' }}
                >
                    <DynamicToolbarOverflowTray
                        activeItemId={activeItemId}
                        handleItemSelection={handleItemSelection}
                        items={overflowItems}
                        isOpen={isOverflowTrayOpen}
                        key="overflow-tray"
                    />
                    <StyledDynamicToolbarBackground $layout={layout} />
                    <StyledDynamicToolbarContent>
                        {renderedVisibleItems}
                    </StyledDynamicToolbarContent>
                    {overflowItems.length > 0 && (
                        <StyledDynamicToolbarOverflowTrigger
                            onClick={handleToggleOverflowTrayVisibility}
                        >
                            <Icon
                                color={layout === DynamicToolbarLayout.Area ? 'white' : undefined}
                                icons={['fa fa-ellipsis-vertical']}
                                size={22}
                            />
                        </StyledDynamicToolbarOverflowTrigger>
                    )}
                </StyledMotionDynamicToolbar>
            )}
        </AnimatePresence>
    );
};

DynamicToolbar.displayName = 'DynamicToolbar';

export default DynamicToolbar;
