import { createDialog, DialogType } from 'chayns-api';
import { AnimatePresence } from 'motion/react';
import React, {
    forwardRef,
    isValidElement,
    KeyboardEventHandler,
    MouseEvent,
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
import { getDefaultFocusedIndex } from './ContextMenu.utils';
import { useKeyboardFocusHighlighting } from '../../hooks/useKeyboardFocusHighlighting';

const ContextMenu = forwardRef<ContextMenuRef, ContextMenuProps>(
    (
        {
            alignment,
            className,
            children = <Icon icons={['ts-ellipsis_v']} size={18} />,
            container,
            coordinates,
            headline,
            items,
            onHide,
            onShow,
            shouldCloseOnPopupClick = true,
            shouldDisableClick = false,
            shouldHidePopupArrow = false,
            shouldShowHoverEffect = false,
            shouldEnableKeyboardHighlighting = false,
            shouldUseDefaultTriggerStyles = true,
            style,
            yOffset = 0,
            zIndex = 20,
        },
        ref,
    ) => {
        const [internalCoordinates, setInternalCoordinates] = useState<ContextMenuCoordinates>({
            x: 0,
            y: 0,
        });

        const [internalAlignment, setInternalAlignment] = useState<ContextMenuAlignment>(
            ContextMenuAlignment.TopLeft,
        );

        const [newContainer, setNewContainer] = useState(container ?? null);
        const [focusedIndex, setFocusedIndex] = useState(getDefaultFocusedIndex(items));
        const [isContentShown, setIsContentShown] = useState(false);
        const [portal, setPortal] = useState<ReactPortal>();
        const [isHovered, setIsHovered] = useState(false);
        const [shouldUseFocusableWrapper, setShouldUseFocusableWrapper] = useState(false);

        const uuid = useUuid();

        const contextMenuContentRef = useRef<HTMLDivElement>(null);
        const contextMenuRef = useRef<HTMLSpanElement>(null);
        const shouldSkipNextContextMenuOpenRef = useRef(false);
        const shouldPreventNextNativeContextMenuRef = useRef(false);

        const isTouch = useIsTouch();
        const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
            shouldEnableKeyboardHighlighting && !shouldDisableClick,
        );
        const shouldShowWrapperKeyboardHighlighting =
            shouldShowKeyboardHighlighting && shouldUseFocusableWrapper;

        useEffect(() => {
            if (isContentShown) {
                setFocusedIndex(getDefaultFocusedIndex(items));
            }
        }, [isContentShown, items]);

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
                if (items.length === 0 || isHovered) return;

                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setFocusedIndex((prev) => (prev >= items.length - 1 ? 0 : prev + 1));
                }

                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setFocusedIndex((prev) => (prev <= 0 ? items.length - 1 : prev - 1));
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
        }, [isContentShown, items, focusedIndex, handleHide, shouldCloseOnPopupClick, isHovered]);

        const handleShow = useCallback(async () => {
            if (isTouch) {
                const { result } = (await createDialog({
                    type: DialogType.SELECT,
                    buttons: [],
                    list: items.map(({ icons, text, isSelected }, index) => ({
                        name: text,
                        id: index,
                        isSelected,
                        icon: isValidElement(icons)
                            ? undefined
                            : (icons as string[] | undefined)?.[0],
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
                const y =
                    (childrenTop + childrenHeight / 2 - top) / zoomY +
                    newContainer.scrollTop -
                    yOffset;

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
        }, [isTouch, items, newContainer, yOffset]);

        const handleClick = useCallback<MouseEventHandler<HTMLSpanElement>>(
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

        const handleKeyDown = useCallback<KeyboardEventHandler<HTMLSpanElement>>(
            (event) => {
                if (shouldDisableClick) {
                    return;
                }

                const isContextMenuShortcut =
                    event.key === 'ContextMenu' || (event.key === 'F10' && event.shiftKey);

                if (isContextMenuShortcut) {
                    event.preventDefault();
                    event.stopPropagation();
                    shouldSkipNextContextMenuOpenRef.current = true;
                    void handleShow();
                    return;
                }

                if (shouldUseFocusableWrapper && event.key === 'Enter') {
                    event.preventDefault();
                    event.stopPropagation();
                    void handleShow();
                }
            },
            [handleShow, shouldDisableClick, shouldUseFocusableWrapper],
        );

        const handleContextMenu = useCallback(
            (event: MouseEvent<HTMLSpanElement>) => {
                event.preventDefault();
                event.stopPropagation();

                if (shouldDisableClick) {
                    return;
                }

                if (shouldSkipNextContextMenuOpenRef.current) {
                    shouldSkipNextContextMenuOpenRef.current = false;
                    return;
                }

                void handleShow();
            },
            [handleShow, shouldDisableClick],
        );

        useEffect(() => {
            const handleGlobalKeyDown = (event: KeyboardEvent) => {
                if (shouldDisableClick || !contextMenuRef.current) {
                    return;
                }

                const isContextMenuShortcut =
                    event.key === 'ContextMenu' || (event.key === 'F10' && event.shiftKey);

                if (!isContextMenuShortcut) {
                    return;
                }

                const { activeElement } = document;

                if (
                    !(activeElement instanceof HTMLElement) ||
                    activeElement === document.body ||
                    activeElement === document.documentElement
                ) {
                    return;
                }

                const shouldOpenFromFocusedParent =
                    activeElement.contains(contextMenuRef.current) &&
                    !contextMenuRef.current.contains(activeElement);

                if (!shouldOpenFromFocusedParent) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                shouldPreventNextNativeContextMenuRef.current = true;
                void handleShow();
            };

            const handleNativeContextMenuCapture = (event: Event) => {
                if (!shouldPreventNextNativeContextMenuRef.current) {
                    return;
                }

                shouldPreventNextNativeContextMenuRef.current = false;
                event.preventDefault();
                event.stopPropagation();
            };

            document.addEventListener('keydown', handleGlobalKeyDown, true);
            document.addEventListener('contextmenu', handleNativeContextMenuCapture, true);

            return () => {
                document.removeEventListener('keydown', handleGlobalKeyDown, true);
                document.removeEventListener('contextmenu', handleNativeContextMenuCapture, true);
            };
        }, [handleShow, shouldDisableClick]);

        useImperativeHandle(
            ref,
            () => ({
                hide: handleHide,
                show: handleShow,
            }),
            [handleHide, handleShow],
        );

        useEffect(() => {
            const handleDocumentClick = (event: PointerEvent) => {
                if (
                    !shouldCloseOnPopupClick &&
                    contextMenuContentRef.current?.contains(event.target as Node)
                ) {
                    return;
                }

                handleHide();
            };

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
        }, [handleHide, isContentShown, onHide, onShow, shouldCloseOnPopupClick]);

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
                                onMouseEnter={() => {
                                    setIsHovered(true);
                                    setFocusedIndex(-1);
                                }}
                                onMouseLeave={() => {
                                    setIsHovered(false);
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

        useEffect(() => {
            if (!contextMenuRef.current) {
                return;
            }

            const focusableChildSelector =
                'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

            const hasFocusableChild = Boolean(
                contextMenuRef.current.querySelector(focusableChildSelector),
            );

            setShouldUseFocusableWrapper(!hasFocusableChild);
        }, [children]);

        return (
            <>
                <StyledContextMenu
                    className={
                        className
                            ? `beta-chayns-context-menu ${className}`
                            : 'beta-chayns-context-menu'
                    }
                    $isActive={isContentShown && shouldShowHoverEffect}
                    $shouldAddHoverEffect={!isTouch && shouldShowHoverEffect}
                    $shouldShowWrapperKeyboardHighlighting={shouldShowWrapperKeyboardHighlighting}
                    $shouldUseDefaultTriggerStyles={shouldUseDefaultTriggerStyles}
                    onClick={handleClick}
                    onContextMenuCapture={handleContextMenu}
                    onContextMenu={handleContextMenu}
                    onKeyDown={handleKeyDown}
                    ref={contextMenuRef}
                    tabIndex={shouldUseFocusableWrapper ? 0 : undefined}
                    role={shouldUseFocusableWrapper ? 'button' : undefined}
                    aria-haspopup={shouldUseFocusableWrapper ? 'menu' : undefined}
                    aria-expanded={shouldUseFocusableWrapper ? isContentShown : undefined}
                    style={style}
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
