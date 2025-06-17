import useResizeObserver from '@react-hook/resize-observer';
import React, {
    cloneElement,
    HTMLAttributes,
    MutableRefObject,
    ReactElement,
    ReactNode,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

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
interface UseMeasuredCloneOptions {
    content: ReactNode;
}

export const useMeasuredClone = ({ content }: UseMeasuredCloneOptions) => {
    const ref = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    const preventEvents: Partial<HTMLAttributes<any>> = {
        onClick: (e) => e.stopPropagation(),
        onMouseDown: (e) => e.stopPropagation(),
        onMouseUp: (e) => e.stopPropagation(),
        onKeyDown: (e) => e.stopPropagation(),
        onKeyUp: (e) => e.stopPropagation(),
        onFocus: (e) => e.stopPropagation(),
        onBlur: (e) => e.stopPropagation(),
    };

    const clonedElement = cloneElement(content as unknown as ReactElement, {
        ...preventEvents,
        'data-measured-clone': true,
    });

    useEffect(() => {
        const measure = () => {
            if (!ref.current) return;
            const { offsetWidth: width, offsetHeight: height } = ref.current;
            setSize({ width, height });
        };

        measure();

        const observer = new ResizeObserver(measure);

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    const measuredElement = (
        <div
            data-measured-clone="true"
            ref={ref}
            style={{
                position: 'absolute',
                opacity: 0,
                pointerEvents: 'none',
                zIndex: -1,
                height: 'auto',
                width: 'auto',
                visibility: 'hidden',
            }}
        >
            {clonedElement}
        </div>
    );

    return {
        measuredElement,
        width: size.width,
        height: size.height,
    };
};

export const useIsMeasuredClone = <T extends HTMLElement>() => {
    const ref = useRef<T | null>(null);

    const [isClone, setIsClone] = useState(false);

    useEffect(() => {
        if (!ref.current) return;

        let el: HTMLElement | null = ref.current;

        while (el) {
            if (el.hasAttribute('data-measured-clone')) {
                setIsClone(true);

                return;
            }

            el = el.parentElement;
        }

        setIsClone(false);
    }, []);

    return [isClone, ref] as const;
};
