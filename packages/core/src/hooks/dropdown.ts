import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { DropdownCoordinates, DropdownDirection } from '../types/dropdown';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface UseDropdownListenerOptions {
    onClick: (event: MouseEvent) => void;
    onClose: () => void;
    onTouchEnd: (event: TouchEvent) => void;
    onTouchStart: (event: TouchEvent) => void;
    shouldCaptureEvents?: boolean;
}

export const useDropdownListener = ({
    onClick,
    onClose,
    onTouchEnd,
    onTouchStart,
    shouldCaptureEvents,
}: UseDropdownListenerOptions) => {
    useEffect(() => {
        document.addEventListener('click', onClick, shouldCaptureEvents);
        document.addEventListener('touchend', onTouchEnd, shouldCaptureEvents);
        document.addEventListener('touchstart', onTouchStart, shouldCaptureEvents);

        window.addEventListener('blur', onClose);

        return () => {
            document.removeEventListener('click', onClick, shouldCaptureEvents);
            document.removeEventListener('touchend', onTouchEnd, shouldCaptureEvents);
            document.removeEventListener('touchstart', onTouchStart, shouldCaptureEvents);

            window.removeEventListener('blur', onClose);
        };
    }, [onClick, onClose, onTouchEnd, onTouchStart]);
};

interface UseDropdownAlignmentOptions {
    direction: DropdownDirection;
    shouldUseTopAlignment: boolean;
    contentWidth: number;
    anchorElement: Element;
}

export const useDropdownAlignment = ({
    anchorElement,
    contentWidth,
    direction,
    shouldUseTopAlignment,
}: UseDropdownAlignmentOptions) => {
    const [translateX, setTranslateX] = useState<string>('0px');
    const [translateY, setTranslateY] = useState<string>('0px');

    useEffect(() => {
        if (
            [
                DropdownDirection.BOTTOM_LEFT,
                DropdownDirection.TOP_LEFT,
                DropdownDirection.LEFT,
            ].includes(direction)
        ) {
            const difference = anchorElement.clientWidth - contentWidth;

            setTranslateX(`${difference}px`);
        } else {
            setTranslateX('0px');
        }
    }, [anchorElement.clientWidth, contentWidth, direction]);

    useEffect(() => {
        const useTopAlignment =
            shouldUseTopAlignment ||
            [
                DropdownDirection.TOP,
                DropdownDirection.TOP_LEFT,
                DropdownDirection.TOP_RIGHT,
            ].includes(direction);

        if (useTopAlignment) {
            setTranslateY('-100%');
        } else {
            setTranslateY('0px');
        }
    }, [direction, shouldUseTopAlignment]);

    return useMemo(() => ({ x: translateX, y: translateY }), [translateX, translateY]);
};

interface UseDropdownPositionOptions {
    anchorElement: Element;
    container?: Element;
    contentHeight?: number;
    direction: DropdownDirection;
    shouldShowDropdown: boolean;
}

/**
 * The space (in pixels) that should be kept between the dropdown content and the edge of the
 * container when calculating the available maximum height.
 */
const AVAILABLE_HEIGHT_SPACING = 16;

