import React, {
    Children,
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
    shouldUseParentElement?: boolean;
}

export const useElementSize = (
    ref: MutableRefObject<HTMLDivElement | HTMLLabelElement | null>,
    { shouldUseChildElement = false, shouldUseParentElement = false }: UseElementSizeOptions = {},
): DOMRectReadOnly | undefined => {
    const [size, setSize] = useState<DOMRectReadOnly>();

    useEffect(() => {
        let target = ref.current as HTMLElement | null;

        if (shouldUseParentElement) {
            target = ref.current?.parentElement as HTMLElement | null;
        }

        if (shouldUseChildElement) {
            target = ref.current?.firstElementChild as HTMLElement | null;
        }

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
    }, [ref, shouldUseChildElement, shouldUseParentElement]);

    return size;
};

const cloneWithTabIndex = (node: ReactNode): ReactNode => {
    if (!isValidElement(node)) return node;

    const element = node as ReactElement;

    const tmpChildren = (element.props as { children: ReactNode[] }).children;

    const children = tmpChildren ? Children.map(tmpChildren, cloneWithTabIndex) : tmpChildren;

    if ((element.type as unknown as { displayName: string }).displayName === 'Button') {
        return (
            // eslint-disable-next-line react/button-has-type
            <button tabIndex={-1}>{children}</button>
        );
    }

    return cloneElement(element, {
        ...element.props,
        tabIndex: -1,
        children,
    });
};

const getClonedElement = (content: ReactNode) => {
    const preventEvents: Partial<HTMLAttributes<never>> = {
        onClick: (e) => e.stopPropagation(),
        onMouseDown: (e) => e.stopPropagation(),
        onMouseUp: (e) => e.stopPropagation(),
        onKeyDown: (e) => e.stopPropagation(),
        onKeyUp: (e) => e.stopPropagation(),
        onFocus: (e) => e.stopPropagation(),
        onBlur: (e) => e.stopPropagation(),
    };

    if (typeof content === 'string') {
        return (
            <span tabIndex={-1} data-measured-clone>
                {content}
            </span>
        );
    }

    if (isValidElement(content)) {
        return cloneWithTabIndex(
            cloneElement(content, {
                ...preventEvents,
                'data-measured-clone': true,
            }),
        );
    }

    return content;
};

interface UseMeasuredCloneOptions {
    content: ReactNode;
    shouldPreventTextWrapping?: boolean;
}

export const useMeasuredClone = ({
    content,
    shouldPreventTextWrapping = true,
}: UseMeasuredCloneOptions) => {
    const ref = useRef<HTMLDivElement>(null);

    const [size, setSize] = useState({ width: 0, height: 0 });

    const clonedElement = getClonedElement(content);

    useEffect(() => {
        const measure = () => {
            if (!ref.current) return;

            const { offsetWidth: width, offsetHeight: height } = ref.current;

            setSize({ width: width + (shouldPreventTextWrapping ? 10 : 0), height });
        };

        measure();

        const observer = new ResizeObserver(measure);

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, [shouldPreventTextWrapping]);

    const measuredElement = (
        <div
            data-measured-clone="true"
            ref={ref}
            style={{
                position: 'fixed',
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: -1,
                height: 'auto',
                width: 'auto',
                visibility: 'hidden',
            }}
            inert="true"
            tabIndex={-1}
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
