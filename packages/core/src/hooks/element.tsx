import React, {
    cloneElement,
    HTMLAttributes,
    isValidElement,
    MutableRefObject,
    ReactElement,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';

interface UseElementSizeOptions {
    shouldUseChildElement?: boolean;
}

export const useElementSize = (
    ref: MutableRefObject<HTMLDivElement | HTMLLabelElement | null>,
    { shouldUseChildElement = false }: UseElementSizeOptions = {},
): DOMRectReadOnly | undefined => {
    const [size, setSize] = useState<DOMRectReadOnly>();

    useEffect(() => {
        const target = (
            shouldUseChildElement ? ref.current?.firstElementChild : ref.current
        ) as HTMLElement | null;

        if (!target) return () => {};

        const updateSize = () => setSize(target.getBoundingClientRect());

        updateSize();

        const observer = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.target === target) {
                    setSize(entry.contentRect);
                }
            });
        });

        observer.observe(target);

        return () => observer.disconnect();
    }, [ref, shouldUseChildElement]);

    return size;
};

const getClonedElement = (content: ReactNode) => {
    const preventEvents: Partial<HTMLAttributes<any>> = {
        onClick: (e) => e.stopPropagation(),
        onMouseDown: (e) => e.stopPropagation(),
        onMouseUp: (e) => e.stopPropagation(),
        onKeyDown: (e) => e.stopPropagation(),
        onKeyUp: (e) => e.stopPropagation(),
        onFocus: (e) => e.stopPropagation(),
        onBlur: (e) => e.stopPropagation(),
    };

    const props = {
        ...preventEvents,
        'data-measured-clone': true,
    };

    if (isValidElement(content)) {
        return cloneElement(content as unknown as ReactElement, props);
    }

    if (typeof content === 'string') {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <span {...props}>{content}</span>;
    }

    return content;
};

interface UseMeasuredCloneOptions {
    content: ReactNode;
}

export const useMeasuredClone = ({ content }: UseMeasuredCloneOptions) => {
    const ref = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    const clonedElement = getClonedElement(content);

    useEffect(() => {
        const measure = () => {
            if (!ref.current) return;
            const { offsetWidth: width, offsetHeight: height } = ref.current;
            setSize({ width: width + 10, height });
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
                position: 'fixed',
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
