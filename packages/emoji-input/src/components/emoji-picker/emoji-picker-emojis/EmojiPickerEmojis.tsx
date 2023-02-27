import emojiLib from 'emojilib';
import React, { FC, useCallback, useMemo } from 'react';
import emojiList from 'unicode-emoji-json/data-by-emoji.json';
import emojiCategories from 'unicode-emoji-json/data-by-group.json';
import germanEmojiLib from '../../../constants/emoji-de-DE.json';
import { useEmojiHistory } from '../../../hooks/emojiHistory';
import type { Category } from '../../../types/category';
import Emoji from './emoji/Emoji';
import { StyledEmojiPickerEmojis } from './EmojiPickerEmojis.styles';

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
    const { addOrUpdateEmojiInHistory, historyEmojis } = useEmojiHistory({
        accessToken,
        personId,
        selectedCategory,
    });

    const handleSelect = useCallback(
        ({
            emoji,
            name,
            skin_tone_support,
        }: {
            emoji: string;
            name: string;
            skin_tone_support: boolean;
        }) => {
            onSelect(emoji);

            void addOrUpdateEmojiInHistory({ emoji, name, skin_tone_support });
        },
        [addOrUpdateEmojiInHistory, onSelect]
    );

    const emojis = useMemo(() => {
        if (searchString.trim() !== '') {
            const lowerSearchString = searchString.toLowerCase();

            const searchResults: JSX.Element[] = [];

            Object.entries(emojiList).forEach(([emoji, { name, skin_tone_support }]) => {
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
                            emoji={emoji}
                            isSkinToneSupported={skin_tone_support}
                            key={name}
                            onSelect={(e) => handleSelect({ emoji: e, name, skin_tone_support })}
                        />
                    );
                }
            });

            return searchResults;
        }

        if (selectedCategory === 'history') {
            return historyEmojis.map(({ emoji, name, skin_tone_support }) => (
                <Emoji
                    emoji={emoji}
                    key={name}
                    onSelect={(e) => handleSelect({ emoji: e, name, skin_tone_support })}
                    isSkinToneSupported={false}
                />
            ));
        }

        return emojiCategories
            .find(({ slug }) => slug === selectedCategory)
            ?.emojis.map(({ emoji, name, skin_tone_support }) => (
                <Emoji
                    emoji={emoji}
                    isSkinToneSupported={skin_tone_support}
                    key={name}
                    onSelect={(e) => handleSelect({ emoji: e, name, skin_tone_support })}
                />
            ));
    }, [handleSelect, historyEmojis, searchString, selectedCategory]);

    return <StyledEmojiPickerEmojis>{emojis}</StyledEmojiPickerEmojis>;
};

EmojiPickerEmojis.displayName = 'EmojiPickerEmojis';

export default EmojiPickerEmojis;
