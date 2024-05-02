import useResizeObserver from '@react-hook/resize-observer';
import { MutableRefObject, useLayoutEffect, useState } from 'react';

export const useElementSize = (
    ref: MutableRefObject<HTMLDivElement | HTMLLabelElement | null>,
): DOMRectReadOnly | undefined => {
    const [size, setSize] = useState<DOMRectReadOnly>();

    useLayoutEffect(() => setSize(ref.current?.getBoundingClientRect()), [ref]);

    useResizeObserver(ref, (entry) => setSize((entry as ResizeObserverEntry).contentRect));

    return size;
};
