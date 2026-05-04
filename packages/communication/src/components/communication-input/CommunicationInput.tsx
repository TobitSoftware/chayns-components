import React, {
    forwardRef,
    useCallback,
    useMemo,
    useState,
    FocusEvent,
    useRef,
    useEffect,
} from 'react';
import {
    StyledCommunicationInput,
    StyledCommunicationInputRightWrapper,
    StyledCommunicationInputSpacer,
    StyledEmojiInputWrapper,
    StyledMotionCommunicationInputWrapper,
    StyledMotionIconWrapper,
} from './CommunicationInput.styles';
import { CommunicationInputProps } from './CommunicationInput.types';
import { ContextMenu, ContextMenuRef, Icon } from '@chayns-components/core';
import Chips from './chips/Chips';
import DynamicLayout from './dynamic-layout/DynamicLayout';
import { EmojiInput, EmojiInputRef } from '@chayns-components/emoji-input';

const CommunicationInput = forwardRef<EmojiInputRef, CommunicationInputProps>(
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
            accessToken,
            content,
        },
        ref,
    ) => {
        const [isMultiLine, setIsMultiLine] = useState(false);
        const [isFocused, setIsFocused] = useState(false);
        const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

        const wrapperRef = useRef<HTMLDivElement>(null);
        const contextMenuRef = useRef<ContextMenuRef>(null);

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

            const hasWrapped = element.clientHeight > 40;

            if (hasWrapped) {
                setIsMultiLine(true);
            }
        }, [isMultiLine, value]);

        useEffect(() => {
            requestAnimationFrame(checkMultiLine);
        }, [checkMultiLine]);

        useEffect(() => {
            const element = wrapperRef.current;

            if (!element || isMultiLine) {
                return undefined;
            }

            const resizeObserver = new ResizeObserver(() => {
                requestAnimationFrame(checkMultiLine);
            });

            resizeObserver.observe(element);

            return () => {
                resizeObserver.disconnect();
            };
        }, [checkMultiLine, isMultiLine]);

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

        return (
            <StyledCommunicationInput>
                <StyledCommunicationInputSpacer />
                <StyledMotionCommunicationInputWrapper
                    animate={{
                        borderRadius: shouldShowRoundedCorners ? 8 : 26,
                    }}
                    $isFocused={isFocused}
                >
                    {content}
                    <DynamicLayout
                        shouldShowInputInBottomRow={shouldShowInputInBottomRow}
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
                            $shouldShowInputInBottomRow={shouldShowInputInBottomRow}
                        >
                            <EmojiInput
                                value={value}
                                onInput={onInput}
                                inputId={inputId}
                                ref={ref}
                                onBlur={handleBlur}
                                height={height}
                                maxHeight={maxHeight}
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
                </StyledMotionCommunicationInputWrapper>
            </StyledCommunicationInput>
        );
    },
);

CommunicationInput.displayName = 'CommunicationInput';

export default CommunicationInput;
