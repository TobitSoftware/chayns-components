import { RefObject, useEffect } from 'react';
import { AppFlavor, useDevice, useUser } from 'chayns-api';

/**
 * Forces a repaint on the referenced element whenever the window resizes.
 * Useful for Safari/iOS WebView cursor misalignment issues.
 */
export function useCursorRepaint<T extends HTMLElement>(ref: RefObject<T>) {
    const { app, os } = useDevice();
    const { personId } = useUser();

    useEffect(() => {
        console.debug('useCursorRepaint', {
            app,
            os,
            personId,
        });

        // only do if ist the ios chayns app
        if (
            app?.flavor !== AppFlavor.Chayns ||
            os !== 'iOS' ||
            !['MICH-HAEL1', '516-61460'].includes(personId)
        ) {
            return () => {};
        }

        const handleResize = () => {
            console.debug('useCursorRepaint - handleResize');

            const el = ref.current;

            console.debug('useCursorRepaint - handleResize', el);

            if (!el) return;

            // temporarily apply a non-visible transform to force layer repaint
            el.style.transform = 'translateY(0.1px)';

            console.debug('useCursorRepaint - handleResize', el.style);

            requestAnimationFrame(() => {
                el.style.transform = '';

                console.debug('useCursorRepaint - handleResize, requestAnimationFrame', el.style);
            });

            window.setTimeout(() => {
                el.style.transform = '';

                console.debug('useCursorRepaint - handleResize, Timeout', el.style);
            }, 200);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [app, os, personId, ref]);
}
