import useResizeObserver from '@react-hook/resize-observer';
import { MutableRefObject, useLayoutEffect, useState } from 'react';

interface UseElementSizeOptions {
    shouldUseChildElement?: boolean;
}

export const useElementSize = (
    ref: MutableRefObject<HTMLDivElement | HTMLLabelElement | null>,
    { shouldUseChildElement = false }: UseElementSizeOptions = {},
): DOMRectReadOnly | undefined => {
    const [size, setSize] = useState<DOMRectReadOnly>();

    const element = ((shouldUseChildElement ? ref.current?.firstElementChild : ref.current) ??
        null) as HTMLDivElement | HTMLLabelElement | null;

    useLayoutEffect(() => {
        if (element) {
            setSize(element.getBoundingClientRect());
        } else {
            setSize(undefined);
        }
    }, [element]);

    useResizeObserver(element, (entry) => setSize((entry as ResizeObserverEntry).contentRect));

    return size;
};
