import React, { FC, ReactNode, ReactPortal, useCallback, useEffect, useRef, useState } from 'react';
import {
    StyledDropdownBodyWrapper,
    StyledDropdownBodyWrapperContent,
} from './DropdownBodyWrapper.styles';
import { createPortal } from 'react-dom';
import { DropdownDirection } from '../../types/dropdown';
import DelayedDropdownContent, {
    DelayedDropdownContentProps,
} from './delayed-dropdown-content/DelayedDropdownContent';
import { useDropdown, useDropdownListener } from '../../hooks/dropdown';
import { useContainer } from '../../hooks/container';

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
     * Whether the dropdown should be visible.
     */
    shouldShowDropdown: boolean;
}

const DropdownBodyWrapper: FC<DropdownBodyWrapperProps> = ({
    direction = DropdownDirection.BOTTOM_RIGHT,
    children,
    container: containerProp,
    shouldShowDropdown,
    anchorElement,
    contentHeight = 0,
    maxHeight = 300,
    onClose,
    onMeasure,
    minBodyWidth = 0,
    bodyWidth,
}) => {
    const [portal, setPortal] = useState<ReactPortal>();

    const ref = useRef<HTMLDivElement>(null);

    const container = useContainer({ anchorElement, container: containerProp });

    const { transform, width, coordinates } = useDropdown({
        direction,
        bodyWidth,
        contentHeight,
        container,
        anchorElement,
    });

    const handleClose = useCallback(() => {
        if (typeof onClose === 'function') {
            onClose();
        }
    }, [onClose]);

    /**
     * This function closes the body
     */
    const handleOutsideClick = useCallback(
        (event: MouseEvent) => {
            if (
                !anchorElement.contains(event.target as Node) &&
                ref.current &&
                !ref.current.contains(event.target as Node)
            ) {
                handleClose();
            }
        },
        [anchorElement, handleClose],
    );

    /**
     * This hook listens for clicks
     */
    useDropdownListener({
        onOutsideClick: handleOutsideClick,
        onClose: handleClose,
    });

    useEffect(() => {
        if (!container) return;

        setPortal(() =>
            createPortal(
                <DelayedDropdownContent
                    shouldShowContent={shouldShowDropdown}
                    coordinates={coordinates}
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
        direction,
        children,
        container,
        coordinates,
        maxHeight,
        shouldShowDropdown,
        width,
        minBodyWidth,
        transform,
        onMeasure,
    ]);

    return <StyledDropdownBodyWrapper>{portal}</StyledDropdownBodyWrapper>;
};

DropdownBodyWrapper.displayName = 'DropdownBodyWrapper';

export default DropdownBodyWrapper;
