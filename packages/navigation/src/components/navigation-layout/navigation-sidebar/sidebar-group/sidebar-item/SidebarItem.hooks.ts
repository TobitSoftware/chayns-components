import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    areCoordinatesEqual,
    Coordinates,
    getScrollableAncestorElements,
    getSidebarItemPopupCoordinates,
} from './SidebarItem.utils';
import {
    NavigationLayoutItem,
    NavigationLayoutItemReorderSource,
    NavigationLayoutItemReorderTarget,
} from '../../../NavigationLayout.types';
import { isNavigationLayoutReorderTargetEqual } from '../../../NavigationLayout.utils';

export interface UseSidebarItemPopupOptions {
    isDisabled: boolean;
    shouldShowCollapsedLabel?: boolean;
}

export interface UseSidebarItemPopupResult {
    coordinates: Coordinates | null;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    isHovered: boolean;
    itemRef: RefObject<HTMLDivElement>;
    popupContainer: HTMLElement | null;
    shouldRenderPopup: boolean;
}

export interface UseSidebarItemReorderOptions {
    childItems: NavigationLayoutItem['children'];
    draggedItemId?: NavigationLayoutItem['id'];
    dropTarget: NavigationLayoutItemReorderTarget | null;
    id: NavigationLayoutItem['id'];
    index: number;
    isDisabled?: NavigationLayoutItem['isDisabled'];
    isReorderEnabled: boolean;
    onDragEnd: VoidFunction;
    onDragStart: (
        event: React.DragEvent<HTMLDivElement>,
        item: NavigationLayoutItemReorderSource,
    ) => void;
    onDrop: (target: NavigationLayoutItemReorderTarget) => void;
    onDropInside?: VoidFunction;
    onDropTargetChange: (target: NavigationLayoutItemReorderTarget) => void;
    parentIds: NavigationLayoutItem['id'][];
}

export interface UseSidebarItemReorderResult {
    canDragItem: boolean;
    canDropInsideItem: boolean;
    childParentIds: NavigationLayoutItem['id'][];
    childListEndTarget: NavigationLayoutItemReorderTarget | null;
    handleBeforeDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    handleBeforeDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    handleChildListEndDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    handleChildListEndDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDragEnd: VoidFunction;
    handleDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
    handleInsideDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    handleInsideDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    isBeforeDropTargetActive: boolean;
    isChildListEndTargetActive: boolean;
    isDragging: boolean;
    isInsideDropTargetActive: boolean;
}

const setDragMoveEffect = (event: React.DragEvent<HTMLDivElement>): void => {
    const { dataTransfer } = event;

    dataTransfer.dropEffect = 'move';
};

const resolveSidebarContainer = (item: HTMLDivElement | null): HTMLElement | null => {
    if (!item) {
        return null;
    }

    return (
        item.closest<HTMLElement>('[data-navigation-sidebar-root="true"]') ??
        document.getElementById('sidebar')
    );
};

