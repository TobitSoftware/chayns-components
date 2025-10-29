import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
    DropdownCoordinates,
    DropdownDirection,
} from '../components/dropdown-body-wrapper/Dropdown.types';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface UseDropdownListenerOptions {
    onClick: (event: MouseEvent) => void;
    onClose: () => void;
    onTouchEnd: (event: TouchEvent) => void;
    onTouchStart: (event: TouchEvent) => void;
}

export const useDropdownListener = ({
    onClick,
    onClose,
    onTouchEnd,
    onTouchStart,
}: UseDropdownListenerOptions) => {
    useEffect(() => {
        document.addEventListener('click', onClick, true);
        document.addEventListener('touchend', onTouchEnd, true);
        document.addEventListener('touchstart', onTouchStart, true);

        window.addEventListener('blur', onClose);

        return () => {
            document.removeEventListener('click', onClick, true);
            document.removeEventListener('touchend', onTouchEnd, true);
            document.removeEventListener('touchstart', onTouchStart, true);

            window.removeEventListener('blur', onClose);
        };
    }, [onClick, onClose, onTouchEnd, onTouchStart]);
};

interface UseDropdownAlignmentOptions {
    direction: DropdownDirection;
    shouldUseTopAlignment: boolean;
    bodyWidth?: number;
    anchorElement: Element;
}

export const useDropdownAlignment = ({
    direction,
    shouldUseTopAlignment,
    anchorElement,
    bodyWidth,
}: UseDropdownAlignmentOptions) => {
    const [translateX, setTranslateX] = useState<string>('0px');
    const [translateY, setTranslateY] = useState<string>('0px');

    useEffect(() => {
        if (
            [
                DropdownDirection.BOTTOM_LEFT,
                DropdownDirection.TOP_LEFT,
                DropdownDirection.LEFT,
            ].includes(direction) &&
            typeof bodyWidth === 'number'
        ) {
            const difference = anchorElement.clientWidth - bodyWidth;

            setTranslateX(`${difference}px`);
        } else {
            setTranslateX('0px');
        }
    }, [anchorElement.clientWidth, bodyWidth, direction]);

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

export const useDropdownPosition = ({
    anchorElement,
    container,
    contentHeight = 0,
    direction,
    shouldShowDropdown,
}: UseDropdownPositionOptions) => {
    const [coordinates, setCoordinates] = useState<DropdownCoordinates>({ x: 0, y: 0 });
    const [shouldUseTopAlignment, setShouldUseTopAlignment] = useState(false);

    const calculateCoordinates = useCallback(() => {
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

            if (!hasBottomAlignment && y + anchorHeight + contentHeight > height) {
                useTopAlignment = true;

                setShouldUseTopAlignment(true);
            } else {
                setShouldUseTopAlignment(false);
            }

            setCoordinates({ x, y: useTopAlignment ? y : y + anchorHeight });
        }
    }, [anchorElement, container, contentHeight, direction]);

    useIsomorphicLayoutEffect(() => {
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
        () => ({ shouldUseTopAlignment, coordinates }),
        [coordinates, shouldUseTopAlignment],
    );
};

interface UseDropdownOptions {
    anchorElement: Element;
    bodyWidth?: number;
    container?: Element;
    contentHeight?: number;
    direction: DropdownDirection;
    shouldShowDropdown: boolean;
}

export const useDropdown = ({
    anchorElement,
    bodyWidth,
    container,
    contentHeight,
    direction,
    shouldShowDropdown,
}: UseDropdownOptions) => {
    const { shouldUseTopAlignment, coordinates } = useDropdownPosition({
        anchorElement,
        container,
        contentHeight,
        direction,
        shouldShowDropdown,
    });

    const transform = useDropdownAlignment({
        shouldUseTopAlignment,
        bodyWidth,
        anchorElement,
        direction,
    });

    const width = anchorElement.clientWidth;

    return useMemo(() => ({ coordinates, transform, width }), [coordinates, transform, width]);
};
