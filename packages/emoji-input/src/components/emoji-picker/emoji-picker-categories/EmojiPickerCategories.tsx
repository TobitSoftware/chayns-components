import React, { FC, useMemo } from 'react';
import unicodeEmoji from 'unicode-emoji-json/data-by-group.json';
import { CATEGORY_EMOJIS } from '../../../constants/categories';
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

    const categories = useMemo(() => {
        const categorySlugs = unicodeEmoji.map(({ slug }) => slug);

        categorySlugs.unshift('history');

        return categorySlugs.map((slug) => {
            const isSelected = selectedCategory === slug && !isSearchStringGiven;

            return (
                <StyledMotionEmojiPickerCategory
                    animate={{
                        filter: `grayscale(${isSelected ? 0 : 0.75})`,
                        opacity: isSelected ? 1 : 0.5,
                    }}
                    className="prevent-lose-focus"
                    initial={false}
                    key={slug}
                    onClick={() => onSelect(slug as Category)}
                    transition={{ duration: 0.2 }}
                >
                    {CATEGORY_EMOJIS[slug as Category]}
                </StyledMotionEmojiPickerCategory>
            );
        });
    }, [isSearchStringGiven, onSelect, selectedCategory]);

    return <StyledEmojiPickerCategories>{categories}</StyledEmojiPickerCategories>;
};

EmojiPickerCategories.displayName = 'EmojiPickerCategories';

export default EmojiPickerCategories;
