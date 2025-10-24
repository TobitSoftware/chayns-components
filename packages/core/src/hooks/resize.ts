import { RefObject, useEffect } from 'react';
import { AppFlavor, useDevice, useUser } from 'chayns-api';

/**
 * Forces multiple repaints on the referenced element whenever it gains focus.
 * Useful for Safari/iOS WebView cursor misalignment issues.
 */
export function useCursorRepaint<T extends HTMLElement>(ref: RefObject<T>) {
    const { app, os } = useDevice();
    const { personId } = useUser();

    useEffect(() => {
        console.debug('useCursorRepaint init', { app, os, personId });

        // only run on iOS in chayns app for specific users
        if (
            app?.flavor !== AppFlavor.Chayns ||
            os !== 'iOS' ||
            !['MICH-HAEL1', '516-61460'].includes(personId ?? '')
        ) {
            return () => {};
        }

        const triggerRepaint = (el: HTMLElement, delay: number) => {
            window.setTimeout(() => {
                // eslint-disable-next-line no-param-reassign
                el.style.transform = 'translateY(0.1px)';
                console.debug(`useCursorRepaint - trigger @${delay}ms`, el.style);

                requestAnimationFrame(() => {
                    // eslint-disable-next-line no-param-reassign
                    el.style.transform = '';
                    console.debug(`useCursorRepaint - clear @${delay}ms`, el.style);
                });
            }, delay);
        };

        const handleFocus = () => {
            const el = ref.current;
            if (!el) return;

            console.debug('useCursorRepaint - focus triggered', el);

            [200, 300, 400, 500].forEach((delay) => triggerRepaint(el, delay));
        };

        const el = ref.current;
        if (el) el.addEventListener('focus', handleFocus);

        console.debug('useCursorRepaint focus listener attached');

        return () => {
            if (el) el.removeEventListener('focus', handleFocus);
            console.debug('useCursorRepaint focus listener removed');
        };
    }, [app, os, personId, ref]);
}
