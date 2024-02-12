import { getDevice } from 'chayns-api';
import emojiLib from 'emojilib';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import emojiList from 'unicode-emoji-json/data-by-emoji.json';
import emojiCategories from 'unicode-emoji-json/data-by-group.json';
import germanEmojiLib from '../../../constants/emoji-de-DE.json';
import { useEmojiHistory } from '../../../hooks/emojiHistory';
import type { Category } from '../../../types/category';
import Emoji from './emoji/Emoji';
import {
    StyledEmojiPickerEmojis,
    StyledEmojiPickerEmojisNoContentInfo,
} from './EmojiPickerEmojis.styles';

export type EmojiPickerEmojisProps = {
    accessToken?: string;
    onSelect: (emoji: string) => void;
    personId?: string;
    searchString: string;
    selectedCategory: Category;
};

const EmojiPickerEmojis: FC<EmojiPickerEmojisProps> = ({
    accessToken,
    onSelect,
    personId,
    searchString,
    selectedCategory,
}) => {
    const [shouldPreventScroll, setShouldPreventScroll] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number>(0);

    const emojiRef = useRef<HTMLDivElement>(null);
    const shouldPreventEmojiControlsRef = useRef(false);
    const [shouldShowSkinTonePopup, setShouldShowSkinTonePopup] = useState(false);

    const { browser } = getDevice();

    const { addOrUpdateEmojiInHistory, historyEmojis } = useEmojiHistory({
        accessToken,
        personId,
        selectedCategory,
    });

    const handlePopupVisibilityChange = useCallback((isVisible: boolean) => {
        setShouldShowSkinTonePopup(isVisible);
        shouldPreventEmojiControlsRef.current = isVisible;
        setShouldPreventScroll(isVisible);
    }, []);

    const handleSelect = useCallback(
        ({
            emoji,
            name,
            skin_tone_support,
            index,
        }: {
            emoji: string;
            name: string;
            skin_tone_support: boolean;
            index?: number;
        }) => {
            onSelect(emoji);

            if (index) {
                setFocusedIndex(index);
            }

            void addOrUpdateEmojiInHistory({ emoji, name, skin_tone_support });
        },
        [addOrUpdateEmojiInHistory, onSelect],
    );

    useEffect(() => {
        if (selectedCategory) {
            setFocusedIndex(0);

            const container = emojiRef.current;

            if (!container) {
                return;
            }

            container.scrollTop = 0;
        }
    }, [selectedCategory]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                !shouldPreventEmojiControlsRef.current &&
                (event.key === 'ArrowUp' ||
                    event.key === 'ArrowDown' ||
                    event.key === 'ArrowLeft' ||
                    event.key === 'ArrowRight')
            ) {
                event.preventDefault();
                const children = emojiRef.current?.children;
                if (children && children.length > 0) {
                    const container = emojiRef.current;
                    let newIndex = focusedIndex !== null ? focusedIndex : 0;

                    if (event.ctrlKey) {
                        return;
                    }

                    if (event.key === 'ArrowUp') {
                        newIndex = (newIndex - 6) % children.length;
                    } else if (event.key === 'ArrowDown') {
                        newIndex = (newIndex + 6) % children.length;
                    } else if (event.key === 'ArrowLeft') {
                        newIndex = (newIndex - 1) % children.length;
                    } else if (event.key === 'ArrowRight') {
                        newIndex = (newIndex + 1) % children.length;
                    }

                    // remove focus from the old element
                    if (focusedIndex !== null) {
                        const prevElement = children[focusedIndex] as HTMLDivElement;
                        prevElement.tabIndex = -1;
                    }

                    if (newIndex < 0) {
                        newIndex = children.length - 1;
                    } else if (newIndex > children.length - 1) {
                        newIndex = 0;
                    }

                    setFocusedIndex(newIndex);

                    // Set focus to the element
                    const newElement = children[newIndex] as HTMLDivElement;
                    newElement.tabIndex = 0;

                    const containerRect = container.getBoundingClientRect();
                    const elementRect = newElement.getBoundingClientRect();

                    if (elementRect.bottom > containerRect.bottom) {
                        container.scrollTop += elementRect.bottom - containerRect.bottom;
                    } else if (elementRect.top < containerRect.top) {
                        container.scrollTop -= containerRect.top - elementRect.top;
                    }
                }
            } else if (
                event.key === 'Enter' &&
                !shouldPreventEmojiControlsRef.current &&
                focusedIndex !== null
            ) {
                if (event.ctrlKey) {
                    setShouldShowSkinTonePopup(true);

                    return;
                }

                const { dataset } = emojiRef.current?.children[focusedIndex] as HTMLDivElement;

                const { emoji, name, skinToneSupport } = dataset;

                if (!emoji || !name || !skinToneSupport) {
                    return;
                }

                handleSelect({ emoji, name, skin_tone_support: skinToneSupport === 'true' });
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [focusedIndex, handleSelect]);

    const handleRightClick = useCallback((index: number) => {
        setFocusedIndex(index);
    }, []);

    const emojis = useMemo(() => {
        if (searchString.trim() !== '') {
            const lowerSearchString = searchString.toLowerCase();

            const searchResults: JSX.Element[] = [];

            Object.entries(emojiList).forEach(([emoji, { name, skin_tone_support }], index) => {
                // @ts-expect-error: Type is correct here
                const keywords = emojiLib[emoji] as string[] | undefined;
                // @ts-expect-error: Type is correct here
                const germanKeywords = germanEmojiLib[emoji] as string[] | undefined;

                if (
                    name.includes(lowerSearchString) ||
                    keywords?.some((keyword) => keyword.includes(lowerSearchString)) ||
                    germanKeywords?.some((keyword) => keyword.includes(lowerSearchString))
                ) {
                    searchResults.push(
                        <Emoji
                            shouldShowSkinTonePopup={
                                index === focusedIndex &&
                                skin_tone_support &&
                                shouldShowSkinTonePopup
                            }
                            isSelected={index === focusedIndex}
                            emoji={emoji}
                            index={index}
                            onRightClick={handleRightClick}
                            isSkinToneSupported={skin_tone_support}
                            key={name}
                            name={name}
                            onPopupVisibilityChange={handlePopupVisibilityChange}
                            onSelect={(e) =>
                                handleSelect({ emoji: e, name, skin_tone_support, index })
                            }
                        />,
                    );
                }
            });

            return searchResults;
        }

        if (selectedCategory === 'history') {
            return historyEmojis.map(({ emoji, name, skin_tone_support }, index) => (
                <Emoji
                    isSelected={index === focusedIndex}
                    shouldShowSkinTonePopup={
                        index === focusedIndex && skin_tone_support && shouldShowSkinTonePopup
                    }
                    emoji={emoji}
                    name={name}
                    key={name}
                    index={index}
                    onRightClick={handleRightClick}
                    onPopupVisibilityChange={handlePopupVisibilityChange}
                    onSelect={(e) => handleSelect({ emoji: e, name, skin_tone_support, index })}
                    isSkinToneSupported={false}
                />
            ));
        }

        return emojiCategories
            .find(({ slug }) => slug === selectedCategory)
            ?.emojis.map(({ emoji, name, skin_tone_support }, index) => (
                <Emoji
                    isSelected={index === focusedIndex}
                    shouldShowSkinTonePopup={
                        index === focusedIndex && skin_tone_support && shouldShowSkinTonePopup
                    }
                    emoji={emoji}
                    name={name}
                    index={index}
                    onRightClick={handleRightClick}
                    isSkinToneSupported={skin_tone_support}
                    key={name}
                    onPopupVisibilityChange={handlePopupVisibilityChange}
                    onSelect={(e) => handleSelect({ emoji: e, name, skin_tone_support, index })}
                />
            ));
    }, [
        searchString,
        selectedCategory,
        focusedIndex,
        shouldShowSkinTonePopup,
        handleRightClick,
        handlePopupVisibilityChange,
        handleSelect,
        historyEmojis,
    ]);

    const shouldShowNoContentInfo = !emojis || emojis.length === 0;

    return (
        <StyledEmojiPickerEmojis
            browser={browser?.name}
            shouldPreventScroll={shouldPreventScroll}
            shouldShowNoContentInfo={shouldShowNoContentInfo}
            ref={emojiRef}
        >
            {emojis}
            {shouldShowNoContentInfo && (
                <StyledEmojiPickerEmojisNoContentInfo>
                    Hier werden die zuletzt verwendeten Emojis angezeigt, die über diese Auswahl
                    gewählt wurden.
                </StyledEmojiPickerEmojisNoContentInfo>
            )}
        </StyledEmojiPickerEmojis>
    );
};

EmojiPickerEmojis.displayName = 'EmojiPickerEmojis';

export default EmojiPickerEmojis;
