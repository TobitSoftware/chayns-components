import {
    MutableRefObject,
    Ref,
    RefCallback,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
} from 'react';

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
