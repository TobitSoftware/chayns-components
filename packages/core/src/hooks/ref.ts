import { MutableRefObject, Ref, RefCallback, useCallback } from 'react';

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
