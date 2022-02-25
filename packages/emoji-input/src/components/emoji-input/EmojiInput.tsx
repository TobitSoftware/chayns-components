import React, { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
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
    const [hasFocus, setHasFocus] = useState(false);

    const inputRef = useRef<HTMLDivElement>(null);

    const uuid = useUuid();

    useEffect(() => {
        if (inputRef.current) {
            const oldValue = inputRef.current.innerHTML;
            if (oldValue !== value) {
                inputRef.current.innerText = value;
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
            setHasFocus(true);

            if (typeof onFocus === 'function') {
                onFocus(event);
            }
        },
        [onFocus]
    );

    const handleBlur = useCallback(
        (event) => {
            setHasFocus(false);

            if (typeof onBlur === 'function') {
                onBlur(event);
            }
        },
        [onBlur]
    );

    /*
    const insertHTMLAtCursorPosition = (text: string) => {
        if (document.activeElement === inputRef?.current) {
            document.execCommand('insertHTML', false, text);
        } else {
            updateDOM(value + text);
        }

        const event = document.createEvent('HTMLEvents');
        event.initEvent('input', true);
        inputRef?.current?.dispatchEvent(event);
    };
    */

    //  document.body.removeEventListener('mousedown', this.handlePreventLoseInputFocus);
    //  document.body.removeEventListener('mousedown', this.handlePreventLoseInputFocus);

    /* const handlePreventLoseInputFocus = (event) => {
        if (
            event?.target?.classList?.contains('prevent-lose-focus') ||
            event?.target?.parentElement?.classList?.contains('prevent-lose-focus')
        ) {
            event.preventDefault();
            event.stopPropagation();
        }
    }; */

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
                ref={inputRef}
                showEmojiButton={showEmojiButton}
            />
            <StyledPlaceholder
                isHidden={value !== '' || hasFocus}
                design={design}
                isDisabled={isDisabled}
            >
                {placeholder}
            </StyledPlaceholder>
            {showEmojiButton && (
                <EmojiButton isDisabled={isDisabled} design={design} /> //className="prevent-lose-focus"
            )}
            <StyledRightElement design={design}>{right}</StyledRightElement>
        </StyledEmojiInput>
    );
};

EmojiInput.displayName = 'EmojiInput';

export default EmojiInput;
