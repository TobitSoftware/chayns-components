import { RefObject, useEffect } from 'react';

export const useCalendarFocusRingPortal = (
    targetRef: RefObject<HTMLElement>,
    isEnabled: boolean,
    overlayRef?: RefObject<HTMLElement>,
    updateKey?: unknown,
) => {
    useEffect(() => {
        if (!isEnabled || typeof window === 'undefined') {
            return undefined;
        }

        const targetElement = targetRef.current;

        if (!targetElement) {
            return undefined;
        }

        const overlayElement = document.createElement('div');
        const overlayContainer =
            targetElement.closest<HTMLElement>('.page-provider') ??
            document.querySelector<HTMLElement>('.page-provider') ??
            document.body;

        overlayElement.style.position = 'fixed';
        overlayElement.style.pointerEvents = 'none';
        overlayElement.style.zIndex = '2147483647';
        overlayElement.style.outline = '2px solid color-mix(in srgb, white 70%, transparent)';
        overlayElement.style.outlineOffset = '1px';
        overlayElement.style.boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.3)';
        overlayElement.style.borderRadius = '50%';
        overlayElement.style.display = 'none';
        overlayContainer.appendChild(overlayElement);

        const updateOverlay = () => {
            if (
                document.activeElement !== targetElement ||
                !targetElement.matches(':focus-visible')
            ) {
                overlayElement.style.display = 'none';
                return false;
            }

            const rect = (overlayRef?.current ?? targetElement).getBoundingClientRect();
            const padding = 4;
            const size = Math.max(rect.width, rect.height) + padding * 2;

            overlayElement.style.left = `${rect.left + rect.width / 2 - size / 2}px`;
            overlayElement.style.top = `${rect.top + rect.height / 2 - size / 2}px`;
            overlayElement.style.width = `${size}px`;
            overlayElement.style.height = `${size}px`;
            overlayElement.style.display = 'block';
            return true;
        };

        let animationFrameId: number | undefined;

        const trackOverlay = () => {
            animationFrameId = undefined;

            if (updateOverlay()) {
                animationFrameId = window.requestAnimationFrame(trackOverlay);
            }
        };

        const startTrackingOverlay = () => {
            if (animationFrameId !== undefined) {
                window.cancelAnimationFrame(animationFrameId);
            }

            trackOverlay();
        };

        targetElement.addEventListener('focus', startTrackingOverlay);
        targetElement.addEventListener('blur', updateOverlay);
        window.addEventListener('resize', startTrackingOverlay);
        window.addEventListener('scroll', startTrackingOverlay, true);

        return () => {
            if (animationFrameId !== undefined) {
                window.cancelAnimationFrame(animationFrameId);
            }

            targetElement.removeEventListener('focus', startTrackingOverlay);
            targetElement.removeEventListener('blur', updateOverlay);
            window.removeEventListener('resize', startTrackingOverlay);
            window.removeEventListener('scroll', startTrackingOverlay, true);
            overlayElement.remove();
        };
    }, [isEnabled, overlayRef, targetRef, updateKey]);
};
