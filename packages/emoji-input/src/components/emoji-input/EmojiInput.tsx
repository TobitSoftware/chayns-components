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
     * value in the Input
     */
    value?: string;
    /**
     * placeholder shown left
     */
    placeholder: string;
    /**
     * input & button cannot be clicked and color changes to gray
     */
    isDisabled: boolean;
    /**
     * on KeyUp
     */
    onKeyUp?: (value?: KeyboardEvent) => void;
    /**
     * on Focus
     */
    onFocus?: (event?: MouseEvent) => void;
    /**
     * on Blur
     */
    onBlur?: (event?: MouseEvent) => void;
    /**
     * Function, that returns current input on every change in input (KeyDown)
     */
    onInput?: (event?: KeyboardEvent) => void;
    /**
     * Mode and Design of the Input
     */
    design: DesignMode;
    /**
     * Mode and Design of the Input
     */
    showEmojiButton: boolean;
    /**
     * Position where the Popup should be shown
     */
    popupPosition: PopupPosition;
    /**
     * Element shown right from Emoji-Button
     */
    right?: ReactNode;
};

const EmojiInput: FC<EmojiInputProps> = ({
    value,
    placeholder = '',
    isDisabled = false,
    onKeyUp,
    onFocus,
    onBlur,
    onInput,
    design = DesignMode.Normal,
    showEmojiButton = true,
    popupPosition = PopupPosition.TopLeft,
    right,
}) => {
    const [hasFocus, setHasFocus] = useState(false);

    const inputRef = useRef<HTMLDivElement>(null);

    const uuid = useUuid();

    useEffect(() => {
        const oldValue = inputRef.current?.innerHTML;

        if (oldValue !== value) {
            // ToDo
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
        <StyledEmojiInput className="beta-chayns-emoji-input" translate="no" design={design}>
            <StyledEditableDiv
                design={design}
                dangerouslySetInnerHTML={{ __html: '' }}
                ref={inputRef}
                id={uuid}
                contentEditable={!isDisabled}
                onKeyUp={handleKeyUp}
                onInput={handleInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
                dir="auto"
            />
            <StyledPlaceholder isHidden={value !== '' || hasFocus}>{placeholder}</StyledPlaceholder>
            {showEmojiButton && (
                <div className="prevent-lose-focus">
                    <EmojiButton />
                </div>
            )}
            <StyledRightElement className="prevent-lose-focus">{right}</StyledRightElement>
        </StyledEmojiInput>
    );
};

EmojiInput.displayName = 'EmojiInput';

export default EmojiInput;
