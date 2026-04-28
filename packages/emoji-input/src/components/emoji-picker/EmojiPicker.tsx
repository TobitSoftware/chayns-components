import { Input } from '@chayns-components/core';
import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import type { Category } from '../../types/category';
import EmojiPickerCategories from './emoji-picker-categories/EmojiPickerCategories';
import EmojiPickerEmojis from './emoji-picker-emojis/EmojiPickerEmojis';
import { StyledEmojiPicker } from './EmojiPicker.styles';
import { TextStringProviderSSR, Translation } from '@chayns/textstrings';
import textStrings from '../../constants/textStrings';

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

const FirstEmojiSlug = 'smileys_emotion';

const EmojiPicker: FC<EmojiPickerProps> = ({ accessToken, onSelect, personId }) => {
    const [searchString, setSearchString] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(FirstEmojiSlug as Category);

    const handleCategorySelect = useCallback((category: Category) => {
        setSearchString('');
        setSelectedCategory(category);
    }, []);

    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value);
    }, []);

    const ts = textStrings.emojiPicker.placeholder;
    return (
        <TextStringProviderSSR libraries="chayns-components-v5-emoji-input" id="emoji-picker">
            <StyledEmojiPicker>
                <Input
                    onChange={handleSearchChange}
                    placeholder={<Translation textString={ts} />}
                    value={searchString}
                />
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
        </TextStringProviderSSR>
    );
};

EmojiPicker.displayName = 'EmojiPicker';

export default EmojiPicker;
