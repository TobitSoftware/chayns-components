import { getWindowMetrics } from 'chayns-api';
import { AnimatePresence } from 'motion/react';
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
import { PopupAlignment, PopupCoordinates, PopupRef } from '../../types/popup';
import AreaContextProvider from '../area-provider/AreaContextProvider';
import PopupContentWrapper from './popup-content-wrapper/PopupContentWrapper';
import { StyledPopup, StyledPopupPseudo } from './Popup.styles';

export type PopupProps = {
    /**
     * The element over which the content of the `ContextMenu` should be displayed.
     */
    children?: ReactNode;
    /**
     * The element where the content of the `Popup` should be rendered via React Portal.
     */
    container?: Element;
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
    /**
     * Whether the tooltip should be hidden after the children is not hovered.
     */
    shouldHideOnChildrenLeave?: boolean;
    /**
     * Whether the popup should be opened on hover. If not, the popup will be opened on click.
     */
    shouldShowOnHover?: boolean;
    /**
     * Whether the width of the children should be used.
     */
    shouldUseChildrenWidth?: boolean;
    /**
     * The Y offset of the popup to the children.
     */
    yOffset?: number;
};

const Popup = forwardRef<PopupRef, PopupProps>(
    (
        {
            content,
            onShow,
            container,
            onHide,
            children,
            shouldHideOnChildrenLeave,
            shouldShowOnHover = false,
            shouldUseChildrenWidth = true,
            yOffset = 0,
        },
        ref,
    ) => {
        const [coordinates, setCoordinates] = useState<PopupCoordinates>({
            x: 0,
            y: 0,
        });

        const [alignment, setAlignment] = useState<PopupAlignment>(PopupAlignment.TopLeft);
        const [offset, setOffset] = useState<number>(0);
        const [isOpen, setIsOpen] = useState(false);
        const [portal, setPortal] = useState<ReactPortal>();
        const [menuHeight, setMenuHeight] = useState(0);
        const [isMeasuring, setIsMeasuring] = useState(true);
        const [pseudoSize, setPseudoSize] = useState<{ height: number; width: number }>();
        const [newContainer, setNewContainer] = useState<Element | null>(container ?? null);

        const timeout = useRef<number>();

        const uuid = useUuid();

        // ToDo: Replace with hook if new chayns api is ready

        const popupContentRef = useRef<HTMLDivElement>(null);
        const popupPseudoContentRef = useRef<HTMLDivElement>(null);
        const popupRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (popupRef.current && !container) {
                const el = popupRef.current as HTMLElement;

                const element = el.closest('.dialog-inner, .page-provider, .tapp, body');

                setNewContainer(element);
            }
        }, [container]);

        useEffect(() => {
            if (container instanceof Element) {
                setNewContainer(container);
            }
        }, [container]);

        const measureHeight = () => {
            if (popupPseudoContentRef.current) {
                const height = popupPseudoContentRef.current.offsetHeight;
                const width = popupPseudoContentRef.current.offsetWidth + 1;

                setPseudoSize({ height, width });
            }
        };

        useEffect(() => {
            measureHeight();

            setIsMeasuring(false);
        }, []);

        useEffect(() => {
            const handleResize = () => {
                setIsMeasuring(true);

                setTimeout(() => {
                    measureHeight();
                    setIsMeasuring(false);
                }, 0);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, []);

        const handleShow = useCallback(() => {
            if (popupRef.current && pseudoSize) {
                const { height: pseudoHeight, width: pseudoWidth } = pseudoSize;

                const {
                    height: childrenHeight,
                    left: childrenLeft,
                    top: childrenTop,
                    width: childrenWidth,
                } = popupRef.current.getBoundingClientRect();

                const containerRect = newContainer?.getBoundingClientRect();

                if (pseudoHeight > childrenTop - 25) {
                    let isRight = false;

                    if (pseudoWidth > childrenLeft + childrenWidth / 2 - 25) {
                        setAlignment(PopupAlignment.BottomRight);

                        isRight = true;
                    } else {
                        setAlignment(PopupAlignment.BottomLeft);
                    }

                    const x = childrenLeft - (containerRect?.left ?? 0) + childrenWidth / 2;
                    const y = childrenTop - (containerRect?.top ?? 0) + childrenHeight + yOffset;

                    let newOffset;

                    if (isRight) {
                        newOffset =
                            x + pseudoWidth >= window.innerWidth
                                ? x + pseudoWidth - window.innerWidth
                                : 0;
                    } else {
                        newOffset = 0;

                        const right = window.innerWidth - (childrenLeft + childrenWidth / 2);

                        newOffset =
                            right + pseudoWidth >= window.innerWidth
                                ? right + pseudoWidth - window.innerWidth
                                : 0;
                    }

                    setOffset(newOffset);

                    const newX = x - newOffset;

                    setCoordinates({
                        x: newX < 23 ? 23 : newX,
                        y: y - yOffset,
                    });
                } else {
                    let isRight = false;

                    if (pseudoWidth > childrenLeft + childrenWidth / 2 - 25) {
                        setAlignment(PopupAlignment.TopRight);

                        isRight = true;
                    } else {
                        setAlignment(PopupAlignment.TopLeft);
                    }

                    const x = childrenLeft - (containerRect?.left ?? 0) + childrenWidth / 2;
                    const y = childrenTop - (containerRect?.top ?? 0) - yOffset;

                    let newOffset;

                    if (isRight) {
                        newOffset =
                            x + pseudoWidth >= window.innerWidth
                                ? x + pseudoWidth - window.innerWidth
                                : 0;
                    } else {
                        newOffset = 0;

                        const right = window.innerWidth - (childrenLeft + childrenWidth / 2);

                        newOffset =
                            right + pseudoWidth >= window.innerWidth
                                ? right + pseudoWidth - window.innerWidth
                                : 0;
                    }

                    setOffset(newOffset);

                    const newX = x - newOffset;

                    setCoordinates({
                        x: newX < 23 ? 23 : newX,
                        y: y - yOffset,
                    });
                }

                setIsOpen(true);
            }
        }, [newContainer, pseudoSize, yOffset]);

        const handleChildrenClick = () => {
            handleShow();
        };

        const handleHide = useCallback(() => {
            setIsOpen(false);
        }, []);

        const handleMouseEnter = useCallback(() => {
            if (shouldShowOnHover) {
                window.clearTimeout(timeout.current);
                handleShow();
            }
        }, [handleShow, shouldShowOnHover]);

        const handleMouseLeave = useCallback(() => {
            if (!shouldShowOnHover) {
                return;
            }

            if (shouldHideOnChildrenLeave) {
                handleHide();

                return;
            }

            timeout.current = window.setTimeout(() => {
                handleHide();
            }, 500);
        }, [handleHide, shouldHideOnChildrenLeave, shouldShowOnHover]);

        const handleDocumentClick = useCallback<EventListener>(
            (event) => {
                if (!popupContentRef.current?.contains(event.target as Node)) {
                    handleHide();
                }
            },
            [handleHide],
        );

        useImperativeHandle(
            ref,
            () => ({
                hide: handleHide,
                show: handleShow,
            }),
            [handleHide, handleShow],
        );

        useEffect(() => {
            void getWindowMetrics().then((result) => {
                if (result.topBarHeight) {
                    setMenuHeight(result.topBarHeight);
                }
            });
        }, []);

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
            if (!newContainer) {
                return;
            }

            setPortal(() =>
                createPortal(
                    <AnimatePresence initial={false}>
                        {isOpen && (
                            <PopupContentWrapper
                                width={pseudoSize?.width ?? 0}
                                offset={offset}
                                coordinates={coordinates}
                                key={`tooltip_${uuid}`}
                                alignment={alignment}
                                ref={popupContentRef}
                                onMouseLeave={handleMouseLeave}
                                onMouseEnter={handleMouseEnter}
                            >
                                <AreaContextProvider shouldChangeColor={false}>
                                    {content}
                                </AreaContextProvider>
                            </PopupContentWrapper>
                        )}
                    </AnimatePresence>,
                    newContainer,
                ),
            );
        }, [
            alignment,
            newContainer,
            content,
            coordinates,
            handleMouseEnter,
            handleMouseLeave,
            isOpen,
            offset,
            pseudoSize?.width,
            uuid,
        ]);

        return (
            <>
                {isMeasuring && (
                    <StyledPopupPseudo ref={popupPseudoContentRef} $menuHeight={menuHeight}>
                        {content}
                    </StyledPopupPseudo>
                )}
                <StyledPopup
                    ref={popupRef}
                    onClick={handleChildrenClick}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}
                    $shouldUseChildrenWidth={shouldUseChildrenWidth}
                >
                    {children}
                </StyledPopup>
                {portal}
            </>
        );
    },
);

Popup.displayName = 'Popup';

export default Popup;
