import { createDialog, DialogType } from 'chayns-api';
import { AnimatePresence } from 'motion/react';
import React, {
    forwardRef,
    isValidElement,
    MouseEventHandler,
    ReactPortal,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useUuid } from '../../hooks/uuid';
import { useIsTouch } from '../../utils/environment';
import Icon from '../icon/Icon';
import ContextMenuContent from './context-menu-content/ContextMenuContent';
import { StyledContextMenu } from './ContextMenu.styles';
import {
    ContextMenuAlignment,
    type ContextMenuCoordinates,
    type ContextMenuProps,
    type ContextMenuRef,
} from './ContextMenu.types';
import { SelectDialogResult } from '../../types/general';

const ContextMenu = forwardRef<ContextMenuRef, ContextMenuProps>(
    (
        {
            alignment,
            children = <Icon icons={['ts-ellipsis_v']} size={18} />,
            container,
            coordinates,
            shouldHidePopupArrow = false,
            items,
            headline,
            onHide,
            shouldDisableClick = false,
            onShow,
            shouldCloseOnPopupClick = true,
            shouldShowHoverEffect = false,
            zIndex = 20,
        },
        ref,
    ) => {
        const [internalCoordinates, setInternalCoordinates] = useState<ContextMenuCoordinates>({
            x: 0,
            y: 0,
        });
        const [newContainer, setNewContainer] = useState<Element | null>(container ?? null);
        const [focusedIndex, setFocusedIndex] = useState<number>(0);

        const [internalAlignment, setInternalAlignment] = useState<ContextMenuAlignment>(
            ContextMenuAlignment.TopLeft,
        );

        const [isContentShown, setIsContentShown] = useState(false);
        const [portal, setPortal] = useState<ReactPortal>();

        const uuid = useUuid();

        const contextMenuContentRef = useRef<HTMLDivElement>(null);
        const contextMenuRef = useRef<HTMLSpanElement>(null);

        const isTouch = useIsTouch();

        useEffect(() => {
            if (isContentShown) {
                setFocusedIndex(0);
            }
        }, [isContentShown]);

        useEffect(() => {
            if (contextMenuRef.current && !container) {
                const el = contextMenuRef.current as HTMLElement;

                const element = el.closest('.dialog-inner, .page-provider, .tapp, body');

                setNewContainer(element);
            }
        }, [container]);

        useEffect(() => {
            if (container instanceof Element) {
                setNewContainer(container);
            }
        }, [container]);

        const handleHide = useCallback(() => {
            setIsContentShown(false);
        }, []);

        useEffect(() => {
            if (!isContentShown) return () => {};

            const handleKey = (e: KeyboardEvent) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setFocusedIndex((prev) => Math.min(prev + 1, items.length - 1));
                }

                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setFocusedIndex((prev) => Math.max(prev - 1, 0));
                }

                if (e.key === 'Enter') {
                    e.preventDefault();
                    const item = items[focusedIndex];
                    if (item) {
                        void item.onClick();

                        if (shouldCloseOnPopupClick) {
                            handleHide();
                        }
                    }
                }

                if (e.key === 'Escape') {
                    handleHide();
                }
            };

            document.addEventListener('keydown', handleKey);

            return () => document.removeEventListener('keydown', handleKey);
        }, [isContentShown, items, focusedIndex, handleHide, shouldCloseOnPopupClick]);

        const handleShow = useCallback(async () => {
            if (isTouch) {
                const { result } = (await createDialog({
                    type: DialogType.SELECT,
                    buttons: [],
                    list: items.map(({ icons, text, isSelected }, index) => ({
                        name: text,
                        id: index,
                        isSelected,
                        icon: isValidElement(icons) ? undefined : (icons as string)[0],
                    })),
                }).open()) as SelectDialogResult;

                if (result && typeof result[0] === 'number') {
                    void items[result[0]]?.onClick();
                }
            } else if (contextMenuRef.current) {
                if (!newContainer) {
                    return;
                }

                const {
                    height: childrenHeight,
                    left: childrenLeft,
                    top: childrenTop,
                    width: childrenWidth,
                } = contextMenuRef.current.getBoundingClientRect();

                const { height, width, top, left } = newContainer.getBoundingClientRect();

                const zoomX = width / (newContainer as HTMLElement).offsetWidth;
                const zoomY = height / (newContainer as HTMLElement).offsetHeight;

                const x =
                    (childrenLeft + childrenWidth / 2 - left) / zoomX + newContainer.scrollLeft;
                const y = (childrenTop + childrenHeight / 2 - top) / zoomY + newContainer.scrollTop;

                setInternalCoordinates({ x, y });

                if (x < width / 2) {
                    if (y < height / 2) {
                        setInternalAlignment(ContextMenuAlignment.BottomRight);
                    } else {
                        setInternalAlignment(ContextMenuAlignment.TopRight);
                    }
                } else if (y < height / 2) {
                    setInternalAlignment(ContextMenuAlignment.BottomLeft);
                } else {
                    setInternalAlignment(ContextMenuAlignment.TopLeft);
                }

                setIsContentShown(true);
            }
        }, [isTouch, items, newContainer]);

        const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
            (event) => {
                if (shouldDisableClick) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();

                void handleShow();
            },
            [handleShow, shouldDisableClick],
        );

        const handleDocumentClick = useCallback<EventListener>(
            (event) => {
                if (
                    !shouldCloseOnPopupClick &&
                    contextMenuContentRef.current?.contains(event.target as Node)
                ) {
                    return;
                }

                handleHide();
            },
            [handleHide, shouldCloseOnPopupClick],
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
            if (isContentShown) {
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
        }, [handleDocumentClick, handleHide, isContentShown, onHide, onShow]);

        useEffect(() => {
            if (!newContainer) {
                return;
            }

            setPortal(() =>
                createPortal(
                    <AnimatePresence initial={false}>
                        {isContentShown && (
                            <ContextMenuContent
                                coordinates={coordinates ?? internalCoordinates}
                                items={items}
                                zIndex={zIndex}
                                headline={headline}
                                shouldHidePopupArrow={shouldHidePopupArrow}
                                key={`contextMenu_${uuid}`}
                                alignment={alignment ?? internalAlignment}
                                ref={contextMenuContentRef}
                                focusedIndex={focusedIndex}
                                onKeySelect={(index) => {
                                    const item = items[index];
                                    if (item) {
                                        void item.onClick();
                                        handleHide();
                                    }
                                }}
                            />
                        )}
                    </AnimatePresence>,
                    newContainer,
                ),
            );
        }, [
            alignment,
            newContainer,
            coordinates,
            internalAlignment,
            internalCoordinates,
            isContentShown,
            items,
            uuid,
            zIndex,
            shouldHidePopupArrow,
            headline,
            focusedIndex,
            handleHide,
        ]);

        return (
            <>
                <StyledContextMenu
                    className="beta-chayns-context-menu"
                    $isActive={isContentShown && shouldShowHoverEffect}
                    $shouldAddHoverEffect={!isTouch && shouldShowHoverEffect}
                    onClick={handleClick}
                    ref={contextMenuRef}
                >
                    {children}
                </StyledContextMenu>
                {portal}
            </>
        );
    },
);

ContextMenu.displayName = 'ContextMenu';

export default ContextMenu;
