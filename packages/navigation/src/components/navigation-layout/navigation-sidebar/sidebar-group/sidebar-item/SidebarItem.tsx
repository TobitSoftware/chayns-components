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
import {
    NavigationLayoutItem,
    NavigationLayoutItemReorderSource,
    NavigationLayoutItemReorderTarget,
    NavigationLayoutProps,
} from '../../../NavigationLayout.types';
import { isItemOrChildSelected } from './SidebarItem.utils';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'motion/react';
import { useSidebarItemPopup } from './SidebarItem.hooks';
import { StyledSidebarDropZone } from '../SidebarGroup.styles';
import { isNavigationLayoutReorderTargetEqual } from '../../../NavigationLayout.utils';

interface SidebarItemProps {
    id: NavigationLayoutItem['id'];
    index: number;
    parentIds: NavigationLayoutItem['id'][];
    isDisabled: NavigationLayoutItem['isDisabled'];
    icons: NavigationLayoutItem['icons'];
    imageUrl: NavigationLayoutItem['imageUrl'];
    label: NavigationLayoutItem['label'];
    childItems: NavigationLayoutItem['children'];
    imageElement: NavigationLayoutItem['imageElement'];
    disabledReason: NavigationLayoutItem['disabledReason'];
    onClick: NavigationLayoutProps['onItemClick'];
    color: string;
    isCompact: boolean;
    isReorderable: boolean;
    draggedItemId?: NavigationLayoutItem['id'];
    dropTarget: NavigationLayoutItemReorderTarget | null;
    onDragStart: (
        event: React.DragEvent<HTMLDivElement>,
        item: NavigationLayoutItemReorderSource,
    ) => void;
    onDragEnd: VoidFunction;
    onDropTargetChange: (target: NavigationLayoutItemReorderTarget) => void;
    onDrop: (target: NavigationLayoutItemReorderTarget) => void;
    selectedItemId: NavigationLayoutProps['selectedItemId'];
    shouldShowCollapsedLabel: NavigationLayoutProps['shouldShowCollapsedLabel'];
}

