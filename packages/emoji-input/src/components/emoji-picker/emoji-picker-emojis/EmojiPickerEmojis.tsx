import emojiLib from 'emojilib';
import React, { FC, useMemo } from 'react';
import emojiList from 'unicode-emoji-json/data-by-emoji.json';
import emojiCategories from 'unicode-emoji-json/data-by-group.json';
import germanEmojiLib from '../../../constants/emoji-de-DE.json';
import type { Category } from '../../../types/category';
import { StyledEmojiPickerEmoji, StyledEmojiPickerEmojis } from './EmojiPickerEmojis.styles';

export type EmojiPickerEmojisProps = {
    onSelect: (emoji: string) => void;
    searchString: string;
    selectedCategory: Category;
};

const EmojiPickerEmojis: FC<EmojiPickerEmojisProps> = ({
    onSelect,
    searchString,
    selectedCategory,
}) => {
    const emojis = useMemo(() => {
        if (searchString.trim() !== '') {
            const lowerSearchString = searchString.toLowerCase();

            const searchResults: JSX.Element[] = [];

            Object.entries(emojiList).forEach(([emoji, { name }]) => {
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
                        <StyledEmojiPickerEmoji
                            className="prevent-lose-focus"
                            key={name}
                            onClick={() => onSelect(emoji)}
                        >
                            {emoji}
                        </StyledEmojiPickerEmoji>
                    );
                }
            });

            return searchResults;
        }

        return emojiCategories[selectedCategory].map(({ emoji, name }) => (
            <StyledEmojiPickerEmoji key={name} onClick={() => onSelect(emoji)}>
                {emoji}
            </StyledEmojiPickerEmoji>
        ));
    }, [onSelect, searchString, selectedCategory]);

    return <StyledEmojiPickerEmojis>{emojis}</StyledEmojiPickerEmojis>;
};

EmojiPickerEmojis.displayName = 'EmojiPickerEmojis';

export default EmojiPickerEmojis;
