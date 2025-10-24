import { RefObject, useEffect } from 'react';
import { AppFlavor, useDevice } from 'chayns-api';

/**
 * Forces multiple repaints on the referenced element whenever it gains focus.
 * Useful for Safari/iOS WebView cursor misalignment issues.
 */
export function useCursorRepaint<T extends HTMLElement>(ref: RefObject<T>) {
    const { app, os } = useDevice();

    useEffect(() => {
        // only run on iOS in chayns app
        if (app?.flavor !== AppFlavor.Chayns || os !== 'iOS') {
            return () => {};
        }

        const triggerRepaint = (el: HTMLElement, delay: number) => {
            window.setTimeout(() => {
                // eslint-disable-next-line no-param-reassign
                el.style.transform = 'translateZ(0px)';

                requestAnimationFrame(() => {
                    // eslint-disable-next-line no-param-reassign
                    el.style.transform = '';
                });
            }, delay);
        };

        const handleFocus = () => {
            const el = ref.current;
            if (!el) return;

            [50, 100, 150, 200, 250, 300, 350, 400, 450, 500].forEach((delay) =>
                triggerRepaint(el, delay),
            );
        };

        const el = ref.current;
        if (el) el.addEventListener('focus', handleFocus);

        return () => {
            if (el) el.removeEventListener('focus', handleFocus);
        };
    }, [app, os, ref]);
}
