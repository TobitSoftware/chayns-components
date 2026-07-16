import { type CSSProperties, RefObject, useEffect } from 'react';
import { getIsKeyboardFocusHighlightingActive } from './useKeyboardFocusHighlighting';

type FocusRingShape = 'rectangle' | 'circle';

type FocusRingPortalOptions = {
    isEnabled: boolean;
    shape?: FocusRingShape;
    padding?: number;
    borderRadius?: CSSProperties['borderRadius'];
    overlayRef?: RefObject<HTMLElement>;
};

export type FocusRingPortalShape = FocusRingShape;

let overlayElement: HTMLDivElement | null = null;
let overlayOwner: HTMLElement | null = null;

const getOverlayContainer = (element: HTMLElement): HTMLElement => {
    const pageProvider =
        element.closest<HTMLElement>('.page-provider') ??
        document.querySelector<HTMLElement>('.page-provider');

    return pageProvider ?? document.body;
};

const getRadiusValue = (value: string, padding: number): string => {
    if (padding === 0 || !value.endsWith('px')) {
        return value;
    }

    return `${Number.parseFloat(value) + padding}px`;
};

const applyOverlayBorderRadius = (
    nextOverlayElement: HTMLDivElement,
    element: HTMLElement,
    shape: FocusRingShape,
    padding: number,
    borderRadius?: CSSProperties['borderRadius'],
) => {
    nextOverlayElement.style.borderRadius = '';
    nextOverlayElement.style.borderTopLeftRadius = '';
    nextOverlayElement.style.borderTopRightRadius = '';
    nextOverlayElement.style.borderBottomRightRadius = '';
    nextOverlayElement.style.borderBottomLeftRadius = '';

    if (shape === 'circle') {
        nextOverlayElement.style.borderRadius = '50%';
        return;
    }

    if (borderRadius !== undefined) {
        nextOverlayElement.style.borderRadius =
            typeof borderRadius === 'number' ? `${borderRadius + padding}px` : borderRadius;
        return;
    }

    const computedStyles = window.getComputedStyle(element);

    nextOverlayElement.style.borderTopLeftRadius = getRadiusValue(
        computedStyles.borderTopLeftRadius,
        padding,
    );
    nextOverlayElement.style.borderTopRightRadius = getRadiusValue(
        computedStyles.borderTopRightRadius,
        padding,
    );
    nextOverlayElement.style.borderBottomRightRadius = getRadiusValue(
        computedStyles.borderBottomRightRadius,
        padding,
    );
    nextOverlayElement.style.borderBottomLeftRadius = getRadiusValue(
        computedStyles.borderBottomLeftRadius,
        padding,
    );
};

const ensureOverlayElement = (element: HTMLElement): HTMLDivElement => {
    const overlayContainer = getOverlayContainer(element);

    if (overlayElement) {
        if (overlayElement.parentElement !== overlayContainer) {
            overlayContainer.appendChild(overlayElement);
        }

        return overlayElement;
    }

    overlayElement = document.createElement('div');
    overlayElement.style.position = 'fixed';
    overlayElement.style.pointerEvents = 'none';
    overlayElement.style.zIndex = '2147483647';
    overlayElement.style.display = 'none';
    overlayElement.style.outline = '2px solid color-mix(in srgb, white 70%, transparent)';
    overlayElement.style.outlineOffset = '1px';
    overlayElement.style.boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.3)';
    overlayContainer.appendChild(overlayElement);

    return overlayElement;
};

export const hideFocusRingOverlay = (owner?: HTMLElement) => {
    if (!overlayElement) {
        return;
    }

    if (owner && overlayOwner && overlayOwner !== owner) {
        return;
    }

    overlayElement.style.display = 'none';
    overlayOwner = null;
};

