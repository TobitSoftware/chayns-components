import { useEffect, useState } from 'react';
import type { MediaContentSize } from './MediaContent.utils';

const MEDIA_CONTENT_SIZE_RESIZE_DEBOUNCE_MS = 100;

const getSizeFromElement = (element: HTMLElement | null): MediaContentSize | undefined => {
    if (!element) {
        return undefined;
    }

    const { width, height } = element.getBoundingClientRect();

    if (width <= 0 || height <= 0) {
        return undefined;
    }

    return {
        width,
        height,
    };
};

const useMediaContentSize = (element: HTMLElement | null) => {
    const [size, setSize] = useState<MediaContentSize>();

    useEffect(() => {
        if (!element) {
            setSize(undefined);
            return undefined;
        }

        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        const updateSize = () => {
            const nextSize = getSizeFromElement(element);

            if (!nextSize) {
                setSize(undefined);
                return;
            }

            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                setSize(nextSize);
            }, MEDIA_CONTENT_SIZE_RESIZE_DEBOUNCE_MS);
        };

        updateSize();

        if (typeof ResizeObserver === 'undefined') {
            return () => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            };
        }

        const resizeObserver = new ResizeObserver(() => {
            updateSize();
        });

        resizeObserver.observe(element);

        return () => {
            resizeObserver.disconnect();

            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [element]);

    return size;
};

export default useMediaContentSize;
