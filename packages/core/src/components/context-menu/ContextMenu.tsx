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
import { getActiveItemIndex, getDefaultFocusedIndex, selectItem } from './ContextMenu.utils';
import { useKeyboardFocusHighlighting } from '../../hooks/useKeyboardFocusHighlighting';
import { useFocusRingPortal } from '../../hooks/useFocusRingPortal';

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
            shouldEnableKeyboardHighlighting,
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
        const contextMenuFocusRingRef = useRef<HTMLElement | null>(null);
        const shouldSkipNextContextMenuOpenRef = useRef(false);
        const shouldPreventNextNativeContextMenuRef = useRef(false);

        const isTouch = useIsTouch();
        const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
            shouldEnableKeyboardHighlighting && !shouldDisableClick,
        );
        const shouldShowWrapperKeyboardHighlighting =
            shouldShowKeyboardHighlighting && shouldUseFocusableWrapper;
        const shouldUseKeyboardFocusableWrapper = shouldUseFocusableWrapper && !shouldDisableClick;
        useFocusRingPortal(contextMenuRef, {
            isEnabled: shouldShowWrapperKeyboardHighlighting,
            overlayRef: contextMenuFocusRingRef,
            shape: shouldUseDefaultTriggerStyles ? 'circle' : 'rectangle',
            padding: shouldUseDefaultTriggerStyles ? 4 : 0,
        });

        useEffect(() => {
            contextMenuFocusRingRef.current =
                contextMenuRef.current?.firstElementChild instanceof HTMLElement
                    ? contextMenuRef.current.firstElementChild
                    : contextMenuRef.current;
        }, [children]);

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

        const handleContainerBlur = useCallback(
            (event: React.FocusEvent<HTMLSpanElement>) => {
                const nextFocusedElement = event.relatedTarget as Node | null;
                const currentContainer = event.currentTarget as HTMLElement;

                if (
                    !nextFocusedElement ||
                    (!currentContainer.contains(nextFocusedElement) &&
                        !contextMenuContentRef.current?.contains(nextFocusedElement))
                ) {
                    handleHide();
                }
            },
            [handleHide],
        );

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

                const isActivationKey =
                    event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar';

                if (isContentShown && event.key === 'Escape') {
                    event.preventDefault();
                    event.stopPropagation();
                    handleHide();
                    return;
                }

                if (isContentShown && !isHovered && event.key === 'ArrowDown') {
                    event.preventDefault();
                    event.stopPropagation();
                    setFocusedIndex((prev) => (prev >= items.length - 1 ? 0 : prev + 1));
                    return;
                }

                if (isContentShown && !isHovered && event.key === 'ArrowUp') {
                    event.preventDefault();
                    event.stopPropagation();
                    setFocusedIndex((prev) => (prev <= 0 ? items.length - 1 : prev - 1));
                    return;
                }

                if (isContentShown && isActivationKey) {
                    if (
                        selectItem({
                            index: getActiveItemIndex({
                                contextMenuContentElement: contextMenuContentRef.current,
                                focusedIndex,
                            }),
                            items,
                            onClose: handleHide,
                            shouldCloseOnPopupClick,
                        })
                    ) {
                        event.preventDefault();
                        event.stopPropagation();
                    }

                    return;
                }

                if (event.currentTarget !== event.target) {
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

                if (shouldUseFocusableWrapper && isActivationKey) {
                    event.preventDefault();
                    event.stopPropagation();
                    void handleShow();
                }
            },
            [
                focusedIndex,
                handleHide,
                handleShow,
                isHovered,
                isContentShown,
                items,
                items.length,
                shouldCloseOnPopupClick,
                shouldDisableClick,
                shouldUseFocusableWrapper,
            ],
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
                                onItemFocus={setFocusedIndex}
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
                    onBlur={handleContainerBlur}
                    ref={contextMenuRef}
                    tabIndex={shouldUseKeyboardFocusableWrapper ? 0 : undefined}
                    role={shouldUseKeyboardFocusableWrapper ? 'button' : undefined}
                    aria-haspopup={shouldUseKeyboardFocusableWrapper ? 'menu' : undefined}
                    aria-expanded={shouldUseKeyboardFocusableWrapper ? isContentShown : undefined}
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
