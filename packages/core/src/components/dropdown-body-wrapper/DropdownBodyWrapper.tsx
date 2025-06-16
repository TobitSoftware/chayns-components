import React, {
    FC,
    ReactNode,
    ReactPortal,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    StyledDropdownBodyWrapper,
    StyledMotionDropdownBodyWrapperContent,
} from './DropdownBodyWrapper.styles';
import { useContainer } from '../../hooks/container';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'motion/react';
import { DropdownAlignment, DropdownCoordinates } from '../../types/dropdown';
import { ComboBoxDirection } from '../../types/comboBox';

interface DropdownBodyWrapperProps {
    /**
     * The alignment of the dropdown.
     */
    alignment?: DropdownAlignment;
    /**
     * The anchor element of the dropdown.
     */
    anchorElement: Element;
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
     * The max height of the dropdown.
     */
    maxHeight?: number;
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
    alignment = DropdownAlignment.BOTTOM_RIGHT,
    children,
    container: containerProp,
    shouldShowDropdown,
    anchorElement,
    contentHeight = 0,
    maxHeight = 300,
    onClose,
}) => {
    const [shouldUseTopAlignment, setShouldUseTopAlignment] = useState(false);
    const [translateX, setTranslateX] = useState<string>('0px');
    const [translateY, setTranslateY] = useState<string>('0px');
    const [coordinates, setCoordinates] = useState<DropdownCoordinates>({ x: 0, y: 0 });
    const [portal, setPortal] = useState<ReactPortal>();

    const ref = useRef<HTMLDivElement>(null);

    const container = useContainer({ anchorElement, container: containerProp });

    const width = useMemo(() => anchorElement.clientWidth, [anchorElement]);

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
                DropdownAlignment.TOP,
                DropdownAlignment.TOP_LEFT,
                DropdownAlignment.TOP_RIGHT,
            ].includes(alignment);

            const hasBottomAlignment = [
                DropdownAlignment.BOTTOM,
                DropdownAlignment.BOTTOM_LEFT,
                DropdownAlignment.BOTTOM_RIGHT,
            ].includes(alignment);

            if (!hasBottomAlignment && y + anchorHeight + contentHeight > height) {
                useTopAlignment = true;

                setShouldUseTopAlignment(true);
            } else {
                setShouldUseTopAlignment(false);
            }

            setCoordinates({ x, y: useTopAlignment ? y : y + anchorHeight });
        }
    }, [alignment, anchorElement, container, contentHeight]);

    useEffect(() => {
        if (
            [
                DropdownAlignment.BOTTOM_LEFT,
                DropdownAlignment.TOP_LEFT,
                DropdownAlignment.LEFT,
            ].includes(alignment) &&
            typeof bodyWidth === 'number' &&
            typeof minWidth === 'number'
        ) {
            const difference = minWidth - bodyWidth;

            setTranslateX(`${difference}px`);
        } else {
            setTranslateX('0px');
        }
    }, [bodyWidth, alignment, minWidth]);

    useEffect(() => {
        const useTopAlignment =
            shouldUseTopAlignment ||
            [
                DropdownAlignment.TOP,
                DropdownAlignment.TOP_LEFT,
                DropdownAlignment.TOP_RIGHT,
            ].includes(alignment);

        if (useTopAlignment) {
            setTranslateY('-100%');
        } else {
            setTranslateY('0px');
        }
    }, [alignment, shouldUseTopAlignment]);

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
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        window.addEventListener('blur', () => handleClose());

        return () => {
            document.removeEventListener('click', handleOutsideClick);
            window.addEventListener('blur', () => handleClose());
        };
    }, [handleOutsideClick, handleClose]);

    useEffect(() => {
        if (!container) return;

        setPortal(() =>
            createPortal(
                <AnimatePresence initial={false}>
                    {shouldShowDropdown && (
                        <StyledMotionDropdownBodyWrapperContent
                            $width={width}
                            $coordinates={coordinates}
                            $maxHeight={maxHeight}
                            ref={ref}
                            initial={{ height: 0, opacity: 0 }}
                            exit={{ height: 0, opacity: 0 }}
                            animate={{ height: 'fit-content', opacity: 1 }}
                            transition={{
                                duration: 0.2,
                                type: 'tween',
                            }}
                        >
                            {children}
                        </StyledMotionDropdownBodyWrapperContent>
                    )}
                </AnimatePresence>,
                container,
            ),
        );
    }, [children, container, coordinates, maxHeight, shouldShowDropdown, width]);

    return <StyledDropdownBodyWrapper>{portal}</StyledDropdownBodyWrapper>;
};

DropdownBodyWrapper.displayName = 'DropdownBodyWrapper';

export default DropdownBodyWrapper;
