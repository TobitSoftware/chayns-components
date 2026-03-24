import { AnimatePresence } from 'motion/react';
import React, {
    FC,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    PointerEvent,
    TouchList,
    TouchEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { MentionFinderPopupAlignment } from '../../constants/mentionFinder';
import MentionFinderItem from './mention-finder-item/MentionFinderItem';
import {
    StyledMentionFinder,
    StyledMentionFinderDragHandle,
    StyledMentionFinderDragHandleInner,
    StyledMentionFinderItemList,
    StyledMentionFinderOverlay,
    StyledMotionMentionFinderPopup,
} from './MentionFinder.styles';

export type MentionMember = {
    id: string;
    info?: string;
    imageUrl: string;
    name: string;
    shouldShowRoundImage?: boolean;
};

export type MentionFinderProps = {
    /**
     * The text from the input field
     */
    inputValue: string;
    /**
     * Members that can be selected
     */
    members: MentionMember[];
    /**
     * Function to be executed when a member is selected
     */
    onSelect: ({ fullMatch, member }: { fullMatch: string; member: MentionMember }) => void;
    /**
     * Alignment of the popup
     */
    popupAlignment: MentionFinderPopupAlignment;
    /**
     * Enables the optional drag handle inside the popup
     */
    enableDragHandle?: boolean;
    /**
     * Threshold in pixels to drag to close the popup
     */
    dragCloseThresholdInPx?: number;
    /**
     * Selector for the container to render the overlay into (defaults to closest dialog, thread, page provider or tapp)
     */
    overlayContainerSelector?: string;
};

const DRAG_CLOSE_THRESHOLD_IN_PX = 60;

const findTouchByIdentifier = (touchList: TouchList, identifier: number | null) => {
    if (identifier === null) {
        return null;
    }

    for (let i = 0; i < touchList.length; i += 1) {
        const touch = touchList.item(i);
        if (touch && touch.identifier === identifier) {
            return touch;
        }
    }

    return null;
};

const MentionFinder: FC<MentionFinderProps> = ({
    inputValue,
    members,
    onSelect,
    popupAlignment,
    enableDragHandle = false,
    dragCloseThresholdInPx = DRAG_CLOSE_THRESHOLD_IN_PX,
    overlayContainerSelector,
}) => {
    const [activeMemberId, setActiveMemberId] = useState(members[0]?.id);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [closedInputValue, setClosedInputValue] = useState<string | null>(null);

    const listRef = useRef<HTMLDivElement>(null);
    const dragStartYRef = useRef<number | null>(null);
    const hasTriggeredDragCloseRef = useRef(false);
    const activePointerIdRef = useRef<number | null>(null);
    const activeTouchIdRef = useRef<number | null>(null);

    const [dragState, setDragState] = useState({
        inputValue,
        isDragging: false,
        offset: 0,
        progress: 0,
    });
    const [popupElement, setPopupElement] = useState<HTMLDivElement | null>(null);

    const [fullMatch, searchString] = useMemo(() => {
        // eslint-disable-next-line no-irregular-whitespace
        const regExpMatchArray = inputValue.match(/@(?!\s)([^\s​]*)/);

        return [regExpMatchArray?.[0], regExpMatchArray?.[1]?.toLowerCase() ?? ''];
    }, [inputValue]);

    const filteredMembers = useMemo(
        () =>
            searchString !== ''
                ? members.filter(
                      ({ id, info, name }) =>
                          id.toLowerCase().includes(searchString) ||
                          info?.replace('chayns', '').toLowerCase().includes(searchString) ||
                          name.toLowerCase().includes(searchString),
                  )
                : members,
        [members, searchString],
    );

    const activeMember = useMemo(
        () =>
            filteredMembers.find(({ id }) => id === activeMemberId) ??
            filteredMembers[focusedIndex] ??
            filteredMembers[0],
        [activeMemberId, filteredMembers, focusedIndex],
    );

    const handleMemberClick = useCallback(
        (member: MentionMember) => {
            if (fullMatch) {
                onSelect({ fullMatch, member });
            }
        },
        [fullMatch, onSelect],
    );

    const handleMemberHover = useCallback((member: MentionMember) => {
        setActiveMemberId(member.id);
    }, []);

    const items = useMemo(
        () =>
            filteredMembers.map((member) => (
                <MentionFinderItem
                    isActive={member.id === activeMember?.id}
                    key={member.id}
                    member={member}
                    onClick={handleMemberClick}
                    onHover={handleMemberHover}
                />
            )),
        [activeMember, filteredMembers, handleMemberClick, handleMemberHover],
    );

    const shouldRenderPopup = Boolean(
        fullMatch && items.length > 0 && closedInputValue !== inputValue,
    );
    const isDraggingHandle = dragState.inputValue === inputValue && dragState.isDragging;
    const dragOffset = dragState.inputValue === inputValue ? dragState.offset : 0;
    const dragProgress = dragState.inputValue === inputValue ? dragState.progress : 0;

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && shouldRenderPopup) {
                event.preventDefault();

                const children = listRef.current?.children;

                if (children && children.length > 0) {
                    const newIndex =
                        focusedIndex !== null
                            ? (focusedIndex +
                                  (event.key === 'ArrowUp' ? -1 : 1) +
                                  children.length) %
                              children.length
                            : 0;

                    if (focusedIndex !== null) {
                        const prevElement = children[focusedIndex] as HTMLDivElement;
                        prevElement.tabIndex = -1;
                    }

                    setFocusedIndex(newIndex);

                    const member = filteredMembers[newIndex];

                    setActiveMemberId(member?.id);

                    const newElement = children[newIndex] as HTMLDivElement;
                    newElement.tabIndex = 0;
                    newElement.focus();
                }
            } else if (event.key === 'Enter' && shouldRenderPopup) {
                event.preventDefault();
                event.stopPropagation();

                if (fullMatch && activeMember) {
                    onSelect({ fullMatch, member: activeMember });
                }
            }
        },
        [activeMember, filteredMembers, focusedIndex, fullMatch, onSelect, shouldRenderPopup],
    );

    useEffect(() => {
        if (shouldRenderPopup) {
            window.addEventListener('keydown', handleKeyDown, true);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown, true);
        };
    }, [handleKeyDown, shouldRenderPopup]);

    const closePopupViaDrag = useCallback(() => {
        if (hasTriggeredDragCloseRef.current) {
            return;
        }
        hasTriggeredDragCloseRef.current = true;
        setClosedInputValue(inputValue);
        setDragState((state) =>
            state.inputValue === inputValue
                ? {
                      ...state,
                      isDragging: false,
                      offset: 0,
                      progress: 0,
                  }
                : state,
        );
    }, [inputValue]);

    const handleOverlayClick = useCallback(() => {
        closePopupViaDrag();
    }, [closePopupViaDrag]);

    const updateDragByClientY = useCallback(
        (clientY: number) => {
            if (dragStartYRef.current === null) {
                return false;
            }

            const closingDirectionMultiplier =
                popupAlignment === MentionFinderPopupAlignment.Bottom ? -1 : 1;
            const rawDelta = clientY - dragStartYRef.current;
            const normalizedDelta = rawDelta * closingDirectionMultiplier;
            const positiveDelta = Math.max(0, normalizedDelta);
            const limitedDelta = Math.min(positiveDelta, dragCloseThresholdInPx);

            setDragState((state) =>
                state.inputValue === inputValue
                    ? {
                          ...state,
                          isDragging: true,
                          offset: limitedDelta * closingDirectionMultiplier,
                          progress: Math.min(positiveDelta / dragCloseThresholdInPx, 1),
                      }
                    : state,
            );

            if (positiveDelta >= dragCloseThresholdInPx) {
                dragStartYRef.current = null;
                closePopupViaDrag();
                return true;
            }

            return false;
        },
        [closePopupViaDrag, dragCloseThresholdInPx, inputValue, popupAlignment],
    );

    const handleDragPointerDown = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (event.pointerType === 'touch') {
                return;
            }
            if (event.pointerType === 'mouse' && event.button !== 0) {
                return;
            }
            if (dragStartYRef.current !== null) {
                return;
            }
            activePointerIdRef.current = event.pointerId;
            dragStartYRef.current = event.clientY;
            hasTriggeredDragCloseRef.current = false;
            setDragState({
                inputValue,
                isDragging: true,
                offset: 0,
                progress: 0,
            });
            event.currentTarget.setPointerCapture(event.pointerId);
            event.stopPropagation();
        },
        [inputValue],
    );

    const handleDragPointerMove = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (event.pointerType === 'touch' || activePointerIdRef.current !== event.pointerId) {
                return;
            }
            if (dragStartYRef.current === null) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            const hasClosed = updateDragByClientY(event.clientY);

            if (hasClosed) {
                event.currentTarget.releasePointerCapture(event.pointerId);
                activePointerIdRef.current = null;
            }
        },
        [updateDragByClientY],
    );

    const resetDragState = useCallback(
        (shouldClose = false) => {
            dragStartYRef.current = null;
            if (shouldClose) {
                closePopupViaDrag();
            } else {
                setDragState((state) =>
                    state.inputValue === inputValue
                        ? {
                              ...state,
                              isDragging: false,
                              offset: 0,
                              progress: 0,
                          }
                        : state,
                );
            }
        },
        [closePopupViaDrag, inputValue],
    );

    const handleDragPointerUp = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (event.pointerType === 'touch' || activePointerIdRef.current !== event.pointerId) {
                return;
            }
            event.stopPropagation();
            const shouldClose = dragProgress >= 1;
            resetDragState(shouldClose);
            event.currentTarget.releasePointerCapture(event.pointerId);
            activePointerIdRef.current = null;
        },
        [dragProgress, resetDragState],
    );

    const handleDragPointerCancel = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (event.pointerType === 'touch' || activePointerIdRef.current !== event.pointerId) {
                return;
            }
            event.stopPropagation();
            resetDragState();
            event.currentTarget.releasePointerCapture(event.pointerId);
            activePointerIdRef.current = null;
        },
        [resetDragState],
    );

    const handleDragTouchStart = useCallback(
        (event: TouchEvent<HTMLDivElement>) => {
            if (event.touches.length === 0 || dragStartYRef.current !== null) {
                return;
            }

            const touch = event.touches[0];

            if (!touch) return;

            activeTouchIdRef.current = touch.identifier;
            dragStartYRef.current = touch.clientY;
            hasTriggeredDragCloseRef.current = false;
            setDragState({
                inputValue,
                isDragging: true,
                offset: 0,
                progress: 0,
            });
            event.preventDefault();
            event.stopPropagation();
        },
        [inputValue],
    );

    const handleDragTouchMove = useCallback(
        (event: TouchEvent<HTMLDivElement>) => {
            if (dragStartYRef.current === null || activeTouchIdRef.current === null) {
                return;
            }
            const touch =
                findTouchByIdentifier(event.changedTouches, activeTouchIdRef.current) ??
                findTouchByIdentifier(event.touches, activeTouchIdRef.current);

            if (!touch) return;

            event.preventDefault();
            event.stopPropagation();
            const hasClosed = updateDragByClientY(touch.clientY);
            if (hasClosed) {
                activeTouchIdRef.current = null;
            }
        },
        [updateDragByClientY],
    );

    const handleDragTouchEnd = useCallback(
        (event: TouchEvent<HTMLDivElement>) => {
            if (activeTouchIdRef.current === null) return;

            const touch = findTouchByIdentifier(event.changedTouches, activeTouchIdRef.current);

            if (!touch) return;

            event.preventDefault();
            event.stopPropagation();
            activeTouchIdRef.current = null;
            const shouldClose = dragProgress >= 1;
            resetDragState(shouldClose);
        },
        [dragProgress, resetDragState],
    );

    const handleDragTouchCancel = useCallback(
        (event: TouchEvent<HTMLDivElement>) => {
            if (activeTouchIdRef.current === null) return;

            const touch = findTouchByIdentifier(event.changedTouches, activeTouchIdRef.current);

            if (!touch) return;

            event.preventDefault();
            event.stopPropagation();
            activeTouchIdRef.current = null;
            resetDragState();
        },
        [resetDragState],
    );

    const dragHandle = useMemo(() => {
        if (!enableDragHandle) {
            return null;
        }

        return (
            <StyledMentionFinderDragHandle $alignment={popupAlignment}>
                <StyledMentionFinderDragHandleInner
                    $alignment={popupAlignment}
                    $dragOffset={dragOffset}
                    $dragProgress={dragProgress}
                    $isDragging={isDraggingHandle}
                    onPointerDown={handleDragPointerDown}
                    onPointerMove={handleDragPointerMove}
                    onPointerUp={handleDragPointerUp}
                    onPointerCancel={handleDragPointerCancel}
                    onTouchStart={handleDragTouchStart}
                    onTouchMove={handleDragTouchMove}
                    onTouchEnd={handleDragTouchEnd}
                    onTouchCancel={handleDragTouchCancel}
                />
            </StyledMentionFinderDragHandle>
        );
    }, [
        enableDragHandle,
        popupAlignment,
        dragOffset,
        dragProgress,
        isDraggingHandle,
        handleDragPointerDown,
        handleDragPointerMove,
        handleDragPointerUp,
        handleDragPointerCancel,
        handleDragTouchStart,
        handleDragTouchMove,
        handleDragTouchEnd,
        handleDragTouchCancel,
    ]);

    const overlayContainer = useMemo(() => {
        if (!enableDragHandle || !shouldRenderPopup || typeof document === 'undefined') {
            return null;
        }

        return (
            popupElement?.closest(
                overlayContainerSelector ?? '.dialog-inner, .chayns-threads, .page-provider, .tapp',
            ) ?? document.body
        );
    }, [enableDragHandle, overlayContainerSelector, popupElement, shouldRenderPopup]);

    const overlayPortal =
        overlayContainer && enableDragHandle
            ? createPortal(
                  <AnimatePresence initial={false}>
                      {shouldRenderPopup && (
                          <StyledMentionFinderOverlay
                              key="mention-finder-overlay"
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              initial={{ opacity: 0 }}
                              onClick={handleOverlayClick}
                          />
                      )}
                  </AnimatePresence>,
                  overlayContainer,
              )
            : null;

    return (
        <>
            {overlayPortal}
            <StyledMentionFinder className="beta-chayns-mention-finder">
                <AnimatePresence initial={false}>
                    {shouldRenderPopup && (
                        <StyledMotionMentionFinderPopup
                            ref={(node) => {
                                setPopupElement(node);
                            }}
                            animate={{
                                height: 'auto',
                                opacity: 1,
                                y: dragOffset,
                            }}
                            className="prevent-lose-focus"
                            exit={{ height: 0, opacity: 0 }}
                            initial={{ height: 0, opacity: 0 }}
                            $popupAlignment={popupAlignment}
                            $isDragging={enableDragHandle}
                            transition={{ duration: 0.15 }}
                            tabIndex={0}
                        >
                            {enableDragHandle &&
                                popupAlignment === MentionFinderPopupAlignment.Top &&
                                dragHandle}
                            <StyledMentionFinderItemList ref={listRef}>
                                {items}
                            </StyledMentionFinderItemList>
                            {enableDragHandle &&
                                popupAlignment === MentionFinderPopupAlignment.Bottom &&
                                dragHandle}
                        </StyledMotionMentionFinderPopup>
                    )}
                </AnimatePresence>
            </StyledMentionFinder>
        </>
    );
};

MentionFinder.displayName = 'MentionFinder';

export default MentionFinder;
