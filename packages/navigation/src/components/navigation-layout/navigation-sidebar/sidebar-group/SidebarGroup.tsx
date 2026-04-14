import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import { StyledSidebarDropZone, StyledSidebarGroup } from './SidebarGroup.styles';
import {
    NavigationLayoutGroup,
    NavigationLayoutItem,
    NavigationLayoutItemReorderEvent,
    NavigationLayoutItemReorderSource,
    NavigationLayoutItemReorderTarget,
    NavigationLayoutProps,
} from '../../NavigationLayout.types';
import {
    isNavigationLayoutItemReorderEventValid,
    isNavigationLayoutReorderTargetEqual,
} from '../../NavigationLayout.reorder';
import SidebarItem from './sidebar-item/SidebarItem';

interface SidebarGroupProps {
    groupId: NavigationLayoutGroup['id'];
    items: NavigationLayoutItem[];
    isReorderable?: NavigationLayoutGroup['isReorderable'];
    selectedItemId?: NavigationLayoutProps['selectedItemId'];
    onClick: NavigationLayoutProps['onItemClick'];
    onItemReorder?: NavigationLayoutProps['onItemReorder'];
    color: string;
    isCompact: boolean;
    shouldShowCollapsedLabel: NavigationLayoutProps['shouldShowCollapsedLabel'];
}

const SidebarGroup: FC<SidebarGroupProps> = ({
    groupId,
    items,
    selectedItemId,
    isCompact,
    onClick,
    onItemReorder,
    isReorderable,
    color,
    shouldShowCollapsedLabel,
}) => {
    const [draggedItem, setDraggedItem] = useState<NavigationLayoutItemReorderSource | null>(null);
    const [dropTarget, setDropTarget] = useState<NavigationLayoutItemReorderTarget | null>(null);

    const shouldEnableReordering = useMemo(
        () => Boolean(isReorderable && !isCompact && typeof onItemReorder === 'function'),
        [isCompact, isReorderable, onItemReorder],
    );

    const isDragging = draggedItem !== null;

    const resetDragState = useCallback((): void => {
        setDraggedItem(null);
        setDropTarget(null);
    }, []);

    const createReorderEvent = useCallback(
        (target: NavigationLayoutItemReorderTarget): NavigationLayoutItemReorderEvent | null => {
            if (!draggedItem) {
                return null;
            }

            return {
                groupId,
                itemId: draggedItem.itemId,
                source: draggedItem,
                target,
            };
        },
        [draggedItem, groupId],
    );

    const handleItemDragStart = useCallback(
        (event: React.DragEvent<HTMLDivElement>, item: NavigationLayoutItemReorderSource): void => {
            if (!shouldEnableReordering) {
                return;
            }

            const { dataTransfer } = event;

            dataTransfer.effectAllowed = 'move';
            dataTransfer.setData('text/plain', item.itemId);

            setDraggedItem(item);
            setDropTarget(null);
        },
        [shouldEnableReordering],
    );

    const handleDropTargetChange = useCallback(
        (target: NavigationLayoutItemReorderTarget): void => {
            const nextEvent = createReorderEvent(target);

            if (
                !nextEvent ||
                !isNavigationLayoutItemReorderEventValid({ items, event: nextEvent })
            ) {
                setDropTarget(null);

                return;
            }

            setDropTarget(target);
        },
        [createReorderEvent, items],
    );

    const handleItemDrop = useCallback(
        (target: NavigationLayoutItemReorderTarget): void => {
            const nextEvent = createReorderEvent(target);

            if (
                !nextEvent ||
                typeof onItemReorder !== 'function' ||
                !isNavigationLayoutItemReorderEventValid({ items, event: nextEvent })
            ) {
                resetDragState();

                return;
            }

            onItemReorder(nextEvent);
            resetDragState();
        },
        [createReorderEvent, items, onItemReorder, resetDragState],
    );

    const groupEndTarget = useMemo<NavigationLayoutItemReorderTarget>(
        () => ({
            itemId: items[items.length - 1]?.id,
            parentIds: [],
            index: items.length,
            placement: 'after',
        }),
        [items],
    );

    const isGroupEndTargetActive = useMemo(
        () =>
            isNavigationLayoutReorderTargetEqual({
                targetA: dropTarget,
                targetB: groupEndTarget,
            }),
        [dropTarget, groupEndTarget],
    );

    const handleGroupEndDragOver = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            event.preventDefault();

            const { dataTransfer } = event;

            dataTransfer.dropEffect = 'move';

            handleDropTargetChange(groupEndTarget);
        },
        [groupEndTarget, handleDropTargetChange],
    );

    const handleGroupEndDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            event.preventDefault();
            event.stopPropagation();

            handleItemDrop(groupEndTarget);
        },
        [groupEndTarget, handleItemDrop],
    );

    const handleGroupDragOver = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            if (!dropTarget) {
                return;
            }

            event.preventDefault();

            const { dataTransfer } = event;

            dataTransfer.dropEffect = 'move';
        },
        [dropTarget],
    );

    const handleGroupDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            if (!dropTarget) {
                return;
            }

            event.preventDefault();

            handleItemDrop(dropTarget);
        },
        [dropTarget, handleItemDrop],
    );

    const renderItem = useCallback(
        (
            {
                id,
                children,
                label,
                imageUrl,
                icons,
                isDisabled,
                imageElement,
                disabledReason,
            }: NavigationLayoutItem,
            index: number,
        ) => (
            <SidebarItem
                key={id}
                color={color}
                disabledReason={disabledReason}
                draggedItemId={draggedItem?.itemId}
                dropTarget={dropTarget}
                childItems={children}
                icons={icons}
                id={id}
                imageElement={imageElement}
                imageUrl={imageUrl}
                index={index}
                isCompact={isCompact}
                isDisabled={isDisabled}
                isReorderable={shouldEnableReordering}
                label={label}
                onClick={onClick}
                onDragEnd={resetDragState}
                onDragStart={handleItemDragStart}
                onDrop={handleItemDrop}
                onDropTargetChange={handleDropTargetChange}
                parentIds={[]}
                selectedItemId={selectedItemId}
                shouldShowCollapsedLabel={shouldShowCollapsedLabel}
            />
        ),
        [
            color,
            draggedItem,
            dropTarget,
            handleDropTargetChange,
            handleItemDragStart,
            handleItemDrop,
            isCompact,
            onClick,
            resetDragState,
            selectedItemId,
            shouldEnableReordering,
            shouldShowCollapsedLabel,
        ],
    );

    return (
        <StyledSidebarGroup onDragOver={handleGroupDragOver} onDrop={handleGroupDrop}>
            {items.map(renderItem)}
            <StyledSidebarDropZone
                $isActive={isGroupEndTargetActive}
                $isDragging={isDragging}
                $placement="after"
                onDragOver={handleGroupEndDragOver}
                onDrop={handleGroupEndDrop}
            />
        </StyledSidebarGroup>
    );
};

SidebarGroup.displayName = 'SidebarGroup';

export default memo(SidebarGroup);
