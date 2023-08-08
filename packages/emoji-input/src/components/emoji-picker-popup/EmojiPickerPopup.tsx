import { Icon } from '@chayns-components/core';
import { AnimatePresence } from 'framer-motion';
import React, { FC, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { PopupAlignment } from '../../constants/alignment';
import EmojiPicker from '../emoji-picker/EmojiPicker';
import { emojiPickerSize } from '../emoji-picker/EmojiPicker.styles';
import {
    StyledEmojiPickerPopup,
    StyledMotionEmojiPickerPopupContent,
} from './EmojiPickerPopup.styles';

export type EmojiPickerPopupProps = {
    /**
     * Access token of the logged-in user. Is needed to load and save the history of the emojis.
     */
    accessToken?: string;
    /**
     * Sets the alignment of the popup to a fixed value. If this value is not set, the component
     * calculates the best position on its own. Use the imported 'PopupAlignment' enum to set this
     * value.
     */
    alignment?: PopupAlignment;
    /**
     * Function that is executed when the visibility of the popup changes.
     * @param {boolean} isVisible - Whether the popup is visible or not
     */
    onPopupVisibilityChange?: (isVisible: boolean) => void;
    /**
     * Person id of the logged-in user. Is needed to load and save the history of the emojis.
     */
    personId?: string;
    /**
     * Function executed when an emoji is selected in the popup
     * @param {string} emoji - Emoji that was selected
     */
    onSelect: (emoji: string) => void;
    /**
     * The width of the parent element.
     */
    parentWidth: number;
};

export type PopupPosition = {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
};

const EmojiPickerPopup: FC<EmojiPickerPopupProps> = ({
    accessToken,
    alignment,
    onPopupVisibilityChange,
    onSelect,
    personId,
    parentWidth,
}) => {
    const [internalAlignment, setInternalAlignment] = useState<PopupAlignment>(
        PopupAlignment.TopLeft
    );
    const [shouldShowPopup, setShouldShowPopup] = useState(false);
    const [position, setPosition] = useState({} as PopupPosition);

    const contentRef = useRef<HTMLDivElement>(null);

    const handleHide = useCallback(() => {
        setShouldShowPopup(false);
    }, []);

    const handleDocumentClick = useCallback<EventListener>(
        (event) => {
            if (!contentRef.current?.contains(event.target as Node)) {
                event.preventDefault();
                event.stopPropagation();

                handleHide();
            }
        },
        [handleHide]
    );

    const handlePopupIconClick = useCallback(
        (event: MouseEvent<HTMLSpanElement>) => {
            if (shouldShowPopup) {
                setShouldShowPopup(false);

                return;
            }

            const { height, left, top, width } = event.currentTarget.getBoundingClientRect();

            let newInternalAlignment: PopupAlignment | undefined = alignment;

            if (typeof newInternalAlignment !== 'number') {
                if (top < emojiPickerSize.height + 16) {
                    if (left < emojiPickerSize.width + 16) {
                        newInternalAlignment = PopupAlignment.BottomRight;
                    } else {
                        newInternalAlignment = PopupAlignment.BottomLeft;
                    }
                } else if (left < emojiPickerSize.width + 16) {
                    newInternalAlignment = PopupAlignment.TopRight;
                } else {
                    newInternalAlignment = PopupAlignment.TopLeft;
                }
            }

            let newPosition: PopupPosition = {};

            switch (newInternalAlignment) {
                case PopupAlignment.BottomLeft:
                    newPosition = { left: 8 + width - emojiPickerSize.width, top: 12 + height };
                    break;
                case PopupAlignment.BottomRight:
                    newPosition = { left: -10, top: 12 + height };
                    break;
                case PopupAlignment.TopLeft:
                    newPosition = {
                        left: 8 + width - emojiPickerSize.width,
                        top: -12 - emojiPickerSize.height,
                    };
                    break;
                case PopupAlignment.TopRight:
                    newPosition = { left: -10, top: -12 - emojiPickerSize.height };
                    break;
                default:
                    break;
            }

            setInternalAlignment(newInternalAlignment);
            setPosition(newPosition);
            setShouldShowPopup(true);
        },
        [alignment, shouldShowPopup]
    );

    useEffect(() => {
        if (shouldShowPopup) {
            document.addEventListener('click', handleDocumentClick, true);
            window.addEventListener('blur', handleHide);
        }

        return () => {
            document.removeEventListener('click', handleDocumentClick, true);
            window.removeEventListener('blur', handleHide);
        };
    }, [handleDocumentClick, handleHide, shouldShowPopup]);

    useEffect(() => {
        if (typeof onPopupVisibilityChange === 'function') {
            onPopupVisibilityChange(shouldShowPopup);
        }
    }, [onPopupVisibilityChange, shouldShowPopup]);

    const exitAndInitialY =
        internalAlignment === PopupAlignment.TopLeft ||
        internalAlignment === PopupAlignment.TopRight
            ? -16
            : 16;

    return (
        <StyledEmojiPickerPopup width={parentWidth - 40}>
            <AnimatePresence initial={false}>
                {shouldShowPopup && (
                    <StyledMotionEmojiPickerPopupContent
                        alignment={internalAlignment}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: exitAndInitialY }}
                        initial={{ opacity: 0, y: exitAndInitialY }}
                        key="emojiPickerPopupContent"
                        ref={contentRef}
                        style={position}
                        transition={{ type: 'tween' }}
                    >
                        <EmojiPicker
                            accessToken={accessToken}
                            onSelect={onSelect}
                            personId={personId}
                        />
                    </StyledMotionEmojiPickerPopupContent>
                )}
            </AnimatePresence>
            <Icon
                className="prevent-lose-focus"
                icons={['far fa-smile']}
                onClick={handlePopupIconClick}
                size={18}
            />
        </StyledEmojiPickerPopup>
    );
};

EmojiPickerPopup.displayName = 'EmojiPickerPopup';

export default EmojiPickerPopup;
