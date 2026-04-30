import React, {
    ChangeEvent,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';
import {
    CommunicationInputProps,
    CommunicationInputRef,
    CommunicationInputTextType,
} from '../CommunicationInput.types';
import { EmojiInput, EmojiInputRef } from '@chayns-components/emoji-input';
import { TextArea } from '@chayns-components/core';
import { StyledInputElement } from './InputElement.styles';

interface InputElementProps {
    value: CommunicationInputProps['value'];
    onChange: CommunicationInputProps['onChange'];
    onBlur: CommunicationInputProps['onBlur'];
    onFocus: CommunicationInputProps['onFocus'];
    textType: CommunicationInputTextType;
    isDisabled: CommunicationInputProps['isDisabled'];
    isMultiLine: boolean;
    onMultiLineChange: (isMultiLine: boolean) => void;
}

const InputElement = forwardRef<CommunicationInputRef, InputElementProps>(
    (
        { isDisabled, value, onChange, onFocus, textType, onBlur, isMultiLine, onMultiLineChange },
        ref,
    ) => {
        const wrapperRef = useRef<HTMLDivElement>(null);
        const textAreaRef = useRef<HTMLTextAreaElement>(null);
        const emojiInputRef = useRef<EmojiInputRef>(null);

        const checkMultiLine = useCallback(() => {
            const currentValue = value ?? '';

            if (currentValue.length === 0 || currentValue === '<br>') {
                onMultiLineChange(false);
                return;
            }

            if (isMultiLine) {
                return;
            }

            if (currentValue.includes('\n') || currentValue.includes('<br>')) {
                onMultiLineChange(true);
                return;
            }

            const element =
                textType === CommunicationInputTextType.PLAIN
                    ? textAreaRef.current
                    : wrapperRef.current;

            if (!element) {
                return;
            }

            const hasWrapped = element.clientHeight > 52;

            if (hasWrapped) {
                onMultiLineChange(true);
            }
        }, [isMultiLine, onMultiLineChange, textType, value]);

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

        useImperativeHandle(ref, () => {
            if (textType === CommunicationInputTextType.PLAIN) {
                return {
                    blur: () => textAreaRef.current?.blur(),
                    focus: () => textAreaRef.current?.focus(),
                    insertText: () => {},
                    setCursorPosition: () => {},
                };
            }

            return {
                blur: () => emojiInputRef.current?.blur(),
                focus: () => emojiInputRef.current?.focus(),
                insertText: (text: string) =>
                    emojiInputRef.current?.insertTextAtCursorPosition(text),
                setCursorPosition: (position?: number) =>
                    emojiInputRef.current?.setCursorPosition(position),
            };
        }, [textType]);

        const handleEmojiInputChange = (
            event: ChangeEvent<HTMLDivElement>,
            originalText: string,
        ) => {
            const newEvent = {
                ...event,
                target: {
                    ...event.target,
                    value: originalText,
                },
            } as unknown as ChangeEvent<HTMLTextAreaElement>;

            onChange(newEvent);
        };

        if (textType === CommunicationInputTextType.PLAIN) {
            return (
                <StyledInputElement ref={wrapperRef} $textType={textType}>
                    <TextArea
                        ref={textAreaRef}
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        isDisabled={isDisabled}
                    />
                </StyledInputElement>
            );
        }

        return (
            <StyledInputElement ref={wrapperRef} $textType={textType}>
                <EmojiInput
                    ref={emojiInputRef}
                    value={value}
                    onInput={handleEmojiInputChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    isDisabled={isDisabled}
                />
            </StyledInputElement>
        );
    },
);

InputElement.displayName = 'InputElement';

export default InputElement;
