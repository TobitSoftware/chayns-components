import React, {FC, MouseEventHandler, ReactNode, useState, useCallback} from 'react';
import {AnimatePresence, MotionConfig} from 'framer-motion';
import {useUuid} from "../hooks/uuid";
import classNames from 'clsx';
import {IS_EDGE_WITH_CHROMIUM, SKIN_TONE_REGEX} from "./utils";

export type EMOJI_INPUT_MODE = {
    NORMAL: 0,
    PURE: 1,
    ONLY_BUTTON: 2,
    ONLY_INPUT: 3,
};
export type POPUP_POSITION = {
    LEFT_TOP: 0,
    CENTER_TOP: 1,
    RIGHT_TOP: 2,
    LEFT_BOTTOM: 3,
    CENTER_BOTTOM: 4,
    RIGHT_BOTTOM: 5,
};

export type EmojiInputElement = {
    /**
     * Additional styles for input element
     */
    style?: object;
    /**
     * Additional class names for the button element
     */
    className?: string;
    /**
     * placeholder shown left
     */
    placeholder?: string;
    /**
     * input & button cannot be clicked and color changes to gray
     */
    isDisabled?: boolean;
    /**
     * on KeyDown
     */
    onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
    /**
     * on Focus
     */
    onFocus: React.ChangeEventHandler;
    /**
     * on Blur
     */
    onBlur: React.ChangeEventHandler;
    /**
     * Function, that returns current input on every change in input (KeyDown)
     */
    onChange?: React.KeyboardEventHandler<HTMLDivElement>;
    /**
     * Mode and Design of the Input
     */
    mode?: EMOJI_INPUT_MODE;
    /**
     * Position where the Popup should be shown
     */
    popupPosition?: POPUP_POSITION;
    /**
     * Element shown right from Emoji-Button
     */
    right?: ReactNode;
};

export const EmojiInput: FC<EmojiInputElement> = ({
                                                      style,
                                                      className,
                                                      placeholder,
                                                      isDisabled,
                                                      onKeyDown,
                                                      onFocus,
                                                      onBlur,
                                                      onChange,
                                                      mode,
                                                      popupPosition,
                                                      right
                                                  }) => {

    const [value, setValue] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [focus, setFocus] = useState(false);
    const uuid = useUuid();

    const handleInput = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        setValue(value.replace(SKIN_TONE_REGEX, ''));
        if (typeof onChange === 'function') {
            onChange(event);
        }
    }, []);

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.keyCode === 13 && chayns.env.isIOS) { // TODO env => hooks
            // add '<br><br>'
            event.preventDefault();
        }

        if (typeof onKeyDown === 'function') {
            onKeyDown(event);
        }
    }, []);

    const handleKeyUp = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        if (chayns.env.browser.name.toLowerCase() === 'ie' && event.keyCode !== 16) { // TODO env => hooks
            handleInput(event);
        }

        if (
            chayns.env.browser.name.toLowerCase() === 'edge' // TODO env => hooks
            && !(IS_EDGE_WITH_CHROMIUM.test(navigator.userAgent))
            && event.keyCode === 13
            && event.shiftKey
        ) {
            handleInput(event);
        }
    }, []);

    const handleFocus = useCallback((event: React.ChangeEvent) => {
        setFocus(true);
        if (typeof onFocus === 'function') {
            onFocus(event);
        }
    }, []);

    const handleBlur = useCallback((event: React.ChangeEvent) => {
        setFocus(false);
        if (typeof onBlur === 'function') {
            onBlur(event);
        }
    }, []);

    return (
        <MotionConfig transition={{type: 'tween'}}>
            <div className="input__input-wrapper">
                <div
                    id={uuid}

                    style={{...{width: '100%'}, ...style}}
                    className={classNames('input', className, {
                        'input--disabled': isDisabled,
                    })}

                    contentEditable={!isDisabled}
                    onKeyUp={handleKeyUp}
                    onKeyDown={handleKeyDown}
                    onInput={handleInput}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    dir="auto"

                    dangerouslySetInnerHTML={{ __html: value }}
                />
                {right}
            </div>
            <AnimatePresence initial={false}>
                {showPopup && <></>}
            </AnimatePresence>
        </MotionConfig>
    );
};
