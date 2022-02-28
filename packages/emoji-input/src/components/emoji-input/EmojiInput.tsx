import React, { FC, ReactNode, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useForceUpdate } from '../../hooks/forceUpdate';
import { useUuid } from '../../hooks/uuid';
import { bbCodeTextToHTML } from '../../utils/bbCode';
import { setCursorToEnd } from '../../utils/cursor';
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
     * returns HtmlString and event, event is null if Emoji gets injected
     */
    onInput?: (value: string, event?: KeyboardEvent) => void;
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

    const forceRender = useForceUpdate();

    const uuid = useUuid();

    console.log('render');

    useEffect(() => {
        buttonRef.current?.removeEventListener('mousedown', handlePreventLoseInputFocus);
        if (!isDisabled) {
            buttonRef.current?.addEventListener('mousedown', handlePreventLoseInputFocus);
        }
        return () => {
            buttonRef.current?.removeEventListener('mousedown', handlePreventLoseInputFocus);
        };
    }, [isDisabled]);

    useLayoutEffect(() => {
        if (inputRef.current) {
            const oldValue = inputRef.current.innerHTML;
            if (oldValue !== value) {
                inputRef.current.innerHTML = value;
                forceRender();
            }
        }
    }, [value]);

    const handleInput = useCallback(
        (htmlString, event) => {
            console.log(htmlString);
            const bbCodeHtml = bbCodeTextToHTML(htmlString);
            if (typeof onInput === 'function') {
                onInput(htmlString, event);
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
            forceRender();
            if (typeof onFocus === 'function') {
                onFocus(event);
            }
        },
        [onFocus]
    );

    const handleBlur = useCallback(
        (event) => {
            forceRender();
            if (typeof onBlur === 'function') {
                onBlur(event);
            }
        },
        [onBlur]
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
        if (inputRef.current) {
            inputRef.current.focus();
            setCursorToEnd(inputRef.current);
            forceRender();
        }
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

    const handlePaste = useCallback((event: ClipboardEvent) => {
        event.preventDefault();
        event.stopPropagation();
        const text = event.clipboardData?.getData('text/plain');
        insertHTMLAtCursorPos(text);
    }, []);

    const getInputValue = useCallback(() => inputRef.current?.innerHTML || '', [inputRef]);

    const insertHTMLAtCursorPos = useCallback((html) => {
        document.execCommand('insertHTML', false, html);
    }, []);

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
                design={design}
                dir="auto"
                id={uuid}
                isDisabled={isDisabled}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onInput={(event) => handleInput(getInputValue(), event)}
                onKeyUp={handleKeyUp}
                onPaste={handlePaste}
                ref={inputRef}
                showEmojiButton={showEmojiButton}
            />
            <StyledPlaceholder
                isHidden={getInputValue() !== '' || inputHasFocus()}
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
                        if (!inputHasFocus()) {
                            setInputFocus();
                        }
                    }}
                    onEmojiInput={(emojiHtml) => {
                        // insertHTMLAtCursorPos(emojiHtml);
                    }}
                />
            )}
            <StyledRightElement design={design}>{right}</StyledRightElement>
        </StyledEmojiInput>
    );
};

EmojiInput.displayName = 'EmojiInput';

export default EmojiInput;
