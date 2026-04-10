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
import { NavigationSidebarGroup, NavigationSidebarProps } from './NavigationSidebar.types';
import {
    clampSideBarWidth,
    getNearestSideBarWidth,
    useGlobalUserSelect,
} from './NavigationSidebar.utils';
import { PanInfo } from 'motion';
import SidebarGroup from './sidebar-group/SidebarGroup';
import SidebarDivider from './sidebar-divider/SidebarDivider';

const NavigationSidebar: FC<NavigationSidebarProps> = ({
    color,
    minWidth,
    maxWidth,
    topContent,
    groups,
    selectedItemId,
    onItemClick,
}) => {
    const [width, setWidth] = useState<number>(minWidth);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const dragStartWidthRef = useRef<number>(minWidth);

    useGlobalUserSelect({ isDisabled: isDragging });

    const handlePanStart = useCallback((): void => {
        dragStartWidthRef.current = width;
        setIsDragging(true);
    }, [width]);

    const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>): void => {
        event.preventDefault();
        event.stopPropagation();
    }, []);

    const handlePan = useCallback(
        (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
            void event;

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
        (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
            void event;

            const nextWidth = clampSideBarWidth({
                width: dragStartWidthRef.current + info.offset.x,
                minWidth,
                maxWidth,
            });

            setIsDragging(false);
            setWidth(
                getNearestSideBarWidth({
                    width: nextWidth,
                    minWidth,
                    maxWidth,
                }),
            );
        },
        [maxWidth, minWidth],
    );

    const { pinnedGroups, scrollableGroups } = useMemo(
        () => ({
            pinnedGroups: groups.filter(({ isPinned }) => isPinned),
            scrollableGroups: groups.filter(({ isPinned }) => !isPinned),
        }),
        [groups],
    );

    const renderGroups = useCallback(
        (groupsToRender: NavigationSidebarGroup[]) =>
            groupsToRender.map(({ items, isReorderable, id }, index) => (
                <Fragment key={id}>
                    <SidebarGroup
                        items={items}
                        isReorderable={isReorderable}
                        selectedItemId={selectedItemId}
                        onClick={onItemClick}
                        color={color}
                    />

                    {index < groupsToRender.length - 1 && <SidebarDivider color={color} />}
                </Fragment>
            )),
        [color, onItemClick, selectedItemId],
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
