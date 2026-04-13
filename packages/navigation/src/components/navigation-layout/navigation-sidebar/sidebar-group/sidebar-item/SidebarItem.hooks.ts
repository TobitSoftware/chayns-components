import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import {
    areCoordinatesEqual,
    Coordinates,
    getScrollableAncestorElements,
    getSidebarItemPopupCoordinates,
} from './SidebarItem.utils';

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
