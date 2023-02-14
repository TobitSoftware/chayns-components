import React, { FC, useMemo } from 'react';
import unicodeEmoji from 'unicode-emoji-json/data-by-group.json';
import type { Category } from '../../../types/category';
import { StyledEmojiPickerEmoji, StyledEmojiPickerEmojis } from './EmojiPickerEmojis.styles';

export type EmojiPickerEmojisProps = {
    onSelect: (emoji: string) => void;
    selectedCategory: Category;
};

const EmojiPickerEmojis: FC<EmojiPickerEmojisProps> = ({ onSelect, selectedCategory }) => {
    const emojis = useMemo(
        () =>
            unicodeEmoji[selectedCategory].map(({ emoji, name }) => (
                <StyledEmojiPickerEmoji key={name} onClick={() => onSelect(emoji)}>
                    {emoji}
                </StyledEmojiPickerEmoji>
            )),
        [onSelect, selectedCategory]
    );

    return <StyledEmojiPickerEmojis>{emojis}</StyledEmojiPickerEmojis>;
};

EmojiPickerEmojis.displayName = 'EmojiPickerEmojis';

export default EmojiPickerEmojis;
