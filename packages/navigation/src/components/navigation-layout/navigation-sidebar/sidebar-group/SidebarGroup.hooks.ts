import React, { useCallback, useMemo, useState } from 'react';
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
} from '../../NavigationLayout.utils';

interface UseSidebarGroupReorderOptions {
    groupId: NavigationLayoutGroup['id'];
    isCompact: boolean;
    isReorderable?: NavigationLayoutGroup['isReorderable'];
    items: NavigationLayoutItem[];
    onItemReorder?: NavigationLayoutProps['onItemReorder'];
}

interface UseSidebarGroupReorderResult {
    draggedItemId?: NavigationLayoutItem['id'];
    dropTarget: NavigationLayoutItemReorderTarget | null;
    isDragging: boolean;
    isGroupEndTargetActive: boolean;
    isReorderEnabled: boolean;
    handleDragEnd: VoidFunction;
    handleDragStart: (
        event: React.DragEvent<HTMLDivElement>,
        item: NavigationLayoutItemReorderSource,
    ) => void;
    handleDrop: (target: NavigationLayoutItemReorderTarget) => void;
    handleDropTargetChange: (target: NavigationLayoutItemReorderTarget) => void;
    handleGroupDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    handleGroupDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    handleGroupEndDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    handleGroupEndDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

const setDragMoveEffect = (event: React.DragEvent<HTMLDivElement>): void => {
    const { dataTransfer } = event;

    dataTransfer.dropEffect = 'move';
};

export const useSidebarGroupReorder = ({
    groupId,
    isCompact,
    isReorderable,
    items,
    onItemReorder,
}: UseSidebarGroupReorderOptions): UseSidebarGroupReorderResult => {
    const [draggedItem, setDraggedItem] = useState<NavigationLayoutItemReorderSource | null>(null);
    const [dropTarget, setDropTarget] = useState<NavigationLayoutItemReorderTarget | null>(null);

    const isReorderEnabled = useMemo(
        () => Boolean(isReorderable && !isCompact && typeof onItemReorder === 'function'),
        [isCompact, isReorderable, onItemReorder],
    );

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

    const handleDragStart = useCallback(
        (event: React.DragEvent<HTMLDivElement>, item: NavigationLayoutItemReorderSource): void => {
            if (!isReorderEnabled) {
                return;
            }

            const { dataTransfer } = event;

            dataTransfer.effectAllowed = 'move';
            dataTransfer.setData('text/plain', item.itemId);

            setDraggedItem(item);
            setDropTarget(null);
        },
        [isReorderEnabled],
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

    const handleDrop = useCallback(
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
            setDragMoveEffect(event);
            handleDropTargetChange(groupEndTarget);
        },
        [groupEndTarget, handleDropTargetChange],
    );

    const handleGroupEndDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            event.preventDefault();
            event.stopPropagation();
            handleDrop(groupEndTarget);
        },
        [groupEndTarget, handleDrop],
    );

    const handleGroupDragOver = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            if (!dropTarget) {
                return;
            }

            event.preventDefault();
            setDragMoveEffect(event);
        },
        [dropTarget],
    );

    const handleGroupDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            if (!dropTarget) {
                return;
            }

            event.preventDefault();
            handleDrop(dropTarget);
        },
        [dropTarget, handleDrop],
    );

    return {
        draggedItemId: draggedItem?.itemId,
        dropTarget,
        isDragging: draggedItem !== null,
        isGroupEndTargetActive,
        isReorderEnabled,
        handleDragEnd: resetDragState,
        handleDragStart,
        handleDrop,
        handleDropTargetChange,
        handleGroupDragOver,
        handleGroupDrop,
        handleGroupEndDragOver,
        handleGroupEndDrop,
    };
};
