import { RefObject, useEffect, useState } from 'react';

export const useElementSize = (
    ref: RefObject<HTMLElement | null>,
): { width: number; height: number } => {
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const element = ref.current;

        if (!element) {
            return undefined;
        }

        const resizeObserver = new ResizeObserver(([entry]) => {
            if (!entry) {
                return;
            }

            setSize({
                width: entry.contentRect.width,
                height: entry.contentRect.height,
            });
        });

        resizeObserver.observe(element);

        return () => {
            resizeObserver.disconnect();
        };
    }, [ref]);

    return size;
};
