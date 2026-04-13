import React, {
    FC,
    useCallback,
    useMemo,
    useRef,
    useState,
    PointerEvent as ReactPointerEvent,
    Fragment,
} from 'react';
import {
    StyledMotionNavigationSidebar,
    StyledMotionNavigationSidebarContentList,
    StyledMotionNavigationSidebarContent,
    StyledNavigationSidebarResizeHandle,
} from './NavigationSidebar.styles';
import { NavigationSidebarProps } from './NavigationSidebar.types';
import {
    clampSideBarWidth,
    getNearestSideBarWidth,
    getSideBarCompactBreakpoint,
    useGlobalUserSelect,
} from './NavigationSidebar.utils';
import { PanInfo } from 'motion';
import SidebarGroup from './sidebar-group/SidebarGroup';
import SidebarDivider from './sidebar-divider/SidebarDivider';
import { NavigationLayoutGroup } from '../NavigationLayout.types';

const NavigationSidebar: FC<NavigationSidebarProps> = ({
    color,
    minWidth,
    maxWidth,
    topContent,
    groups,
    selectedItemId,
    onItemClick,
    onSidebarOpen,
    onSidebarClose,
    shouldShowCollapsedLabel,
}) => {
    const [width, setWidth] = useState<number>(minWidth);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const dragStartWidthRef = useRef<number>(minWidth);

    useGlobalUserSelect({ isDisabled: isDragging });

    const isCompact = useMemo(
        () => width < getSideBarCompactBreakpoint({ minWidth, maxWidth }),
        [maxWidth, minWidth, width],
    );

    const handlePanStart = useCallback((): void => {
        dragStartWidthRef.current = width;
        setIsDragging(true);
    }, [width]);

    const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>): void => {
        event.preventDefault();
        event.stopPropagation();
    }, []);

    const handlePan = useCallback(
        (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
            setWidth(
                clampSideBarWidth({
                    width: dragStartWidthRef.current + info.offset.x,
                    minWidth,
                    maxWidth,
                }),
            );
        },
        [maxWidth, minWidth],
    );

    const handlePanEnd = useCallback(
        (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
            const nextWidth = clampSideBarWidth({
                width: dragStartWidthRef.current + info.offset.x,
                minWidth,
                maxWidth,
            });

            const nearestWidth = getNearestSideBarWidth({
                width: nextWidth,
                minWidth,
                maxWidth,
            });

            setIsDragging(false);
            setWidth(nearestWidth);

            dragStartWidthRef.current = nearestWidth;

            if (typeof onSidebarOpen === 'function' && nearestWidth === maxWidth) {
                onSidebarOpen();
            }

            if (typeof onSidebarClose === 'function' && nearestWidth === minWidth) {
                onSidebarClose();
            }
        },
        [maxWidth, minWidth, onSidebarClose, onSidebarOpen],
    );

    const { pinnedGroups, scrollableGroups } = useMemo(
        () => ({
            pinnedGroups: groups.filter(({ isPinned }) => isPinned),
            scrollableGroups: groups.filter(({ isPinned }) => !isPinned),
        }),
        [groups],
    );

    const renderGroups = useCallback(
        (groupsToRender: NavigationLayoutGroup[]) =>
            groupsToRender.map(({ items, isReorderable, id }, index) => (
                <Fragment key={id}>
                    <SidebarGroup
                        items={items}
                        isCompact={isCompact}
                        selectedItemId={selectedItemId}
                        onClick={onItemClick}
                        color={color}
                        shouldShowCollapsedLabel={shouldShowCollapsedLabel && width === minWidth}
                    />

                    {index < groupsToRender.length - 1 && <SidebarDivider color={color} />}
                </Fragment>
            )),
        [isCompact, selectedItemId, onItemClick, color, shouldShowCollapsedLabel, width, minWidth],
    );

    return (
        <StyledMotionNavigationSidebar
            $color={color}
            initial={false}
            animate={{ width }}
            transition={
                isDragging
                    ? {
                          duration: 0,
                      }
                    : {
                          type: 'spring',
                          stiffness: 320,
                          damping: 30,
                      }
            }
            id="sidebar"
            data-navigation-sidebar-root="true"
        >
            <StyledMotionNavigationSidebarContent>
                {topContent}
                {pinnedGroups.length > 0 && (
                    <StyledMotionNavigationSidebarContentList $isPinned>
                        {renderGroups(pinnedGroups)}
                    </StyledMotionNavigationSidebarContentList>
                )}
                {pinnedGroups.length > 0 && scrollableGroups.length > 0 && (
                    <SidebarDivider color={color} />
                )}
                {scrollableGroups.length > 0 && (
                    <StyledMotionNavigationSidebarContentList
                        $isPinned
                        className="chayns-scrollbar"
                    >
                        {renderGroups(scrollableGroups)}
                    </StyledMotionNavigationSidebarContentList>
                )}
            </StyledMotionNavigationSidebarContent>
            <StyledNavigationSidebarResizeHandle
                onPointerDown={handlePointerDown}
                onPanStart={handlePanStart}
                onPan={handlePan}
                onPanEnd={handlePanEnd}
            />
        </StyledMotionNavigationSidebar>
    );
};

NavigationSidebar.displayName = 'NavigationSidebar';

export default NavigationSidebar;
