import React, {
    forwardRef,
    useCallback,
    useMemo,
    useState,
    FocusEvent,
    useRef,
    useEffect,
    useImperativeHandle,
} from 'react';
import {
    StyledCommunicationInput,
    StyledCommunicationInputRightWrapper,
    StyledCommunicationInputSpacer,
    StyledEmojiInputWrapper,
    StyledInitialRightElementWrapper,
    StyledMotionCommunicationInputWrapper,
    StyledMotionIconWrapper,
} from './CommunicationInput.styles';
import { CommunicationInputProps, CommunicationInputRef } from './CommunicationInput.types';
import { ContextMenu, ContextMenuRef, Icon } from '@chayns-components/core';
import Chips from './chips/Chips';
import DynamicLayout from './dynamic-layout/DynamicLayout';
import { EmojiInput, EmojiInputRef, ReplaceTextOptions } from '@chayns-components/emoji-input';

const CommunicationInput = forwardRef<CommunicationInputRef, CommunicationInputProps>(
    (
        {
            contextMenuItems,
            rightElement,
            onInput,
            onFocus,
            onBlur,
            value,
            chips,
            isDisabled,
            inputId,
            prefixElement,
            onPrefixElementRemove,
            onPopupVisibilityChange,
            personId,
            placeholder,
            popupAlignment,
            onCursorPositionChange,
            height,
            maxHeight,
            shouldHidePlaceholderOnFocus,
            shouldPreventEmojiPicker,
            onKeyDown,
            shouldUseInitialAnimation,
            accessToken,
            content,
        },
        ref,
    ) => {
        const [isMultiLine, setIsMultiLine] = useState(false);
        const [isFocused, setIsFocused] = useState(false);
        const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
        const [isFullHeight, setIsFullHeight] = useState(false);
        const [shouldShowFullHeightToggle, setShouldShowFullHeightToggle] = useState(false);
        const [hasStartedInitialAnimation, setHasStartedInitialAnimation] =
            useState(!shouldUseInitialAnimation);

        const wrapperRef = useRef<HTMLDivElement>(null);
        const contextMenuRef = useRef<ContextMenuRef>(null);
        const emojiInputRef = useRef<EmojiInputRef>(null);

        const shouldShowInitialOnly = shouldUseInitialAnimation && !hasStartedInitialAnimation;

        const shouldShowInputInBottomRow = useMemo(() => {
            if (chips) {
                return false;
            }

            return !isMultiLine;
        }, [chips, isMultiLine]);

        const shouldShowRoundedCorners = useMemo(
            () => isMultiLine || !shouldShowInputInBottomRow,
            [isMultiLine, shouldShowInputInBottomRow],
        );

        const checkMultiLine = useCallback(() => {
            const currentValue = value ?? '';

            if (currentValue.length === 0 || currentValue === '<br>') {
                setIsMultiLine(false);
                return;
            }

            if (isMultiLine) {
                return;
            }

            if (currentValue.includes('\n') || currentValue.includes('<br>')) {
                setIsMultiLine(true);
                return;
            }

            const element = wrapperRef.current;

            if (!element) {
                return;
            }

            const hasWrapped = element.clientHeight > 48;

            if (hasWrapped) {
                setIsMultiLine(true);
            }
        }, [isMultiLine, value]);

        const checkFullHeightToggle = useCallback(() => {
            const element = wrapperRef.current;

            if (!element) {
                return;
            }

            setShouldShowFullHeightToggle(element.clientHeight > 66);
        }, []);

        useEffect(() => {
            if (shouldShowInitialOnly) {
                return;
            }

            requestAnimationFrame(checkMultiLine);
            requestAnimationFrame(checkFullHeightToggle);
        }, [checkFullHeightToggle, checkMultiLine, shouldShowInitialOnly]);

        useEffect(() => {
            const element = wrapperRef.current;

            if (!element || isMultiLine || shouldShowInitialOnly) {
                return undefined;
            }

            const resizeObserver = new ResizeObserver(() => {
                requestAnimationFrame(checkMultiLine);
                requestAnimationFrame(checkFullHeightToggle);
            });

            resizeObserver.observe(element);

            return () => {
                resizeObserver.disconnect();
            };
        }, [checkFullHeightToggle, checkMultiLine, isMultiLine, shouldShowInitialOnly]);

        const leftElement = useMemo(() => {
            if (!contextMenuItems) {
                return null;
            }

            return (
                <StyledMotionIconWrapper
                    onClick={() =>
                        isContextMenuOpen
                            ? contextMenuRef.current?.hide()
                            : contextMenuRef.current?.show()
                    }
                    animate={{ rotate: isContextMenuOpen ? 45 : 0 }}
                >
                    <ContextMenu
                        shouldDisableClick
                        items={contextMenuItems}
                        onHide={() => setIsContextMenuOpen(false)}
                        onShow={() => setIsContextMenuOpen(true)}
                        ref={contextMenuRef}
                    >
                        <Icon icons={['fa fa-plus']} size={20} />
                    </ContextMenu>
                </StyledMotionIconWrapper>
            );
        }, [contextMenuItems, isContextMenuOpen]);

        const handleFocus = useCallback(
            (event: FocusEvent<HTMLDivElement>) => {
                setIsFocused(true);

                if (typeof onFocus === 'function') {
                    onFocus(event);
                }
            },
            [onFocus],
        );

        const handleBlur = useCallback(
            (event: FocusEvent<HTMLDivElement>) => {
                setIsFocused(false);

                if (typeof onBlur === 'function') {
                    onBlur(event);
                }
            },
            [onBlur],
        );

        const handleStartAnimation = useCallback(() => {
            setHasStartedInitialAnimation(true);
        }, []);

        useImperativeHandle(
            ref,
            () => ({
                startAnimation: handleStartAnimation,
                focus: () => emojiInputRef.current?.focus(),
                setCursorPosition: (position?: number) =>
                    emojiInputRef.current?.setCursorPosition(position),
                blur: () => emojiInputRef.current?.blur(),
                insertTextAtCursorPosition: (text: string) =>
                    emojiInputRef.current?.insertTextAtCursorPosition(text),
                replaceText: (
                    searchText: string,
                    replaceText: string,
                    options?: ReplaceTextOptions,
                ) => emojiInputRef.current?.replaceText(searchText, replaceText, options),
                startProgress: (durationInSeconds: number) =>
                    emojiInputRef.current?.startProgress(durationInSeconds),
                stopProgress: () => emojiInputRef.current?.stopProgress(),
            }),
            [handleStartAnimation],
        );

        const wrapperAnimation = useMemo(
            () => ({
                width: shouldShowInitialOnly ? 52 : '100%',
                left: shouldShowInitialOnly ? '50%' : 0,
                x: shouldShowInitialOnly ? '-50%' : 0,
                borderRadius: shouldShowInitialOnly || !shouldShowRoundedCorners ? 26 : 8,
            }),
            [shouldShowInitialOnly, shouldShowRoundedCorners],
        );

        return (
            <StyledCommunicationInput>
                <StyledCommunicationInputSpacer />
                <StyledMotionCommunicationInputWrapper
                    initial={wrapperAnimation}
                    animate={wrapperAnimation}
                    transition={{
                        type: 'tween',
                    }}
                    $isFocused={isFocused}
                >
                    {shouldShowInitialOnly ? (
                        rightElement && (
                            <StyledInitialRightElementWrapper>
                                {rightElement}
                            </StyledInitialRightElementWrapper>
                        )
                    ) : (
                        <>
                            {content}
                            <DynamicLayout
                                shouldShowFullHeightToggle={shouldShowFullHeightToggle}
                                shouldShowInputInBottomRow={shouldShowInputInBottomRow}
                                isFullHeight={isFullHeight}
                                onFullHeightToggle={(fullHeight) => setIsFullHeight(fullHeight)}
                                leftElement={leftElement}
                                rightElement={
                                    rightElement && (
                                        <StyledCommunicationInputRightWrapper>
                                            {rightElement}
                                        </StyledCommunicationInputRightWrapper>
                                    )
                                }
                                chipsElement={<Chips chips={chips} />}
                            >
                                <StyledEmojiInputWrapper
                                    ref={wrapperRef}
                                    $isFullHeight={isFullHeight}
                                >
                                    <EmojiInput
                                        value={value}
                                        onInput={onInput}
                                        inputId={inputId}
                                        ref={emojiInputRef}
                                        onBlur={handleBlur}
                                        height={height}
                                        maxHeight={isFullHeight ? 501 : maxHeight}
                                        isDisabled={isDisabled}
                                        accessToken={accessToken}
                                        onFocus={handleFocus}
                                        onKeyDown={onKeyDown}
                                        onCursorPositionChange={onCursorPositionChange}
                                        onPopupVisibilityChange={onPopupVisibilityChange}
                                        onPrefixElementRemove={onPrefixElementRemove}
                                        prefixElement={prefixElement}
                                        popupAlignment={popupAlignment}
                                        personId={personId}
                                        placeholder={placeholder}
                                        shouldHidePlaceholderOnFocus={shouldHidePlaceholderOnFocus}
                                        shouldPreventEmojiPicker={shouldPreventEmojiPicker}
                                    />
                                </StyledEmojiInputWrapper>
                            </DynamicLayout>
                        </>
                    )}
                </StyledMotionCommunicationInputWrapper>
            </StyledCommunicationInput>
        );
    },
);

CommunicationInput.displayName = 'CommunicationInput';

export default CommunicationInput;
