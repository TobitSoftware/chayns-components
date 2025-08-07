import React, { FC, ReactNode, ReactPortal, useCallback, useEffect, useRef, useState } from 'react';
import {
    StyledDropdownBodyWrapper,
    StyledDropdownBodyWrapperContent,
} from './DropdownBodyWrapper.styles';
import { createPortal } from 'react-dom';
import { DropdownDirection, DropdownMeasurements } from '../../types/dropdown';
import DelayedDropdownContent, {
    DelayedDropdownContentProps,
} from './delayed-dropdown-content/DelayedDropdownContent';
import { useDropdown, useDropdownListener } from '../../hooks/dropdown';
import { ContainerAnchor, useContainer } from '../../hooks/container';

interface DropdownBodyWrapperProps {
    /**
     * The anchor element of the dropdown.
     */
    anchorElement: Element;
    /**
     * The width of the Body.
     */
    bodyWidth?: number;
    /**
     * The content of the dropdown body.
     */
    children: ReactNode;
    /**
     * The element where the content should be rendered via React Portal.
     */
    container?: Element;
    /**
     * The height of the content
     */
    contentHeight?: number;
    /**
     * The direction of the dropdown.
     */
    direction?: DropdownDirection;
    /**
     * The max height of the dropdown.
     */
    maxHeight?: number;
    /**
     * The minimum width of the body.
     */
    minBodyWidth?: number;
    /**
     * Function to be executed when the body is closed.
     */
    onClose?: VoidFunction;
    /**
     * Function to be executed when the content is measured.
     */
    onMeasure?: DelayedDropdownContentProps['onMeasure'];
    /**
     * Whether the dropdown should prevent closing on click. This is useful for mobile devices if
     * the input is focused and the dropdown should not close when user wants to close the keyboard.
     */
    shouldPreventCloseOnClick?: boolean;
    /**
     * Whether the dropdown should be visible.
     */
    shouldShowDropdown: boolean;
}

const DropdownBodyWrapper: FC<DropdownBodyWrapperProps> = ({
    anchorElement,
    bodyWidth,
    children,
    container: containerProp,
    contentHeight = 0,
    direction = DropdownDirection.BOTTOM_RIGHT,
    maxHeight = 300,
    minBodyWidth = 0,
    onClose,
    onMeasure,
    shouldPreventCloseOnClick = false,
    shouldShowDropdown,
}) => {
    const isInChaynsWalletRef = useRef(false);

    const [measuredContentHeight, setMeasuredContentHeight] = useState<number>(0);
    const [portal, setPortal] = useState<ReactPortal>();

    const ref = useRef<HTMLDivElement>(null);
    const shouldPreventClickRef = useRef<boolean>(false);
    const touchTimeoutRef = useRef<number | undefined>(undefined);

    const container = useContainer({ anchorElement, container: containerProp });

    const { transform, width, coordinates } = useDropdown({
        direction,
        bodyWidth,
        contentHeight,
        container,
        anchorElement,
        shouldShowDropdown,
    });

    const handleClose = useCallback(() => {
        if (typeof onClose === 'function') {
            onClose();
        }
    }, [onClose]);

    /**
     * This function closes the body
     */
    const handleClick = useCallback(
        (event: MouseEvent) => {
            if (
                ref.current &&
                shouldShowDropdown &&
                !anchorElement.contains(event.target as Node) &&
                !ref.current.contains(event.target as Node)
            ) {
                event.preventDefault();
                event.stopPropagation();

                if (!shouldPreventClickRef.current && !shouldPreventCloseOnClick) {
                    handleClose();
                }
            }

            shouldPreventClickRef.current = false;
        },
        [anchorElement, handleClose, shouldPreventCloseOnClick, shouldShowDropdown],
    );

    const handleContentMeasure = useCallback(
        (measurements: DropdownMeasurements) => {
            // Measurements are only needed if the content is shown in the chayns wallet. To prevent
            // unnecessary renders, we only set the height if the content is shown in the wallet.
            if (isInChaynsWalletRef.current) {
                setMeasuredContentHeight(measurements.height);
            }

            if (typeof onMeasure === 'function') {
                onMeasure(measurements);
            }
        },
        [onMeasure],
    );

    const handleTouchEnd = useCallback(() => {
        clearTimeout(touchTimeoutRef.current);
    }, []);

    const handleTouchStart = useCallback(() => {
        touchTimeoutRef.current = window.setTimeout(() => {
            shouldPreventClickRef.current = true;
        }, 500);
    }, []);

    /**
     * This hook listens for clicks
     */
    useDropdownListener({
        onClick: handleClick,
        onClose: handleClose,
        onTouchEnd: handleTouchEnd,
        onTouchStart: handleTouchStart,
    });

    useEffect(() => {
        const isBottomDirection = [
            DropdownDirection.BOTTOM,
            DropdownDirection.BOTTOM_LEFT,
            DropdownDirection.BOTTOM_RIGHT,
        ].includes(direction);

        const reservationWrapperElement = anchorElement.closest<HTMLDivElement>(
            ContainerAnchor.RESERVATION_WRAPPER,
        );

        isInChaynsWalletRef.current =
            !!(reservationWrapperElement && reservationWrapperElement.contains(anchorElement)) ||
            true;

        // This effect checks if additional space is needed to show dropdown content in chayns cards.
        if (
            isBottomDirection &&
            isInChaynsWalletRef.current &&
            measuredContentHeight > 0 &&
            reservationWrapperElement &&
            shouldShowDropdown
        ) {
            const availableHeight =
                window.innerHeight - anchorElement.getBoundingClientRect().bottom;

            // If the content height is greater than the available height, we need to add additional space.
            // This is to ensure that the dropdown content is fully visible. The 16 pixels are a buffer for shadows.
            const additionalNeededSpace = measuredContentHeight + 16 - availableHeight;

            if (additionalNeededSpace > 0) {
                // Add margin bottom to the reservation wrapper to ensure the dropdown content is fully visible.
                reservationWrapperElement.style.marginBottom = `${additionalNeededSpace}px`;
            } else {
                // Reset the margin bottom if no additional space is needed.
                reservationWrapperElement.style.marginBottom = '0px';
            }
        }

        if (isInChaynsWalletRef.current && reservationWrapperElement && !shouldShowDropdown) {
            // Reset the margin bottom when the dropdown is closed.
            reservationWrapperElement.style.marginBottom = '0px';
        }

        return () => {
            if (reservationWrapperElement) {
                reservationWrapperElement.style.marginBottom = '0px';
            }
        };
    }, [anchorElement, direction, measuredContentHeight, shouldShowDropdown]);

    useEffect(() => {
        if (!container) return;

        setPortal(() =>
            createPortal(
                <DelayedDropdownContent
                    coordinates={coordinates}
                    onMeasure={handleContentMeasure}
                    shouldShowContent={shouldShowDropdown}
                    transform={transform}
                >
                    <StyledDropdownBodyWrapperContent
                        $width={width}
                        $minWidth={minBodyWidth}
                        $maxHeight={maxHeight}
                        $direction={direction}
                        ref={ref}
                    >
                        {children}
                    </StyledDropdownBodyWrapperContent>
                </DelayedDropdownContent>,
                container,
            ),
        );
    }, [
        children,
        container,
        coordinates,
        direction,
        handleContentMeasure,
        maxHeight,
        minBodyWidth,
        shouldShowDropdown,
        transform,
        width,
    ]);

    return <StyledDropdownBodyWrapper>{portal}</StyledDropdownBodyWrapper>;
};

DropdownBodyWrapper.displayName = 'DropdownBodyWrapper';

export default DropdownBodyWrapper;
