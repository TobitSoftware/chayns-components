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
import { StyledPopup } from './Popup.styles';
import { useMeasuredClone } from '../../hooks/element';

export type PopupProps = {
    /**
     * The alignment of the popup. By default, the popup will calculate the best alignment.
     */
    alignment?: PopupAlignment;
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
     * Whether the popup should scroll with the content.
     */
    shouldScrollWithContent?: boolean;
    /**
     * Whether the popup should be opened on hover. If not, the popup will be opened on click.
     */
    shouldShowOnHover?: boolean;
    /**
     * Whether the width of the children should be used.
     */
    shouldUseChildrenWidth?: boolean;
    /**
     * Whether the popup children should use the full width.
     */
    shouldUseFullWidth?: boolean;
    /**
     * The Y offset of the popup to the children.
     */
    yOffset?: number;
};

const Popup = forwardRef<PopupRef, PopupProps>(
    (
        {
            alignment,
            content,
            onShow,
            container,
            onHide,
            children,
            shouldHideOnChildrenLeave,
            shouldShowOnHover = false,
            shouldUseChildrenWidth = true,
            shouldScrollWithContent = false,
            shouldUseFullWidth = false,
            yOffset = 0,
        },
        ref,
    ) => {
        const [coordinates, setCoordinates] = useState<PopupCoordinates>({
            x: 0,
            y: 0,
        });

        const [internalAlignment, setInternalAlignment] = useState<PopupAlignment>(
            PopupAlignment.TopLeft,
        );
        const [offset, setOffset] = useState<number>(0);
        const [isOpen, setIsOpen] = useState(false);
        const [portal, setPortal] = useState<ReactPortal>();
        const [pseudoSize, setPseudoSize] = useState<{ height: number; width: number }>();
        const [newContainer, setNewContainer] = useState<Element | null>(container ?? null);
        const [contentMaxHeight, setContentMaxHeight] = useState<number | undefined>(undefined);

        const timeout = useRef<number>();

        const uuid = useUuid();

        const { height, width, measuredElement } = useMeasuredClone({ content });

        const popupContentRef = useRef<HTMLDivElement>(null);
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

        useEffect(() => {
            setPseudoSize({ height, width });
        }, [height, width]);

        const handleShow = useCallback(() => {
            if (popupRef.current && pseudoSize) {
                if (!newContainer) {
                    return;
                }

                const { height: pseudoHeight, width: pseudoWidth } = pseudoSize;

                const {
                    height: childrenHeight,
                    left: childrenLeft,
                    top: childrenTop,
                    width: childrenWidth,
                } = popupRef.current.getBoundingClientRect();

                const {
                    height: containerHeight,
                    width: containerWidth,
                    top,
                    left,
                } = newContainer.getBoundingClientRect();

                const zoomX = containerWidth / (newContainer as HTMLElement).offsetWidth;
                const zoomY = containerHeight / (newContainer as HTMLElement).offsetHeight;

                if (
                    pseudoHeight > childrenTop - 25 ||
                    alignment === PopupAlignment.BottomLeft ||
                    alignment === PopupAlignment.BottomRight
                ) {
                    let isRight = false;

                    if (
                        pseudoWidth > childrenLeft + childrenWidth / 2 - 25 ||
                        alignment === PopupAlignment.BottomRight
                    ) {
                        setInternalAlignment(PopupAlignment.BottomRight);

                        isRight = true;
                    } else {
                        setInternalAlignment(PopupAlignment.BottomLeft);
                    }

                    const x =
                        (childrenLeft + childrenWidth / 2 - left) / zoomX + newContainer.scrollLeft;
                    const y =
                        (childrenTop + childrenHeight / 2 - top) / zoomY +
                        newContainer.scrollTop -
                        yOffset;

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
                        y,
                    });
                } else {
                    let isRight = false;

                    if (
                        pseudoWidth > childrenLeft + childrenWidth / 2 - 25 ||
                        alignment === PopupAlignment.TopRight
                    ) {
                        setInternalAlignment(PopupAlignment.TopRight);

                        isRight = true;
                    } else {
                        setInternalAlignment(PopupAlignment.TopLeft);
                    }

                    const x =
                        (childrenLeft + childrenWidth / 2 - left) / zoomX + newContainer.scrollLeft;
                    const y =
                        (childrenTop + childrenHeight / 2 - top) / zoomY +
                        newContainer.scrollTop -
                        yOffset;

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
                        y,
                    });
                }

                setIsOpen(true);
            }
        }, [alignment, newContainer, pseudoSize, yOffset]);

        useEffect(() => {
            if (!newContainer) return;

            const viewHeight = newContainer.clientHeight;

            if (
                [
                    PopupAlignment.TopLeft,
                    PopupAlignment.TopRight,
                    PopupAlignment.TopCenter,
                ].includes(internalAlignment)
            ) {
                setContentMaxHeight(coordinates.y - 20);
            } else {
                setContentMaxHeight(viewHeight - coordinates.y - 20);
            }
        }, [coordinates.y, internalAlignment, newContainer]);

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
                                shouldScrollWithContent={shouldScrollWithContent}
                                coordinates={coordinates}
                                key={`tooltip_${uuid}`}
                                maxHeight={contentMaxHeight}
                                alignment={internalAlignment}
                                ref={popupContentRef}
                                onMouseLeave={handleMouseLeave}
                                onMouseEnter={handleMouseEnter}
                            >
                                <AreaContextProvider shouldChangeColor>
                                    {content}
                                </AreaContextProvider>
                            </PopupContentWrapper>
                        )}
                    </AnimatePresence>,
                    newContainer,
                ),
            );
        }, [
            contentMaxHeight,
            internalAlignment,
            newContainer,
            content,
            coordinates,
            handleMouseEnter,
            handleMouseLeave,
            isOpen,
            offset,
            pseudoSize?.width,
            uuid,
            shouldScrollWithContent,
        ]);

        return (
            <>
                {measuredElement}
                <StyledPopup
                    className="beta-chayns-popup"
                    ref={popupRef}
                    onClick={handleChildrenClick}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}
                    $shouldUseChildrenWidth={shouldUseChildrenWidth}
                    $shouldUseFullWidth={shouldUseFullWidth}
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
