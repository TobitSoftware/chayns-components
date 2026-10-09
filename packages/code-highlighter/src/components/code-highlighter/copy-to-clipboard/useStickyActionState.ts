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

        let frameId: number | undefined;
        const updateStickyState = () => {
            frameId = undefined;
            const containerTop = scrollContainer?.getBoundingClientRect().top ?? 0;
            const stickyBoundary = containerTop + 1;

            setIsSticky(root.getBoundingClientRect().top <= stickyBoundary);
        };

        const scheduleStickyUpdate = () => {
            if (frameId === undefined) frameId = window.requestAnimationFrame(updateStickyState);
        };

        updateStickyState();
        scrollContainer?.addEventListener('scroll', scheduleStickyUpdate, { passive: true });
        document.addEventListener('scroll', scheduleStickyUpdate, true);
        window.addEventListener('scroll', scheduleStickyUpdate, { passive: true });
        window.addEventListener('resize', scheduleStickyUpdate);

        const resizeObserver =
            typeof ResizeObserver === 'undefined'
                ? undefined
                : new ResizeObserver(scheduleStickyUpdate);
        resizeObserver?.observe(root);

        if (scrollContainer) {
            resizeObserver?.observe(scrollContainer);
        }

        return () => {
            scrollContainer?.removeEventListener('scroll', scheduleStickyUpdate);
            document.removeEventListener('scroll', scheduleStickyUpdate, true);
            window.removeEventListener('scroll', scheduleStickyUpdate);
            window.removeEventListener('resize', scheduleStickyUpdate);
            resizeObserver?.disconnect();
            if (frameId !== undefined) window.cancelAnimationFrame(frameId);
        };
    }, [actionRef, rootRef]);

    return isSticky;
};
