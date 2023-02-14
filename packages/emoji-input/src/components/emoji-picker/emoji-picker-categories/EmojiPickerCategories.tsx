import React, { FC, useMemo } from 'react';
import unicodeEmoji from 'unicode-emoji-json/data-by-group.json';
import type { Category } from '../../../types/category';
import {
    StyledEmojiPickerCategories,
    StyledMotionEmojiPickerCategory,
} from './EmojiPickerCategories.styles';

export type EmojiPickerCategoriesProps = {
    onSelect: (category: Category) => void;
    selectedCategory: Category;
};

const EmojiPickerCategories: FC<EmojiPickerCategoriesProps> = ({ onSelect, selectedCategory }) => {
    const categories = useMemo(
        () =>
            Object.entries(unicodeEmoji).map(([name, items]) => (
                <StyledMotionEmojiPickerCategory
                    animate={{
                        filter: `grayscale(${selectedCategory === name ? 0 : 0.75})`,
                        opacity: selectedCategory === name ? 1 : 0.5,
                    }}
                    initial={false}
                    key={name}
                    onClick={() => onSelect(name as Category)}
                    transition={{ duration: 0.2 }}
                >
                    {items[0]?.emoji}
                </StyledMotionEmojiPickerCategory>
            )),
        [onSelect, selectedCategory]
    );

    return <StyledEmojiPickerCategories>{categories}</StyledEmojiPickerCategories>;
};

EmojiPickerCategories.displayName = 'EmojiPickerCategories';

export default EmojiPickerCategories;
