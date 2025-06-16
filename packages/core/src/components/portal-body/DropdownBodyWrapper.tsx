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
import { DropdownCoordinates } from '../../types/dropdown';

interface DropdownBodyWrapperProps {
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
    children,
    container: containerProp,
    shouldShowDropdown,
    anchorElement,
    maxHeight = 300,
    onClose,
}) => {
    const [coordinates, setCoordinates] = useState<DropdownCoordinates>({ x: 0, y: 0 });
    const [portal, setPortal] = useState<ReactPortal>();

    const ref = useRef<HTMLDivElement>(null);

    const container = useContainer({ anchorElement, container: containerProp });

    const width = useMemo(() => anchorElement.clientWidth, [anchorElement]);

    useEffect(() => {
        if (container) {
            const {
                left: comboBoxLeft,
                top: comboBoxTop,
                height: bodyHeight,
            } = anchorElement.getBoundingClientRect();

            const { left, top } = container.getBoundingClientRect();

            const x = comboBoxLeft - left + container.scrollLeft;
            const y = comboBoxTop - top + container.scrollTop;

            setCoordinates({
                x,
                y: y + bodyHeight,
            });
        }
    }, [anchorElement, container]);

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
