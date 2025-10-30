import {
    MutableRefObject,
    Ref,
    RefCallback,
    RefObject,
    useCallback,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useMemo,
    useRef,
} from 'react';
import { BaseRef } from '../types/base';

export const useCombinedRefs = <T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> =>
    useCallback(
        (element: T) => {
            refs.forEach((ref) => {
                if (!ref) return;

                if (typeof ref === 'function') {
                    ref(element);
                } else if (typeof ref === 'object' && ref !== null) {
                    (ref as MutableRefObject<T | null>).current = element;
                }
            });
        },
        [refs],
    );

export const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const useInitialRenderRef = (initialValue: boolean) => {
    const ref = useRef<boolean>(initialValue);

    useIsomorphicLayoutEffect(() => {
        ref.current = false;
    }, []);

    return ref;
};

/**
 * Combines a native HTMLElement ref with custom methods.
 *
 * @template R - The extended ref type, e.g. InputRef extends BaseRef<HTMLInputElement>
 * @param ref - The forwarded ref from React.forwardRef
 * @param methods - A function returning your custom methods based on the element
 * @returns A RefObject pointing to the underlying native element
 */
export const useCustomRef = <R extends BaseRef<any>>(
    ref: Ref<R> | undefined,
    methods: (el: R extends BaseRef<infer T> ? T : never) => Omit<R, keyof HTMLElement>,
): RefObject<R extends BaseRef<infer T> ? T : never> => {
    const innerRef = useRef<any>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const stableMethods = useMemo(() => methods, []);

    useImperativeHandle(ref, () => {
        const el = innerRef.current as HTMLElement;
        return Object.assign(
            el,
            stableMethods(el as R extends BaseRef<infer T extends HTMLElement> ? T : never),
        ) as R;
    }, [stableMethods]);

    return innerRef as RefObject<R extends BaseRef<infer T> ? T : never>;
};
