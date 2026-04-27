import { RefObject, useEffect, useState } from 'react';

export const useElementWidth = <T extends HTMLElement>(ref: RefObject<T | null>): number => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const element = ref.current;

        if (!element) {
            return undefined;
        }

        const observer = new ResizeObserver(([entry]) => {
            if (!entry) {
                return;
            }

            setWidth(entry.contentRect.width);
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [ref]);

    return width;
};
