import { AnimatePresence } from 'motion/react';
import React, {
    forwardRef,
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
import type { PopupProps } from './Popup.types';

export type { PopupProps } from './Popup.types';

const Popup = forwardRef<PopupRef, PopupProps>(
    (
        {
            alignment,
            content,
            onShow,
            container,
            onHide,
            children,
            isOpen,
            shouldHideOnChildrenLeave,
            shouldShowOnHover = false,
            shouldUseChildrenWidth = true,
            shouldScrollWithContent = true,
            shouldUseFullWidth = false,
            yOffset = 0,
            shouldBeOpen = false,
        },
        ref,
    ) => {
        'use no memo';

        const [coordinates, setCoordinates] = useState<PopupCoordinates>({
            x: 0,
            y: 0,
        });

        const [internalAlignment, setInternalAlignment] = useState<PopupAlignment>(
            PopupAlignment.TopLeft,
        );
        const [offset, setOffset] = useState<number>(0);
        const [isInternallyOpen, setIsInternallyOpen] = useState(shouldBeOpen);
        const [portal, setPortal] = useState<ReactPortal>();
        const [pseudoSize, setPseudoSize] = useState<{ height: number; width: number }>();
        const [newContainer, setNewContainer] = useState<Element | null>(container ?? null);
        const [contentMaxHeight, setContentMaxHeight] = useState<number | undefined>(undefined);

        const timeout = useRef<number>();
        const previousIsVisibleRef = useRef(false);

        const uuid = useUuid();
        const isControlled = typeof isOpen === 'boolean';
        const isPopupOpen = isControlled ? isOpen : isInternallyOpen;

        const { height, width, measuredElement } = useMeasuredClone({
            content,
            shouldPreventTextWrapping: !shouldUseChildrenWidth,
        });

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

        const updatePopupPosition = useCallback(() => {
            if (popupRef.current && pseudoSize) {
                if (!newContainer) {
                    return;
                }

                const HORIZONTAL_PADDING = 23;

                const { height: pseudoHeight, width: pseudoWidth } = pseudoSize;

                const {
                    height: childrenHeight,
                    left: childrenLeft,
                    top: childrenTop,
                    width: childrenWidth,
                } = popupRef.current.getBoundingClientRect();

                const element = shouldScrollWithContent ? newContainer : document.body;

                const {
                    height: containerHeight,
                    width: containerWidth,
                    top,
                    left,
                } = element.getBoundingClientRect();

                const zoomX = containerWidth / (element as HTMLElement).offsetWidth;
                const zoomY = containerHeight / (element as HTMLElement).offsetHeight;

                const childrenCenterX = childrenLeft + childrenWidth / 2;
                const x = (childrenCenterX - left) / zoomX + element.scrollLeft;
                const y =
                    (childrenTop + childrenHeight / 2 - top) / zoomY + element.scrollTop - yOffset;

                // Use one coordinate space for all horizontal bounds checks.
                const boundaryLeft = element.scrollLeft;
                const boundaryWidth = containerWidth / zoomX;
                const relativeX = x - boundaryLeft;

                const shouldShowBottom =
                    pseudoHeight > childrenTop - 25 ||
                    alignment === PopupAlignment.BottomLeft ||
                    alignment === PopupAlignment.BottomRight ||
                    alignment === PopupAlignment.BottomCenter;

                const shouldForceRight = shouldShowBottom
                    ? alignment === PopupAlignment.BottomRight
                    : alignment === PopupAlignment.TopRight;

                const shouldUseCenterAlignment = shouldShowBottom
                    ? alignment === PopupAlignment.BottomCenter
                    : alignment === PopupAlignment.TopCenter;

                const hasEnoughSpaceForCenter =
                    pseudoWidth / 2 <= relativeX - HORIZONTAL_PADDING &&
                    pseudoWidth / 2 <= boundaryWidth - relativeX - HORIZONTAL_PADDING;

                if (shouldUseCenterAlignment && hasEnoughSpaceForCenter) {
                    setInternalAlignment(
                        shouldShowBottom ? PopupAlignment.BottomCenter : PopupAlignment.TopCenter,
                    );
                    setOffset(0);
                    setCoordinates({
                        x,
                        y,
                    });
                } else {
                    let isRight = false;

                    if (pseudoWidth > relativeX - HORIZONTAL_PADDING || shouldForceRight) {
                        setInternalAlignment(
                            shouldShowBottom ? PopupAlignment.BottomRight : PopupAlignment.TopRight,
                        );
                        isRight = true;
                    } else {
                        setInternalAlignment(
                            shouldShowBottom ? PopupAlignment.BottomLeft : PopupAlignment.TopLeft,
                        );
                    }

                    let newOffset;

                    if (isRight) {
                        newOffset =
                            relativeX + pseudoWidth >= boundaryWidth - HORIZONTAL_PADDING
                                ? relativeX + pseudoWidth - (boundaryWidth - HORIZONTAL_PADDING)
                                : 0;
                    } else {
                        const right = boundaryWidth - relativeX;

                        newOffset =
                            right + pseudoWidth >= boundaryWidth + HORIZONTAL_PADDING
                                ? right + pseudoWidth - (boundaryWidth + HORIZONTAL_PADDING)
                                : 0;
                    }

                    setOffset(newOffset);

                    const newX = x - newOffset;

                    setCoordinates({
                        x: newX,
                        y,
                    });
                }
            }
        }, [alignment, newContainer, pseudoSize, shouldScrollWithContent, yOffset]);

        const handleShow = useCallback(() => {
            updatePopupPosition();

            if (isControlled) {
                return;
            }

            setIsInternallyOpen(true);
        }, [isControlled, updatePopupPosition]);

        useEffect(() => {
            if (isControlled) {
                if (isOpen) {
                    updatePopupPosition();
                }

                return;
            }

            if (shouldBeOpen) {
                handleShow();
            }
        }, [handleShow, isControlled, isOpen, shouldBeOpen, updatePopupPosition]);

        const handleReposition = useCallback(() => {
            if (isPopupOpen) {
                updatePopupPosition();
            }
        }, [isPopupOpen, updatePopupPosition]);

        useEffect(() => {
            if (!isPopupOpen) {
                return;
            }

            window.addEventListener('resize', handleReposition);
            window.addEventListener('scroll', handleReposition, true);

            return () => {
                window.removeEventListener('resize', handleReposition);
                window.removeEventListener('scroll', handleReposition, true);
            };
        }, [handleReposition, isPopupOpen]);

        useEffect(() => {
            if (!newContainer || !popupRef.current) return;

            const viewHeight = newContainer.clientHeight;
            const childrenHeight = popupRef.current.getBoundingClientRect().height;

            if (
                [
                    PopupAlignment.TopLeft,
                    PopupAlignment.TopRight,
                    PopupAlignment.TopCenter,
                ].includes(internalAlignment)
            ) {
                setContentMaxHeight(coordinates.y - 20);
            } else {
                setContentMaxHeight(viewHeight - childrenHeight - coordinates.y - 20);
            }
        }, [coordinates.y, internalAlignment, newContainer]);

        const handleChildrenClick = () => {
            if (isControlled) {
                return;
            }

            handleShow();
        };

        const handleHide = useCallback(() => {
            if (isControlled) {
                return;
            }

            setIsInternallyOpen(false);
        }, [isControlled]);

        const handleMouseEnter = useCallback(() => {
            if (isControlled) {
                return;
            }

            if (shouldShowOnHover) {
                window.clearTimeout(timeout.current);
                handleShow();
            }
        }, [handleShow, isControlled, shouldShowOnHover]);

        const handleMouseLeave = useCallback(() => {
            if (isControlled) {
                return;
            }

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
        }, [handleHide, isControlled, shouldHideOnChildrenLeave, shouldShowOnHover]);

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
            if (!isPopupOpen) {
                return undefined;
            }

            if (!isControlled && !shouldBeOpen) {
                document.addEventListener('click', handleDocumentClick, true);
                window.addEventListener('blur', handleHide);
            }

            return () => {
                document.removeEventListener('click', handleDocumentClick, true);
                window.removeEventListener('blur', handleHide);
            };
        }, [handleDocumentClick, handleHide, isControlled, isPopupOpen, shouldBeOpen]);

        useEffect(() => {
            if (previousIsVisibleRef.current === isPopupOpen) {
                return;
            }

            previousIsVisibleRef.current = isPopupOpen;

            if (isPopupOpen) {
                onShow?.();

                return;
            }

            onHide?.();
        }, [isPopupOpen, onHide, onShow]);

        useEffect(() => {
            if (!newContainer) {
                return;
            }

            setPortal(() =>
                createPortal(
                    <AnimatePresence initial={false}>
                        {isPopupOpen && (
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
            isPopupOpen,
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
