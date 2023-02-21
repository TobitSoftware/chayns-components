import React, { FC, useMemo } from 'react';
import unicodeEmoji from 'unicode-emoji-json/data-by-group.json';
import type { Category } from '../../../types/category';
import {
    StyledEmojiPickerCategories,
    StyledMotionEmojiPickerCategory,
} from './EmojiPickerCategories.styles';

export type EmojiPickerCategoriesProps = {
    onSelect: (category: Category) => void;
    searchString: string;
    selectedCategory: Category;
};

const EmojiPickerCategories: FC<EmojiPickerCategoriesProps> = ({
    onSelect,
    searchString,
    selectedCategory,
}) => {
    const isSearchStringGiven = searchString.trim() !== '';

    const categories = useMemo(
        () =>
            Object.entries(unicodeEmoji).map(([name, items]) => {
                const isSelected = selectedCategory === name && !isSearchStringGiven;

                return (
                    <StyledMotionEmojiPickerCategory
                        animate={{
                            filter: `grayscale(${isSelected ? 0 : 0.75})`,
                            opacity: isSelected ? 1 : 0.5,
                        }}
                        className="prevent-lose-focus"
                        initial={false}
                        key={name}
                        onClick={() => onSelect(name as Category)}
                        transition={{ duration: 0.2 }}
                    >
                        {items[0]?.emoji}
                    </StyledMotionEmojiPickerCategory>
                );
            }),
        [isSearchStringGiven, onSelect, selectedCategory]
    );

    return <StyledEmojiPickerCategories>{categories}</StyledEmojiPickerCategories>;
};

EmojiPickerCategories.displayName = 'EmojiPickerCategories';

export default EmojiPickerCategories;
