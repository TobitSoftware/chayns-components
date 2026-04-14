import React, { FC, memo, useMemo } from 'react';
import { StyledSidebarDropZone, StyledSidebarGroup } from './SidebarGroup.styles';
import { NavigationLayoutGroup, NavigationLayoutItem } from '../../NavigationLayout.types';
import SidebarItem from './sidebar-item/SidebarItem';
import { SidebarGroupReorderProvider } from './SidebarGroup.context';
import { useSidebarGroupReorder } from './SidebarGroup.hooks';
import { useNavigationSidebarContext } from '../NavigationSidebar.context';
import { useNavigationLayoutContext } from '../../NavigationLayout.context';

interface SidebarGroupProps {
    groupId: NavigationLayoutGroup['id'];
    items: NavigationLayoutItem[];
    isReorderable?: NavigationLayoutGroup['isReorderable'];
}

const SidebarGroup: FC<SidebarGroupProps> = ({ groupId, items, isReorderable }) => {
    const { isCompact } = useNavigationSidebarContext();
    const { onItemReorder } = useNavigationLayoutContext();
    const {
        draggedItemId,
        dropTarget,
        isDragging,
        isGroupEndTargetActive,
        isReorderEnabled,
        handleDragEnd,
        handleDragStart,
        handleDrop,
        handleDropTargetChange,
        handleGroupDragOver,
        handleGroupDrop,
        handleGroupEndDragOver,
        handleGroupEndDrop,
    } = useSidebarGroupReorder({
        groupId,
        isCompact,
        isReorderable,
        items,
        onItemReorder,
    });

    const contextValue = useMemo(
        () => ({
            draggedItemId,
            dropTarget,
            isDragging,
            isReorderEnabled,
            onDragEnd: handleDragEnd,
            onDragStart: handleDragStart,
            onDrop: handleDrop,
            onDropTargetChange: handleDropTargetChange,
        }),
        [
            draggedItemId,
            dropTarget,
            handleDragEnd,
            handleDragStart,
            handleDrop,
            handleDropTargetChange,
            isDragging,
            isReorderEnabled,
        ],
    );

    const content = useMemo(
        () =>
            items.map((item, index) => (
                <SidebarItem key={item.id} item={item} index={index} parentIds={[]} />
            )),
        [items],
    );

    return (
        <SidebarGroupReorderProvider value={contextValue}>
            <StyledSidebarGroup onDragOver={handleGroupDragOver} onDrop={handleGroupDrop}>
                {content}
                {isReorderEnabled && (
                    <StyledSidebarDropZone
                        $isActive={isGroupEndTargetActive}
                        $isDragging={isDragging}
                        $placement="after"
                        onDragOver={handleGroupEndDragOver}
                        onDrop={handleGroupEndDrop}
                    />
                )}
            </StyledSidebarGroup>
        </SidebarGroupReorderProvider>
    );
};

SidebarGroup.displayName = 'SidebarGroup';

export default memo(SidebarGroup);
