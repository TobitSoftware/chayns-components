import { useCombinedRefs, useIsMeasuredClone } from '@chayns-components/core';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import Emoji, { type EmojiProps } from '../emoji/Emoji';
import {
    StyledEmojiPickerEmojis,
    StyledEmojiPickerEmojisNoContentInfo,
} from '../EmojiPickerEmojis.styles';

export interface PickerEmoji {
    emoji: string;
    name: string;
    skin_tone_support: boolean;
}

interface EmojiPickerEmojiListProps {
    emojis: PickerEmoji[];
    emojiList: EmojiProps['emojiList'];
    isHistory: boolean;
    onSelect: (emoji: PickerEmoji, shouldRestoreInputFocus?: boolean) => void;
}

const EMOJIS_PER_ROW = 6;

const EmojiPickerEmojiList: FC<EmojiPickerEmojiListProps> = ({
    emojis,
    emojiList,
    isHistory,
    onSelect,
}) => {
    const [shouldPreventListener, ref] = useIsMeasuredClone<HTMLDivElement>();
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [shouldShowSkinTonePopup, setShouldShowSkinTonePopup] = useState(false);
    const emojiRef = useRef<HTMLDivElement>(null);
    const shouldPreventEmojiControlsRef = useRef(false);
    const combinedRef = useCombinedRefs(emojiRef, ref);

    const handlePopupVisibilityChange = useCallback((isVisible: boolean) => {
        setShouldShowSkinTonePopup(isVisible);
        shouldPreventEmojiControlsRef.current = isVisible;
    }, []);

    const handleSelect = useCallback(
        (emoji: PickerEmoji, index: number, shouldRestoreInputFocus = false) => {
            setFocusedIndex(index);
            onSelect(emoji, shouldRestoreInputFocus);
        },
        [onSelect],
    );

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (shouldPreventListener || shouldPreventEmojiControlsRef.current) return;

            const isArrowKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(
                event.key,
            );
            if (!isArrowKey && event.key !== 'Enter') return;

            const container = emojiRef.current;
            const elements = container?.querySelectorAll<HTMLDivElement>(':scope > [data-emoji]');
            const currentElement = elements?.[focusedIndex];

            if (event.key === 'Enter') {
                if (!currentElement) return;

                const { emoji, name, skinToneSupport } = currentElement.dataset;
                if (!emoji || !name || !skinToneSupport) return;

                if (event.ctrlKey) {
                    if (skinToneSupport === 'true') handlePopupVisibilityChange(true);
                    return;
                }

                handleSelect(
                    { emoji, name, skin_tone_support: skinToneSupport === 'true' },
                    focusedIndex,
                    true,
                );
                return;
            }

            event.preventDefault();
            if (event.ctrlKey || !container || !elements?.length) return;

            let newIndex = currentElement ? focusedIndex : 0;
            if (event.key === 'ArrowUp') newIndex = (newIndex - EMOJIS_PER_ROW) % elements.length;
            else if (event.key === 'ArrowDown')
                newIndex = (newIndex + EMOJIS_PER_ROW) % elements.length;
            else if (event.key === 'ArrowLeft') newIndex = (newIndex - 1) % elements.length;
            else newIndex = (newIndex + 1) % elements.length;

            if (newIndex < 0) newIndex = elements.length - 1;

            const newElement = elements[newIndex];
            if (!newElement) return;

            setFocusedIndex(newIndex);

            const containerRect = container.getBoundingClientRect();
            const elementRect = newElement.getBoundingClientRect();

            if (elementRect.bottom > containerRect.bottom) {
                container.scrollTop += elementRect.bottom - containerRect.bottom;
            } else if (elementRect.top < containerRect.top) {
                container.scrollTop -= containerRect.top - elementRect.top;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [focusedIndex, handlePopupVisibilityChange, handleSelect, shouldPreventListener]);

    const shouldShowNoContentInfo = emojis.length === 0;

    return (
        <StyledEmojiPickerEmojis
            className="chayns-scrollbar"
            $shouldPreventScroll={shouldShowSkinTonePopup}
            $shouldShowNoContentInfo={shouldShowNoContentInfo}
            ref={combinedRef}
        >
            {emojis.map(({ emoji, name, skin_tone_support }, index) => (
                <Emoji
                    key={emoji}
                    emoji={emoji}
                    name={name}
                    index={index}
                    isSelected={index === focusedIndex}
                    isSkinToneSupported={!isHistory && skin_tone_support}
                    shouldShowSkinTonePopup={
                        index === focusedIndex &&
                        !isHistory &&
                        skin_tone_support &&
                        shouldShowSkinTonePopup
                    }
                    onRightClick={setFocusedIndex}
                    onPopupVisibilityChange={handlePopupVisibilityChange}
                    onSelect={(selectedEmoji) =>
                        handleSelect({ emoji: selectedEmoji, name, skin_tone_support }, index)
                    }
                    emojiList={emojiList}
                />
            ))}
            {shouldShowNoContentInfo && (
                <StyledEmojiPickerEmojisNoContentInfo>
                    Hier werden die zuletzt verwendeten Emojis angezeigt, die über diese Auswahl
                    gewählt wurden.
                </StyledEmojiPickerEmojisNoContentInfo>
            )}
        </StyledEmojiPickerEmojis>
    );
};

export default EmojiPickerEmojiList;
