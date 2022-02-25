import React, { FC, ReactNode, useCallback, useEffect, useRef } from 'react';
import { useForceUpdate } from '../../hooks/forceUpdate';
import { useUuid } from '../../hooks/uuid';
import { EmojiButton } from '../emoji-button/EmojiButton';
import { DesignMode } from './constants/design';
import { PopupPosition } from './constants/popup';
import {
    StyledEditableDiv,
    StyledEmojiInput,
    StyledPlaceholder,
    StyledRightElement,
} from './EmojiInput.styles';

export type EmojiInputProps = {
    /**
     * Mode and Design of the Input
     */
    design: DesignMode;
    /**
     * input & button cannot be clicked and color changes to gray
     */
    isDisabled: boolean;
    /**
     * on Blur
     */
    onBlur?: (event?: MouseEvent) => void;
    /**
     * on Focus
     */
    onFocus?: (event?: MouseEvent) => void;
    /**
     * Function, that returns current input on every change in input (KeyDown)
     */
    onInput?: (event?: KeyboardEvent) => void;
    /**
     * on KeyUp
     */
    onKeyUp?: (value?: KeyboardEvent) => void;
    /**
     * placeholder shown left
     */
    placeholder: string;
    /**
     * Position where the Popup should be shown
     */
    popupPosition: PopupPosition;
    /**
     * Element shown right from Emoji-Button
     */
    right?: ReactNode;
    /**
     * Mode and Design of the Input
     */
    showEmojiButton: boolean;
    /**
     * value in the Input
     */
    value?: string;
};

const EmojiInput: FC<EmojiInputProps> = ({
    design = DesignMode.Normal,
    isDisabled = false,
    onBlur,
    onFocus,
    onInput,
    onKeyUp,
    placeholder = '',
    popupPosition = PopupPosition.TopLeft,
    right,
    showEmojiButton = true,
    value = '',
}) => {
    const inputRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    const forceUpdate = useForceUpdate();

    const uuid = useUuid();

    useEffect(() => {
        buttonRef.current?.removeEventListener('mousedown', handlePreventLoseInputFocus);
        if (!isDisabled) {
            buttonRef.current?.addEventListener('mousedown', handlePreventLoseInputFocus);
        }
        return () => {
            buttonRef.current?.removeEventListener('mousedown', handlePreventLoseInputFocus);
        };
    }, [isDisabled]);

    useEffect(() => {
        if (inputRef.current) {
            const oldValue = inputRef.current.innerHTML;
            if (oldValue !== value) {
                inputRef.current.innerHTML = value;
            }
        }
    }, [value]);

    const handleInput = useCallback(
        (event) => {
            if (typeof onInput === 'function') {
                onInput(event);
            }
        },
        [onInput]
    );

    const handleKeyUp = useCallback(
        (event) => {
            if (typeof onKeyUp === 'function') {
                onKeyUp(event);
            }
        },
        [onKeyUp]
    );

    const handleFocus = useCallback(
        (event) => {
            forceUpdate();
            if (typeof onFocus === 'function') {
                onFocus(event);
            }
        },
        [onFocus]
    );

    const inputHasFocus = useCallback(
        () =>
            !!(
                document.activeElement &&
                inputRef.current &&
                document.activeElement.id === inputRef.current.id
            ),
        [document.activeElement, inputRef]
    );
    const setInputFocus = useCallback(() => {
        inputRef.current?.focus();
        forceUpdate();
    }, [inputRef]);

    const handlePreventLoseInputFocus = useCallback(
        (event: MouseEvent) => {
            if (
                inputHasFocus() &&
                event.target instanceof Node &&
                buttonRef.current?.contains(event.target)
            ) {
                event.preventDefault();
                event.stopPropagation();
            }
        },
        [buttonRef]
    );

    const handleBlur = useCallback(
        (event) => {
            forceUpdate();
            if (typeof onBlur === 'function') {
                onBlur(event);
            }
        },
        [onBlur]
    );
    const handlePaste = useCallback((event) => {}, [onBlur]);

    const insertHTMLAtCursorPosition = (text: string) => {
        if (document.activeElement === inputRef?.current) {
            document.execCommand('insertHTML', false, text);
        } else {
            //updateDOM(value + text);
        }

        const event = document.createEvent('HTMLEvents');
        event.initEvent('input', true);
        inputRef?.current?.dispatchEvent(event);
    };

    /* COPY from div => change escaped String to html String?
        source.addEventListener('copy', (event) => {
            const selection = document.getSelection();
            event.clipboardData.setData('text/plain', selection.toString().toUpperCase());
            event.preventDefault();
        }
    });
    */
    return (
        <StyledEmojiInput
            className="beta-chayns-emoji-input"
            translate="no"
            design={design}
            isDisabled={isDisabled}
        >
            <StyledEditableDiv
                contentEditable={!isDisabled}
                dangerouslySetInnerHTML={{ __html: '' }}
                design={design}
                dir="auto"
                id={uuid}
                isDisabled={isDisabled}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onInput={handleInput}
                onKeyUp={handleKeyUp}
                onPaste={handlePaste}
                ref={inputRef}
                showEmojiButton={showEmojiButton}
            />
            <StyledPlaceholder
                isHidden={value !== '' || inputHasFocus()}
                design={design}
                isDisabled={isDisabled}
            >
                {placeholder}
            </StyledPlaceholder>
            {showEmojiButton && (
                <EmojiButton
                    ref={buttonRef}
                    isDisabled={isDisabled}
                    design={design}
                    onClick={() => {
                        console.log(
                            inputHasFocus(),
                            document.activeElement,
                            inputRef.current,
                            document.activeElement?.id,
                            inputRef.current?.id
                        );
                        if (!inputHasFocus()) {
                            setInputFocus();
                        }
                    }}
                />
            )}
            <StyledRightElement design={design}>{right}</StyledRightElement>
        </StyledEmojiInput>
    );
};

EmojiInput.displayName = 'EmojiInput';

export default EmojiInput;