export const useDropdownPosition = ({
    anchorElement,
    container,
    contentHeight = 0,
    direction,
    shouldShowDropdown,
}: UseDropdownPositionOptions) => {
    const [coordinates, setCoordinates] = useState<DropdownCoordinates>({ x: 0, y: 0 });
    const [shouldUseTopAlignment, setShouldUseTopAlignment] = useState(false);
    const [availableMaxHeight, setAvailableMaxHeight] = useState<number>(0);

    // Stores the alignment decision (top/bottom) that was made when the dropdown opened. The
    // decision depends on the content height, but the content height in turn is limited by the
    // available height (which depends on the alignment). Recalculating the alignment on every
    // change would create a feedback loop that makes the alignment flip and the height oscillate.
    // We therefore lock the alignment while the dropdown stays open and reset it on close.
    const lockedTopAlignmentRef = useRef<boolean | null>(null);

    const calculateCoordinates = useCallback(() => {
        // While the dropdown is closing (or closed) we must not recalculate the position and the
        // available height. Otherwise layout changes underneath the dropdown (e.g. content that
        // appears after a selection) would move or resize the dropdown body while it is still fading
        // out, causing it to visibly jump. Freezing the last calculated values keeps the closing
        // animation stable.
        if (!shouldShowDropdown) {
            return;
        }

        if (container) {
            const {
                left: anchorLeft,
                top: anchorTop,
                height: anchorHeight,
            } = anchorElement.getBoundingClientRect();

            const { left, top, height } = container.getBoundingClientRect();

            const x = anchorLeft - left + container.scrollLeft;
            const y = anchorTop - top + container.scrollTop;

            let useTopAlignment = [
                DropdownDirection.TOP,
                DropdownDirection.TOP_LEFT,
                DropdownDirection.TOP_RIGHT,
            ].includes(direction);

            const hasBottomAlignment = [
                DropdownDirection.BOTTOM,
                DropdownDirection.BOTTOM_LEFT,
                DropdownDirection.BOTTOM_RIGHT,
            ].includes(direction);

            if (lockedTopAlignmentRef.current !== null) {
                // Keep the alignment that was decided when the dropdown opened.
                useTopAlignment = lockedTopAlignmentRef.current;
            } else if (!hasBottomAlignment && y + anchorHeight + contentHeight > height) {
                useTopAlignment = true;
            }

            lockedTopAlignmentRef.current = useTopAlignment;

            setShouldUseTopAlignment(useTopAlignment);

            // Calculate the space that is available for the dropdown content. When the dropdown is
            // opened to the top, the available space reaches from the anchor to the top edge of the
            // container. When it is opened to the bottom, it reaches from the bottom of the anchor
            // to the bottom edge of the container. A small spacing is subtracted so the content does
            // not touch the container edge (e.g. to leave room for shadows).
            const spaceToTop = y;
            const spaceToBottom = height - (y + anchorHeight);

            const nextAvailableMaxHeight = Math.max(
                Math.round(
                    (useTopAlignment ? spaceToTop : spaceToBottom) - AVAILABLE_HEIGHT_SPACING,
                ),
                0,
            );

            // Ignore sub-pixel fluctuations so tiny changes from getBoundingClientRect do not
            // repeatedly trigger re-renders that could keep the height oscillating.
            setAvailableMaxHeight((currentAvailableMaxHeight) =>
                Math.abs(currentAvailableMaxHeight - nextAvailableMaxHeight) <= 1
                    ? currentAvailableMaxHeight
                    : nextAvailableMaxHeight,
            );

            setCoordinates({ x, y: useTopAlignment ? y : y + anchorHeight });
        }
    }, [anchorElement, container, contentHeight, direction, shouldShowDropdown]);

    useIsomorphicLayoutEffect(() => {
        // Reset the locked alignment whenever the dropdown is closed, so the next time it opens the
        // alignment (top/bottom) is decided freshly based on the then-available space.
        if (!shouldShowDropdown) {
            lockedTopAlignmentRef.current = null;
        }

        const handleResize = () => {
            calculateCoordinates();

            setTimeout(calculateCoordinates, 300);
        };

        handleResize();

        if (shouldShowDropdown) {
            window.addEventListener('resize', handleResize);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [calculateCoordinates, shouldShowDropdown]);

    return useMemo(
        () => ({ shouldUseTopAlignment, coordinates, availableMaxHeight }),
        [availableMaxHeight, coordinates, shouldUseTopAlignment],
    );
};

interface UseDropdownOptions {
    anchorElement: Element;
    container?: Element;
    contentHeight?: number;
    contentWidth: number;
    direction: DropdownDirection;
    shouldShowDropdown: boolean;
}

export const useDropdown = ({
    anchorElement,
    container,
    contentHeight,
    contentWidth,
    direction,
    shouldShowDropdown,
}: UseDropdownOptions) => {
    const { shouldUseTopAlignment, coordinates, availableMaxHeight } = useDropdownPosition({
        anchorElement,
        container,
        contentHeight,
        direction,
        shouldShowDropdown,
    });

    const transform = useDropdownAlignment({
        anchorElement,
        contentWidth,
        direction,
        shouldUseTopAlignment,
    });

    const width = anchorElement.clientWidth;

    return useMemo(
        () => ({ coordinates, transform, width, availableMaxHeight }),
        [availableMaxHeight, coordinates, transform, width],
    );
};
