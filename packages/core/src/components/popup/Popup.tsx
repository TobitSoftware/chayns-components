import { AnimatePresence } from 'framer-motion';
import React, {
    forwardRef,
    ReactNode,
    ReactPortal,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useUuid } from '../../hooks/uuid';
import { PopupAlignment, PopupCoordinates, PopupRef } from './interface';
import PopupContent from './popup-content/PopupContent';
import { StyledPopup, StyledPopupPseudo } from './Popup.styles';

export type PopupProps = {
    /**
     * The content that should be displayed inside the popup.
     */
    content: ReactNode;
    /**
     * Function to be executed when the content of the Context menu has been hidden.
     */
    onHide?: VoidFunction;
    /**
     * Function to be executed when the content of the Context menu has been shown.
     */
    onShow?: VoidFunction;
};

const Popup = forwardRef<PopupRef, PopupProps>(({ content, onShow, onHide, children }, ref) => {
    const [coordinates, setCoordinates] = useState<PopupCoordinates>({
        x: 0,
        y: 0,
    });
    const container = document.body;

    const [alignment, setAlignment] = useState<PopupAlignment>(PopupAlignment.TopLeft);
    const [isOpen, setIsOpen] = useState(false);
    const [portal, setPortal] = useState<ReactPortal>();

    const uuid = useUuid();

    // ToDo: Replace with hook if new chayns api is ready
    const popupContentRef = useRef<HTMLDivElement>(null);
    const popupPseudoContentRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    const handleShow = useCallback(() => {
        if (popupRef.current && popupPseudoContentRef.current) {
            const { height: pseudoHeight, width: pseudoWidth } =
                popupPseudoContentRef.current.getBoundingClientRect();

            const {
                x: childrenX,
                y: childrenY,
                height: childrenHeight,
                width: childrenWidth,
            } = popupRef.current.getBoundingClientRect();

            if (pseudoHeight > childrenY - 25) {
                if (pseudoWidth > childrenX + childrenWidth / 2 - 25) {
                    setAlignment(PopupAlignment.BottomRight);
                } else {
                    setAlignment(PopupAlignment.BottomLeft);
                }

                setCoordinates({
                    x: childrenX + childrenWidth / 2,
                    y: childrenY + childrenHeight - 15,
                });
            } else if (pseudoWidth > childrenX + childrenWidth / 2 - 25) {
                setAlignment(PopupAlignment.TopRight);
                setCoordinates({
                    x: childrenX + childrenWidth / 2,
                    y: childrenY,
                });
            } else {
                setAlignment(PopupAlignment.TopLeft);
                setCoordinates({
                    x: childrenX + childrenWidth / 2,
                    y: childrenY + 15,
                });
            }

            setIsOpen(true);
        }
    }, []);

    const handleChildrenClick = () => {
        handleShow();
    };

    const handleHide = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleDocumentClick = useCallback<EventListener>(
        (event) => {
            if (!popupContentRef.current?.contains(event.target as Node)) {
                event.preventDefault();
                event.stopPropagation();
            }

            handleHide();
        },
        [handleHide]
    );

    useImperativeHandle(
        ref,
        () => ({
            hide: handleHide,
            show: handleShow,
        }),
        [handleHide, handleShow]
    );

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', handleDocumentClick, true);
            window.addEventListener('blur', handleHide);

            if (typeof onShow === 'function') {
                onShow();
            }
        } else if (typeof onHide === 'function') {
            onHide();
        }

        return () => {
            document.removeEventListener('click', handleDocumentClick, true);
            window.removeEventListener('blur', handleHide);
        };
    }, [handleDocumentClick, handleHide, isOpen, onHide, onShow]);

    useEffect(() => {
        setPortal(() =>
            createPortal(
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <PopupContent
                            coordinates={coordinates}
                            content={content}
                            key={`tooltip_${uuid}`}
                            alignment={alignment}
                            ref={popupContentRef}
                        />
                    )}
                </AnimatePresence>,
                container
            )
        );
    }, [alignment, container, content, coordinates, isOpen, uuid]);

    return (
        <>
            <StyledPopupPseudo ref={popupPseudoContentRef}>{content}</StyledPopupPseudo>
            <StyledPopup ref={popupRef} onClick={handleChildrenClick}>
                {children}
            </StyledPopup>
            {portal}
        </>
    );
});

Popup.displayName = 'Popup';

export default Popup;