export const useSidebarItemPopup = ({
    isDisabled,
    shouldShowCollapsedLabel,
}: UseSidebarItemPopupOptions): UseSidebarItemPopupResult => {
    const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [popupContainer, setPopupContainer] = useState<HTMLElement | null>(null);

    const animationFrameIdRef = useRef<number | null>(null);
    const lastCoordinatesRef = useRef<Coordinates | null>(null);
    const itemRef = useRef<HTMLDivElement>(null);

    const resetCoordinates = useCallback(() => {
        lastCoordinatesRef.current = null;
        setCoordinates(null);
    }, []);

    const resolvePopupContainer = useCallback(() => {
        const nextContainer = resolveSidebarContainer(itemRef.current);

        setPopupContainer((previousContainer) =>
            previousContainer === nextContainer ? previousContainer : nextContainer,
        );

        return nextContainer;
    }, []);

    const updateCoordinates = useCallback(() => {
        const nextContainer = popupContainer ?? resolvePopupContainer();
        const itemElement = itemRef.current;

        if (!nextContainer || !itemElement) {
            resetCoordinates();

            return;
        }

        const nextCoordinates = getSidebarItemPopupCoordinates({
            container: nextContainer,
            item: itemElement,
        });

        if (
            areCoordinatesEqual({
                coordinatesA: lastCoordinatesRef.current,
                coordinatesB: nextCoordinates,
            })
        ) {
            return;
        }

        lastCoordinatesRef.current = nextCoordinates;
        setCoordinates(nextCoordinates);
    }, [popupContainer, resetCoordinates, resolvePopupContainer]);

    const scheduleCoordinatesUpdate = useCallback(() => {
        if (animationFrameIdRef.current !== null) {
            return;
        }

        animationFrameIdRef.current = requestAnimationFrame(() => {
            animationFrameIdRef.current = null;
            updateCoordinates();
        });
    }, [updateCoordinates]);

    const handleMouseEnter = useCallback(() => {
        resolvePopupContainer();
        setIsHovered(true);
        scheduleCoordinatesUpdate();
    }, [resolvePopupContainer, scheduleCoordinatesUpdate]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        resetCoordinates();
    }, [resetCoordinates]);

    useEffect(() => {
        resolvePopupContainer();
    }, [resolvePopupContainer]);

    useEffect(() => {
        if (!isHovered || isDisabled || !shouldShowCollapsedLabel) {
            resetCoordinates();

            return undefined;
        }

        const nextContainer = popupContainer ?? resolvePopupContainer();
        const itemElement = itemRef.current;

        if (!nextContainer || !itemElement) {
            return undefined;
        }

        scheduleCoordinatesUpdate();

        const resizeObserver =
            typeof ResizeObserver === 'undefined'
                ? null
                : new ResizeObserver(() => {
                      scheduleCoordinatesUpdate();
                  });

        resizeObserver?.observe(nextContainer);
        resizeObserver?.observe(itemElement);

        const scrollableElements = getScrollableAncestorElements({
            element: itemElement,
            boundaryElement: nextContainer,
        });

        scrollableElements.forEach((element) => {
            element.addEventListener('scroll', scheduleCoordinatesUpdate, { passive: true });
        });

        window.addEventListener('resize', scheduleCoordinatesUpdate);

        return () => {
            scrollableElements.forEach((element) => {
                element.removeEventListener('scroll', scheduleCoordinatesUpdate);
            });

            window.removeEventListener('resize', scheduleCoordinatesUpdate);
            resizeObserver?.disconnect();

            if (animationFrameIdRef.current !== null) {
                cancelAnimationFrame(animationFrameIdRef.current);
                animationFrameIdRef.current = null;
            }
        };
    }, [
        isDisabled,
        isHovered,
        popupContainer,
        resetCoordinates,
        resolvePopupContainer,
        scheduleCoordinatesUpdate,
        shouldShowCollapsedLabel,
    ]);

    return {
        coordinates,
        handleMouseEnter,
        handleMouseLeave,
        isHovered,
        itemRef,
        popupContainer,
        shouldRenderPopup: !isDisabled && !!shouldShowCollapsedLabel && isHovered && !!coordinates,
    };
};

export const useSidebarItemReorder = ({
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
    onDropInside,
    onDropTargetChange,
    parentIds,
}: UseSidebarItemReorderOptions): UseSidebarItemReorderResult => {
    const childParentIds = useMemo(() => [...parentIds, id], [id, parentIds]);
    const canDragItem = isReorderEnabled && !isDisabled;
    const canDropInsideItem = isReorderEnabled && !isDisabled;

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

    const handleDragStart = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            if (!canDragItem) {
                return;
            }

            onDragStart(event, currentItem);
        },
        [canDragItem, currentItem, onDragStart],
    );

    const handleResolvedDragEnd = useCallback((): void => {
        if (!canDragItem) {
            return;
        }

        onDragEnd();
    }, [canDragItem, onDragEnd]);

    const handleBeforeDragOver = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            event.preventDefault();
            setDragMoveEffect(event);
            onDropTargetChange(beforeTarget);
        },
        [beforeTarget, onDropTargetChange],
    );

    const handleBeforeDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            event.preventDefault();
            event.stopPropagation();
            onDrop(beforeTarget);
        },
        [beforeTarget, onDrop],
    );

    const handleInsideDragOver = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            if (!canDropInsideItem) {
                return;
            }

            event.preventDefault();
            setDragMoveEffect(event);
            onDropTargetChange(insideTarget);
        },
        [canDropInsideItem, insideTarget, onDropTargetChange],
    );

    const handleInsideDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            if (!canDropInsideItem) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            onDropInside?.();
            onDrop(insideTarget);
        },
        [canDropInsideItem, insideTarget, onDrop, onDropInside],
    );

    const handleChildListEndDragOver = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            if (!childListEndTarget) {
                return;
            }

            event.preventDefault();
            setDragMoveEffect(event);
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
            event.stopPropagation();
            onDrop(childListEndTarget);
        },
        [childListEndTarget, onDrop],
    );

    return {
        canDragItem,
        canDropInsideItem,
        childParentIds,
        childListEndTarget,
        handleBeforeDragOver,
        handleBeforeDrop,
        handleChildListEndDragOver,
        handleChildListEndDrop,
        handleDragEnd: handleResolvedDragEnd,
        handleDragStart,
        handleInsideDragOver,
        handleInsideDrop,
        isBeforeDropTargetActive,
        isChildListEndTargetActive,
        isDragging: draggedItemId === id,
        isInsideDropTargetActive,
    };
};
