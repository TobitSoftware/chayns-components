import useResizeObserver from '@react-hook/resize-observer';
import { MutableRefObject, useEffect, useLayoutEffect, useState } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

class ResizeObserverPolyFill {
    // eslint-disable-next-line class-methods-use-this
    observe = () => {};

    // eslint-disable-next-line class-methods-use-this
    unobserve = () => {};
}

const options = typeof window === 'undefined' ? { polyfill: ResizeObserverPolyFill } : undefined;

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

    useIsomorphicLayoutEffect(() => {
        if (element) {
            setSize(element.getBoundingClientRect());
        } else {
            setSize(undefined);
        }
    }, [element]);

    // TODO: Replace with ssr-compatible implementation
    useResizeObserver(element, (entry) => setSize(entry.contentRect), options);

    return size;
};