const SidebarItem: FC<SidebarItemProps> = ({
    childItems,
    id,
    index,
    icons,
    imageUrl,
    label,
    parentIds,
    selectedItemId,
    isCompact,
    isReorderable,
    draggedItemId,
    dropTarget,
    imageElement,
    onClick,
    onDragStart,
    onDragEnd,
    onDropTargetChange,
    onDrop,
    disabledReason,
    isDisabled,
    color,
    shouldShowCollapsedLabel,
}) => {
    const [shouldShowChildren, setShouldShowChildren] = useState(false);
    const {
        coordinates,
        handleMouseEnter,
        handleMouseLeave,
        isHovered,
        itemRef,
        popupContainer,
        shouldRenderPopup,
    } = useSidebarItemPopup({
        isDisabled,
        shouldShowCollapsedLabel,
    });

    const isSelected = useMemo(
        () =>
            isItemOrChildSelected(
                { id, label, imageUrl, icons, isDisabled, children: childItems },
                selectedItemId,
            ),
        [id, label, imageUrl, icons, isDisabled, childItems, selectedItemId],
    );

    useEffect(() => {
        if (isCompact) {
            setShouldShowChildren(false);
        }
    }, [isCompact]);

    const childParentIds = useMemo(() => [...parentIds, id], [id, parentIds]);

    const currentItem = useMemo<NavigationLayoutItemReorderSource>(
        () => ({
            itemId: id,
            parentIds,
            index,
        }),
        [id, index, parentIds],
    );

    const beforeTarget = useMemo<NavigationLayoutItemReorderTarget>(
        () => ({
            itemId: id,
            parentIds,
            index,
            placement: 'before',
        }),
        [id, index, parentIds],
    );

    const insideTarget = useMemo<NavigationLayoutItemReorderTarget>(
        () => ({
            itemId: id,
            parentIds: childParentIds,
            index: childItems?.length ?? 0,
            placement: 'inside',
        }),
        [childItems, childParentIds, id],
    );

    const childListEndTarget = useMemo<NavigationLayoutItemReorderTarget | null>(() => {
        const lastChild = childItems?.[childItems.length - 1];

        if (!lastChild) {
            return null;
        }

        return {
            itemId: lastChild.id,
            parentIds: childParentIds,
            index: childItems.length,
            placement: 'after',
        };
    }, [childItems, childParentIds]);

    const isDragging = draggedItemId === id;

    const isBeforeDropTargetActive = useMemo(
        () =>
            isNavigationLayoutReorderTargetEqual({
                targetA: dropTarget,
                targetB: beforeTarget,
            }),
        [beforeTarget, dropTarget],
    );

    const isInsideDropTargetActive = useMemo(
        () =>
            isNavigationLayoutReorderTargetEqual({
                targetA: dropTarget,
                targetB: insideTarget,
            }),
        [dropTarget, insideTarget],
    );

    const isChildListEndTargetActive = useMemo(
        () =>
            isNavigationLayoutReorderTargetEqual({
                targetA: dropTarget,
                targetB: childListEndTarget,
            }),
        [childListEndTarget, dropTarget],
    );

    const handleClick = useCallback(() => {
        if (isDisabled || typeof onClick !== 'function') {
            return;
        }

        onClick(id, parentIds);
    }, [id, isDisabled, onClick, parentIds]);

    const handleOpenIconClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setShouldShowChildren((previousValue) => !previousValue);
    }, []);

    const handleDragStart = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            if (!isReorderable) {
                return;
            }

            onDragStart(event, currentItem);
        },
        [currentItem, isReorderable, onDragStart],
    );

    const handleDragEnd = useCallback((): void => {
        if (!isReorderable) {
            return;
        }

        onDragEnd();
    }, [isReorderable, onDragEnd]);

    const handleBeforeDragOver = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';

            onDropTargetChange(beforeTarget);
        },
        [beforeTarget, onDropTargetChange],
    );

    const handleBeforeDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            event.preventDefault();

            onDrop(beforeTarget);
        },
        [beforeTarget, onDrop],
    );

    const handleInsideDragOver = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';

            onDropTargetChange(insideTarget);
        },
        [insideTarget, onDropTargetChange],
    );

    const handleInsideDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            event.preventDefault();
            setShouldShowChildren(true);

            onDrop(insideTarget);
        },
        [insideTarget, onDrop],
    );

    const handleChildListEndDragOver = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            if (!childListEndTarget) {
                return;
            }

            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';

            onDropTargetChange(childListEndTarget);
        },
        [childListEndTarget, onDropTargetChange],
    );

    const handleChildListEndDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            if (!childListEndTarget) {
                return;
            }

            event.preventDefault();

            onDrop(childListEndTarget);
        },
        [childListEndTarget, onDrop],
    );

    const renderChildItem = useCallback(
        (childItem: NavigationLayoutItem, childIndex: number) => (
            <SidebarItem
                key={childItem.id}
                draggedItemId={draggedItemId}
                dropTarget={dropTarget}
                id={childItem.id}
                index={childIndex}
                parentIds={childParentIds}
                selectedItemId={selectedItemId}
                isDisabled={childItem.isDisabled}
                icons={childItem.icons}
                disabledReason={childItem.disabledReason}
                imageUrl={childItem.imageUrl}
                shouldShowCollapsedLabel={false}
                imageElement={childItem.imageElement}
                label={childItem.label}
                childItems={childItem.children}
                color={color}
                isReorderable={isReorderable}
                onClick={onClick}
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
                onDrop={onDrop}
                onDropTargetChange={onDropTargetChange}
                isCompact={isCompact}
            />
        ),
        [
            childParentIds,
            color,
            draggedItemId,
            dropTarget,
            isCompact,
            isReorderable,
            onClick,
            onDragEnd,
            onDragStart,
            onDrop,
            onDropTargetChange,
            selectedItemId,
        ],
    );

    const children = useMemo(() => {
        if (!childItems || childItems.length === 0) {
            return null;
        }

        return childItems.map(renderChildItem);
    }, [childItems, renderChildItem]);

    return (
        <StyledSidebarItem>
            {isReorderable && (
                <StyledSidebarDropZone
                    $depth={parentIds.length}
                    $isActive={isBeforeDropTargetActive}
                    $isDragging={!!draggedItemId}
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
                    $isReorderable={isReorderable}
                    draggable={isReorderable}
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
            {isReorderable && (
                <StyledSidebarDropZone
                    $depth={childParentIds.length}
                    $isActive={isInsideDropTargetActive}
                    $isDragging={!!draggedItemId}
                    $isInside
                    onDragOver={handleInsideDragOver}
                    onDrop={handleInsideDrop}
                />
            )}
            {!!children && (
                <ExpandableContent isOpen={shouldShowChildren}>
                    <StyledSidebarItemChildren>
                        {children}
                        {isReorderable && childListEndTarget && (
                            <StyledSidebarDropZone
                                $depth={childParentIds.length}
                                $isActive={isChildListEndTargetActive}
                                $isDragging={!!draggedItemId}
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
