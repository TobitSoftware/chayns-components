import { Input } from '@chayns-components/core';
import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import emojiCategories from 'unicode-emoji-json/data-by-group.json';
import type { Category } from '../../types/category';
import EmojiPickerCategories from './emoji-picker-categories/EmojiPickerCategories';
import EmojiPickerEmojis from './emoji-picker-emojis/EmojiPickerEmojis';
import { StyledEmojiPicker } from './EmojiPicker.styles';

export type EmojiPickerProps = {
    /**
     * Access token of the logged-in user. Is needed to load and save the history of the emojis.
     */
    accessToken?: string;
    /**
     * Function executed when an emoji is selected in the popup
     * @param {string} emoji - Emoji that was selected
     */
    onSelect: (emoji: string) => void;
    /**
     * Person id of the logged-in user. Is needed to load and save the history of the emojis.
     */
    personId?: string;
};
const EmojiPicker: FC<EmojiPickerProps> = ({ accessToken, onSelect, personId }) => {
    const [searchString, setSearchString] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(emojiCategories[0]?.slug as Category);

    const handleCategorySelect = useCallback((category: Category) => {
        setSearchString('');
        setSelectedCategory(category);
    }, []);

    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value);
    }, []);

    return (
        <StyledEmojiPicker>
            <Input onChange={handleSearchChange} placeholder="Suchen" value={searchString} />
            <EmojiPickerEmojis
                accessToken={accessToken}
                onSelect={onSelect}
                personId={personId}
                searchString={searchString}
                selectedCategory={selectedCategory}
            />
            <EmojiPickerCategories
                onSelect={handleCategorySelect}
                searchString={searchString}
                selectedCategory={selectedCategory}
            />
        </StyledEmojiPicker>
    );
};

EmojiPicker.displayName = 'EmojiPicker';

export default EmojiPicker;
