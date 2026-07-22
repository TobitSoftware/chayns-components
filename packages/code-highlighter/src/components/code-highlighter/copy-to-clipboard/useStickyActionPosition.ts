import { RefObject, useEffect, useState } from 'react';

const STICKY_ACTION_INSET = 8;
const STICKY_ACTION_SIZE = 32;

type StickyActionPosition = {
    fixedRight: number;
    fixedTop: number;
    isFixed: boolean;
    isSticky: boolean;
};

const initialPosition: StickyActionPosition = {
    fixedRight: 0,
    fixedTop: STICKY_ACTION_INSET,
    isFixed: false,
    isSticky: false,
};

const isScrollable = (element: HTMLElement) => {
    const { overflow, overflowY } = window.getComputedStyle(element);

    return /auto|scroll|overlay/.test(`${overflow} ${overflowY}`);
};

const getScrollableAncestor = (element: HTMLElement) => {
    let parent = element.parentElement;

    while (parent) {
        if (isScrollable(parent)) {
            return parent;
        }

        parent = parent.parentElement;
    }

    return undefined;
};

export const useStickyActionPosition = (
    rootRef: RefObject<HTMLElement>,
    actionRef: RefObject<HTMLElement>,
): StickyActionPosition => {
    const [position, setPosition] = useState<StickyActionPosition>(initialPosition);

    useEffect(() => {
        const root = rootRef.current;
        const action = actionRef.current;

        if (!root || !action) {
            return undefined;
        }

        const scrollContainer = getScrollableAncestor(root);

        const updatePosition = () => {
            const rootRect = root.getBoundingClientRect();
            const containerTop = scrollContainer?.getBoundingClientRect().top ?? 0;
            const fixedTop = containerTop + STICKY_ACTION_INSET;
            const isSticky = rootRect.top <= fixedTop;
            const isFixed = Boolean(
                scrollContainer && isSticky && rootRect.bottom > fixedTop + STICKY_ACTION_SIZE,
            );
            const fixedRight = Math.max(0, window.innerWidth - rootRect.right);

            setPosition((currentPosition) => {
                if (
                    currentPosition.fixedRight === fixedRight &&
                    currentPosition.fixedTop === fixedTop &&
                    currentPosition.isFixed === isFixed &&
                    currentPosition.isSticky === isSticky
                ) {
                    return currentPosition;
                }

                return { fixedRight, fixedTop, isFixed, isSticky };
            });
        };

        updatePosition();
        scrollContainer?.addEventListener('scroll', updatePosition, { passive: true });
        window.addEventListener('scroll', updatePosition, { passive: true });
        window.addEventListener('resize', updatePosition);

        const resizeObserver =
            typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(updatePosition);
        resizeObserver?.observe(root);

        if (scrollContainer) {
            resizeObserver?.observe(scrollContainer);
        }

        return () => {
            scrollContainer?.removeEventListener('scroll', updatePosition);
            window.removeEventListener('scroll', updatePosition);
            window.removeEventListener('resize', updatePosition);
            resizeObserver?.disconnect();
        };
    }, [actionRef, rootRef]);

    return position;
};
