import { type CSSProperties, useEffect, useMemo, useState } from 'react';
import { DropdownCoordinates, DropdownDirection } from '../types/dropdown';
import { useContainer } from './container';

interface UseDropdownListenerOptions {
    onClose: () => void;
    onOutsideClick: (event: MouseEvent) => void;
}

export const useDropdownListener = ({ onClose, onOutsideClick }: UseDropdownListenerOptions) => {
    useEffect(() => {
        document.addEventListener('click', onOutsideClick);
        window.addEventListener('blur', () => onClose());

        return () => {
            document.removeEventListener('click', onOutsideClick);
            window.addEventListener('blur', () => onClose());
        };
    }, [onOutsideClick, onClose]);
};

interface UseDropdownAlignmentOptions {
    direction: DropdownDirection;
    shouldUseTopAlignment: boolean;
    bodyWidth?: number;
    minBodyWidth?: number;
}

export const useDropdownAlignment = ({
    direction,
    shouldUseTopAlignment,
    minBodyWidth,
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
            typeof bodyWidth === 'number' &&
            typeof minBodyWidth === 'number'
        ) {
            const difference = minBodyWidth - bodyWidth;

            setTranslateX(`${difference}px`);
        } else {
            setTranslateX('0px');
        }
    }, [bodyWidth, direction, minBodyWidth]);

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

    return { translateX, translateY };
};

interface UseDropdownPositionOptions {
    container?: Element;
    anchorElement: Element;
    direction: DropdownDirection;
    contentHeight?: number;
}

export const useDropdownPosition = ({
    direction,
    anchorElement,
    container: containerProp,
    contentHeight = 0,
}: UseDropdownPositionOptions) => {
    const [coordinates, setCoordinates] = useState<DropdownCoordinates>({ x: 0, y: 0 });
    const [shouldUseTopAlignment, setShouldUseTopAlignment] = useState(false);

    const container = useContainer({ anchorElement, container: containerProp });

    useEffect(() => {
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
    }, [direction, anchorElement, container, contentHeight]);

    return { shouldUseTopAlignment, coordinates };
};

interface UseDropdownOptions {
    container?: Element;
    anchorElement: Element;
    direction: DropdownDirection;
    bodyWidth?: number;
    minBodyWidth?: number;
    contentHeight?: number;
}

export const useDropdown = ({
    anchorElement,
    container,
    contentHeight,
    bodyWidth,
    minBodyWidth,
    direction,
}: UseDropdownOptions) => {
    const { shouldUseTopAlignment, coordinates } = useDropdownPosition({
        contentHeight,
        container,
        anchorElement,
        direction,
    });
    const { translateX, translateY } = useDropdownAlignment({
        shouldUseTopAlignment,
        bodyWidth,
        minBodyWidth,
        direction,
    });

    const width = useMemo(() => anchorElement.clientWidth, [anchorElement]);

    return { coordinates, translateX, translateY, width };
};
