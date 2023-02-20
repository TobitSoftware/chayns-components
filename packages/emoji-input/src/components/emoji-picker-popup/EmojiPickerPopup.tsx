import Icon from '@chayns-components/core/lib/components/icon/Icon';
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
    onSelect: (emoji: string) => void;
};

export type PopupPosition = {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
};

const EmojiPickerPopup: FC<EmojiPickerPopupProps> = ({ onSelect }) => {
    const [alignment, setAlignment] = useState<PopupAlignment>(PopupAlignment.TopLeft);
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

            const { bottom, left, right, top } = event.currentTarget.getBoundingClientRect();

            const newPosition: PopupPosition = {};

            if (top < emojiPickerSize.height + 16) {
                newPosition.top = bottom + 12;

                if (left < emojiPickerSize.width + 16) {
                    newPosition.left = left - 8;

                    setAlignment(PopupAlignment.BottomRight);
                } else {
                    newPosition.left = right - emojiPickerSize.width + 8;

                    setAlignment(PopupAlignment.BottomLeft);
                }
            } else {
                newPosition.top = top - emojiPickerSize.height - 12;

                if (left < emojiPickerSize.width + 16) {
                    newPosition.left = left - 8;

                    setAlignment(PopupAlignment.TopRight);
                } else {
                    newPosition.left = right - emojiPickerSize.width + 8;

                    setAlignment(PopupAlignment.TopLeft);
                }
            }

            setPosition(newPosition);
            setShouldShowPopup(true);
        },
        [shouldShowPopup]
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

    const exitAndInitialY =
        alignment === PopupAlignment.TopLeft || alignment === PopupAlignment.TopRight ? -16 : 16;

    return (
        <StyledEmojiPickerPopup>
            <AnimatePresence initial={false}>
                {shouldShowPopup && (
                    <StyledMotionEmojiPickerPopupContent
                        alignment={alignment}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: exitAndInitialY }}
                        initial={{ opacity: 0, y: exitAndInitialY }}
                        ref={contentRef}
                        style={position}
                        transition={{ type: 'tween' }}
                    >
                        <EmojiPicker onSelect={onSelect} />
                    </StyledMotionEmojiPickerPopupContent>
                )}
            </AnimatePresence>
            <Icon icons={['far fa-smile']} onClick={handlePopupIconClick} size={18} />
        </StyledEmojiPickerPopup>
    );
};

EmojiPickerPopup.displayName = 'EmojiPickerPopup';

export default EmojiPickerPopup;
