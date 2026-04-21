import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ExpandableContent, Icon, Tooltip } from '@chayns-components/core';
import {
    StyledSidebarItem,
    StyledSidebarItemChildren,
    StyledSidebarItemHead,
    StyledSidebarItemHeadContent,
    StyledSidebarItemIcon,
    StyledSidebarItemIconImage,
    StyledSidebarItemLabel,
    StyledMotionSidebarOpenIcon,
    StyledSidebarItemPopup,
} from './SidebarItem.styles';
import { NavigationLayoutItem } from '../../../NavigationLayout.types';
import { isItemOrChildSelected } from './SidebarItem.utils';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'motion/react';
import { useSidebarItemPopup, useSidebarItemReorder } from './SidebarItem.hooks';
import { StyledSidebarDropZone } from '../SidebarGroup.styles';
import { useNavigationSidebarContext } from '../../NavigationSidebar.context';
import { useSidebarGroupReorderContext } from '../SidebarGroup.context';

interface SidebarItemProps {
    item: NavigationLayoutItem;
    index: number;
    parentIds: NavigationLayoutItem['id'][];
    shouldShowCollapsedLabel?: boolean;
}

const SidebarItem: FC<SidebarItemProps> = ({
    item,
    index,
    parentIds,
    shouldShowCollapsedLabel: shouldShowCollapsedLabelProp,
}) => {
    const {
        children: childItems,
        disabledReason,
        icons,
        id,
        imageElement,
        imageUrl,
        isDisabled,
        label,
    } = item;
    const [shouldShowChildren, setShouldShowChildren] = useState(false);
    const { color, isCompact, onItemClick, selectedItemId, shouldShowCollapsedLabel } =
        useNavigationSidebarContext();
    const {
        draggedItemId,
        dropTarget,
        isReorderEnabled,
        onDragEnd,
        onDragStart,
        onDrop,
        onDropTargetChange,
    } = useSidebarGroupReorderContext();
    const resolvedShouldShowCollapsedLabel =
        shouldShowCollapsedLabelProp ?? shouldShowCollapsedLabel;
    const {
        coordinates,
        handleMouseEnter,
        handleMouseLeave,
        isHovered,
        itemRef,
        popupContainer,
        shouldRenderPopup,
    } = useSidebarItemPopup({
        isDisabled: Boolean(isDisabled),
        shouldShowCollapsedLabel: resolvedShouldShowCollapsedLabel,
    });
    const {
        canDragItem,
        canDropInsideItem,
        childParentIds,
        childListEndTarget,
        handleBeforeDragOver,
        handleBeforeDrop,
        handleChildListEndDragOver,
        handleChildListEndDrop,
        handleDragEnd,
        handleDragStart,
        handleInsideDragOver,
        handleInsideDrop,
        isBeforeDropTargetActive,
        isChildListEndTargetActive,
        isDragging,
        isInsideDropTargetActive,
    } = useSidebarItemReorder({
        childItems,
        draggedItemId,
        dropTarget,
        id,
        index,
        isDisabled,
        isReorderEnabled,
        onDragEnd,
        onDragStart,
        onDrop,
        onDropInside: () => setShouldShowChildren(true),
        onDropTargetChange,
        parentIds,
    });

    const isSelected = useMemo(
        () => isItemOrChildSelected(item, selectedItemId),
        [item, selectedItemId],
    );

    useEffect(() => {
        if (isCompact) {
            setShouldShowChildren(false);
        }
    }, [isCompact]);

    const handleClick = useCallback(() => {
        if (isDisabled || typeof onItemClick !== 'function') {
            return;
        }

        onItemClick(id, parentIds);
    }, [id, isDisabled, onItemClick, parentIds]);

    const handleOpenIconClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setShouldShowChildren((previousValue) => !previousValue);
    }, []);

    const renderChildItem = useCallback(
        (childItem: NavigationLayoutItem, childIndex: number) => (
            <SidebarItem
                key={childItem.id}
                item={childItem}
                index={childIndex}
                parentIds={childParentIds}
                shouldShowCollapsedLabel={false}
            />
        ),
        [childParentIds],
    );

    const children = useMemo(() => {
        if (!childItems?.length) {
            return null;
        }

        return childItems.map(renderChildItem);
    }, [childItems, renderChildItem]);

    return (
        <StyledSidebarItem>
            {isReorderEnabled && (
                <StyledSidebarDropZone
                    $depth={parentIds.length}
                    $isActive={isBeforeDropTargetActive}
                    $isDragging={!!draggedItemId}
                    $placement="before"
                    onDragOver={handleBeforeDragOver}
                    onDrop={handleBeforeDrop}
                />
            )}
            <Tooltip
                item={{ text: disabledReason ?? '' }}
                isDisabled={!disabledReason}
                shouldUseFullWidth
            >
                <StyledSidebarItemHead
                    ref={itemRef}
                    $shouldHighlight={!isDisabled && (isHovered || isSelected)}
                    $isDisabled={isDisabled}
                    $hasDisabledReason={!!disabledReason}
                    $isDragging={isDragging}
                    $isReorderable={canDragItem}
                    draggable={canDragItem}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                    <StyledSidebarItemHeadContent>
                        <StyledSidebarItemIcon>
                            {imageUrl && <StyledSidebarItemIconImage src={imageUrl} />}
                            {imageElement}
                            {icons && <Icon icons={icons} size={21} color={color} />}
                        </StyledSidebarItemIcon>
                        <StyledSidebarItemLabel>{label}</StyledSidebarItemLabel>
                    </StyledSidebarItemHeadContent>
                    {!!children && !isCompact && !isDisabled && (
                        <StyledMotionSidebarOpenIcon
                            initial={false}
                            animate={{ rotate: shouldShowChildren ? 180 : 0 }}
                            transition={{ type: 'tween' }}
                            onClick={handleOpenIconClick}
                        >
                            <Icon icons={['fa fa-chevron-down']} color={color} />
                        </StyledMotionSidebarOpenIcon>
                    )}
                </StyledSidebarItemHead>
            </Tooltip>
            {canDropInsideItem && (
                <StyledSidebarDropZone
                    $depth={childParentIds.length}
                    $isActive={isInsideDropTargetActive}
                    $isDragging={!!draggedItemId}
                    $placement="inside"
                    onDragOver={handleInsideDragOver}
                    onDrop={handleInsideDrop}
                />
            )}
            {!!children && (
                <ExpandableContent isOpen={shouldShowChildren}>
                    <StyledSidebarItemChildren>
                        {children}
                        {isReorderEnabled && childListEndTarget && (
                            <StyledSidebarDropZone
                                $depth={childParentIds.length}
                                $isActive={isChildListEndTargetActive}
                                $isDragging={!!draggedItemId}
                                $placement="after"
                                onDragOver={handleChildListEndDragOver}
                                onDrop={handleChildListEndDrop}
                            />
                        )}
                    </StyledSidebarItemChildren>
                </ExpandableContent>
            )}
            {popupContainer &&
                createPortal(
                    <AnimatePresence initial={false}>
                        {shouldRenderPopup && coordinates && (
                            <StyledSidebarItemPopup $coordinates={coordinates}>
                                {label}
                            </StyledSidebarItemPopup>
                        )}
                    </AnimatePresence>,
                    popupContainer,
                )}
        </StyledSidebarItem>
    );
};

SidebarItem.displayName = 'SidebarItem';

export default memo(SidebarItem);