export const showFocusRingOverlay = (
    element: HTMLElement,
    shape: FocusRingShape = 'rectangle',
    padding = 0,
    borderRadius?: CSSProperties['borderRadius'],
) => {
    if (!element.isConnected) {
        hideFocusRingOverlay(element);
        return;
    }

    const rect = element.getBoundingClientRect();
    const nextOverlayElement = ensureOverlayElement(element);
    const overlayWidth = rect.width + padding * 2;
    const overlayHeight = rect.height + padding * 2;

    if (shape === 'circle') {
        const overlaySize = Math.max(overlayWidth, overlayHeight);

        nextOverlayElement.style.left = `${rect.left + rect.width / 2 - overlaySize / 2}px`;
        nextOverlayElement.style.top = `${rect.top + rect.height / 2 - overlaySize / 2}px`;
        nextOverlayElement.style.width = `${overlaySize}px`;
        nextOverlayElement.style.height = `${overlaySize}px`;
        applyOverlayBorderRadius(nextOverlayElement, element, shape, padding, borderRadius);
        nextOverlayElement.style.display = 'block';
        overlayOwner = element;
        return;
    }

    nextOverlayElement.style.left = `${rect.left - padding}px`;
    nextOverlayElement.style.top = `${rect.top - padding}px`;
    nextOverlayElement.style.width = `${overlayWidth}px`;
    nextOverlayElement.style.height = `${overlayHeight}px`;
    applyOverlayBorderRadius(nextOverlayElement, element, shape, padding, borderRadius);
    nextOverlayElement.style.display = 'block';
    overlayOwner = element;
};

/**
 * Renders a focus ring in the closest PageProvider portal container.
 */
export const useFocusRingPortal = (
    targetRef: RefObject<HTMLElement>,
    {
        isEnabled,
        shape = 'rectangle',
        padding = 0,
        borderRadius,
        overlayRef,
    }: FocusRingPortalOptions,
) => {
    useEffect(() => {
        if (!isEnabled || typeof window === 'undefined') {
            const targetElement = targetRef.current;

            if (targetElement) {
                delete targetElement.dataset.focusRingPortalMode;
            }

            hideFocusRingOverlay(targetRef.current ?? undefined);
            return undefined;
        }

        const targetElement = targetRef.current;

        if (!targetElement) {
            return undefined;
        }

        targetElement.dataset.focusRingPortalMode = 'custom';

        const getOverlayTargetElement = () => overlayRef?.current ?? targetElement;

        let animationFrameId: number | undefined;

        const stopTrackingOverlay = () => {
            if (animationFrameId !== undefined) {
                window.cancelAnimationFrame(animationFrameId);
                animationFrameId = undefined;
            }
        };

        const updateOverlay = () => {
            if (
                document.activeElement !== targetElement ||
                (!targetElement.matches(':focus-visible') &&
                    !getIsKeyboardFocusHighlightingActive())
            ) {
                stopTrackingOverlay();
                hideFocusRingOverlay(getOverlayTargetElement());
                return false;
            }

            const overlayTargetElement = getOverlayTargetElement();

            if (!overlayTargetElement.isConnected) {
                stopTrackingOverlay();
                hideFocusRingOverlay(overlayTargetElement);
                return false;
            }

            showFocusRingOverlay(overlayTargetElement, shape, padding, borderRadius);
            return true;
        };

        const trackOverlay = () => {
            animationFrameId = undefined;

            if (updateOverlay()) {
                animationFrameId = window.requestAnimationFrame(trackOverlay);
            }
        };

        const startTrackingOverlay = () => {
            stopTrackingOverlay();
            trackOverlay();
        };

        const handleBlur = () => {
            stopTrackingOverlay();
            hideFocusRingOverlay(getOverlayTargetElement());
        };

        startTrackingOverlay();

        targetElement.addEventListener('focus', startTrackingOverlay);
        targetElement.addEventListener('blur', handleBlur);
        window.addEventListener('resize', startTrackingOverlay);
        window.addEventListener('scroll', startTrackingOverlay, true);

        return () => {
            targetElement.removeEventListener('focus', startTrackingOverlay);
            targetElement.removeEventListener('blur', handleBlur);
            window.removeEventListener('resize', startTrackingOverlay);
            window.removeEventListener('scroll', startTrackingOverlay, true);
            stopTrackingOverlay();
            delete targetElement.dataset.focusRingPortalMode;
            hideFocusRingOverlay(getOverlayTargetElement());
        };
    }, [borderRadius, isEnabled, overlayRef, padding, shape, targetRef]);
};
