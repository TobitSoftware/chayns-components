import clsx from 'clsx';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import React, { FC, ReactNode, useCallback, useRef, useState } from 'react';
import { useUuid } from '../hooks/uuid';
import { SKIN_TONE_REGEX } from './utils';

export enum EmojiInputMode {
    Normal,
    Pure,
    OnlyButton,
    OnlyInput,
}

export enum PopupPosition {
    LeftTop,
    CenterTop,
    RightTop,
    LeftBottom,
    CenterBottom,
}

export type EmojiInputProps = {
    /**
     * value in the Input
     */
    value?: string;
    /**
     * placeholder shown left
     */
    placeholder?: string;
    /**
     * input & button cannot be clicked and color changes to gray
     */
    isDisabled?: boolean;
    /**
     * on KeyUp
     */
    onKeyUp: (value?: KeyboardEvent) => void;
    /**
     * on Focus
     */
    onFocus: (event?: MouseEvent) => void;
    /**
     * on Blur
     */
    onBlur: (event?: MouseEvent) => void;
    /**
     * Function, that returns current input on every change in input (KeyDown)
     */
    onInput?: (event?: KeyboardEvent) => void;
    /**
     * Mode and Design of the Input
     */
    mode?: EmojiInputMode;
    /**
     * Position where the Popup should be shown
     */
    popupPosition?: PopupPosition;
    /**
     * Element shown right from Emoji-Button
     */
    right?: ReactNode;
    /**
     * is Multiline Input allowed
     */
    multiLine?: boolean;
};

export const EmojiInput: FC<EmojiInputProps> = ({
    value,
    placeholder,
    isDisabled,
    onKeyUp,
    onFocus,
    onBlur,
    onInput,
    mode,
    popupPosition,
    right,
    multiLine = false,
}) => {
    const inputRef = useRef<HTMLDivElement>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [focus, setFocus] = useState(false);
    const uuid = useUuid();

    const handleInput = useCallback(
        (event) => {
            console.log(value);
            value = event?.target?.innerHTML?.replace(SKIN_TONE_REGEX, '') || '';
            if (typeof onInput === 'function') {
                onInput(event);
            }
        },
        [onInput]
    );

    const handleKeyUp = useCallback((event) => {
        if (typeof onKeyUp === 'function') {
            onKeyUp(event);
        }
    }, []);

    const handleFocus = useCallback((event) => {
        setFocus(true);
        if (typeof onFocus === 'function') {
            onFocus(event);
        }
    }, []);

    const handleBlur = useCallback((event) => {
        setFocus(false);
        if (typeof onBlur === 'function') {
            onBlur(event);
        }
    }, []);

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
    const updateDOM = (value: string) => {};

    return (
        <MotionConfig transition={{ type: 'tween' }}>
            <div className="input__input-wrapper">
                <div
                    className={clsx('input', {
                        'input--disabled': isDisabled,
                    })}
                    ref={inputRef}
                    dangerouslySetInnerHTML={{ __html: value || '' }}
                    id={uuid}
                    contentEditable={!isDisabled}
                    onKeyUp={handleKeyUp}
                    onInput={handleInput}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    dir="auto"
                />
                <div
                    className={clsx('emoji-input__wrapper__placeholder', {
                        'emoji-input__wrapper__placeholder--hidden': value !== '' || focus,
                    })}
                >
                    {placeholder}
                </div>
                {right}
            </div>
            <AnimatePresence initial={false}>{showPopup && <></>}</AnimatePresence>
        </MotionConfig>
    );
};
