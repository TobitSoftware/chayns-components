import { RefObject, useEffect, useState } from 'react';

const isScrollable = (element: HTMLElement) => {
    const { overflow, overflowY } = window.getComputedStyle(element);

    return /auto|scroll|overlay/.test(`${overflow} ${overflowY}`);
};

const getScrollableAncestor = (element: HTMLElement) => {
    let parent = element.parentElement;

    while (parent) {
        if (parent === document.body || parent === document.documentElement) {
            return undefined;
        }

        if (isScrollable(parent)) {
            return parent;
        }

        parent = parent.parentElement;
    }

    return undefined;
};

export const useStickyActionState = (
    rootRef: RefObject<HTMLElement>,
    actionRef: RefObject<HTMLElement>,
) => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const root = rootRef.current;
        if (!root || !actionRef.current) {
            return undefined;
        }

        const scrollContainer = getScrollableAncestor(root);

        const updateStickyState = () => {
            const containerTop = scrollContainer?.getBoundingClientRect().top ?? 0;
            const stickyBoundary = containerTop + 1;

            setIsSticky(root.getBoundingClientRect().top <= stickyBoundary);
        };

        updateStickyState();
        scrollContainer?.addEventListener('scroll', updateStickyState, { passive: true });
        document.addEventListener('scroll', updateStickyState, true);
        window.addEventListener('scroll', updateStickyState, { passive: true });
        window.addEventListener('resize', updateStickyState);

        const resizeObserver =
            typeof ResizeObserver === 'undefined'
                ? undefined
                : new ResizeObserver(updateStickyState);
        resizeObserver?.observe(root);

        if (scrollContainer) {
            resizeObserver?.observe(scrollContainer);
        }

        return () => {
            scrollContainer?.removeEventListener('scroll', updateStickyState);
            document.removeEventListener('scroll', updateStickyState, true);
            window.removeEventListener('scroll', updateStickyState);
            window.removeEventListener('resize', updateStickyState);
            resizeObserver?.disconnect();
        };
    }, [actionRef, rootRef]);

    return isSticky;
};
