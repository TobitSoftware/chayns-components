import React, {
    type CSSProperties,
    FC,
    ReactNode,
    ReactPortal,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    StyledDropdownBodyWrapper,
    StyledDropdownBodyWrapperContent,
} from './DropdownBodyWrapper.styles';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'motion/react';
import { DropdownDirection } from '../../types/dropdown';
import { BrowserName } from '../../types/chayns';
import { useDevice } from 'chayns-api';
import DelayedDropdownContent from './delayed-dropdown-content/DelayedDropdownContent';
import { useDropdown, useDropdownListener } from '../../hooks/dropdown';

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
     * Whether the dropdown should be visible.
     */
    shouldShowDropdown: boolean;
}

const DropdownBodyWrapper: FC<DropdownBodyWrapperProps> = ({
    direction = DropdownDirection.BOTTOM_RIGHT,
    children,
    container,
    shouldShowDropdown,
    anchorElement,
    contentHeight = 0,
    maxHeight = 300,
    onClose,
    minBodyWidth,
    bodyWidth,
}) => {
    const [overflowY, setOverflowY] = useState<CSSProperties['overflowY']>('hidden');
    const [portal, setPortal] = useState<ReactPortal>();

    const ref = useRef<HTMLDivElement>(null);

    const { browser } = useDevice();

    const { translateY, translateX, width, coordinates } = useDropdown({
        direction,
        minBodyWidth,
        bodyWidth,
        contentHeight,
        container,
        anchorElement,
    });

    // useEffect(() => {
    //     const currentContent = ref.current;
    //
    //     console.log("TEST", currentContent?.scrollHeight);
    //
    //     if (currentContent) {
    //         const scrollHeight = currentContent.scrollHeight ?? 0;
    //
    //         const maxHeightInPixels = getMaxHeightInPixels(
    //             maxHeight,
    //             anchorElement,
    //         );
    //
    //         setOverflowY(scrollHeight > maxHeightInPixels ? 'scroll' : 'hidden');
    //     }
    // }, [anchorElement, children, maxHeight]);

    const handleClose = useCallback(() => {
        if (typeof onClose === 'function') {
            // onClose();
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

    const handleMeasure = (rect: DOMRect) => {
        //ToDo set overflowY
        console.log('TEST', rect);
    };

    useEffect(() => {
        if (!container) return;

        setPortal(() =>
            createPortal(
                <AnimatePresence initial={false}>
                    <DelayedDropdownContent
                        shouldShowContent={shouldShowDropdown}
                        onMeasure={handleMeasure}
                        coordinates={coordinates}
                    >
                        <StyledDropdownBodyWrapperContent
                            $width={width}
                            $minWidth={minBodyWidth ?? 0}
                            $browser={browser?.name as BrowserName}
                            $overflowY={overflowY}
                            $maxHeight={maxHeight}
                            $translateX={translateX}
                            $translateY={translateY}
                            $direction={direction}
                            ref={ref}
                        >
                            {children}
                        </StyledDropdownBodyWrapperContent>
                    </DelayedDropdownContent>
                </AnimatePresence>,
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
        translateX,
        translateY,
        width,
        minBodyWidth,
        browser?.name,
        overflowY,
    ]);

    return <StyledDropdownBodyWrapper>{portal}</StyledDropdownBodyWrapper>;
};

DropdownBodyWrapper.displayName = 'DropdownBodyWrapper';

export default DropdownBodyWrapper;
