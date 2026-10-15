import React, { FC, useCallback, useEffect, useState } from 'react';
import emojiLib from 'emojilib';
import germanEmojiLib from '../../../constants/emoji-de-DE.json';
import { useEmojiHistory } from '../../../hooks/emojiHistory';
import type { Category } from '../../../types/category';
import EmojiPickerEmojiList, {
    type PickerEmoji,
} from './emoji-picker-emoji-list/EmojiPickerEmojiList';

export type EmojiPickerEmojisProps = {
    accessToken?: string;
    onSelect: (emoji: string, shouldRestoreInputFocus?: boolean) => void;
    personId?: string;
    searchString: string;
    selectedCategory: Category;
};

type EmojiDictionary = Record<string, Omit<PickerEmoji, 'emoji'>>;
type EmojiCategory = { slug: string; emojis: PickerEmoji[] };

const EmojiPickerEmojis: FC<EmojiPickerEmojisProps> = ({
    accessToken,
    onSelect,
    personId,
    searchString,
    selectedCategory,
}) => {
    const [emojiCategories, setEmojiCategories] = useState<EmojiCategory[]>([]);
    const [emojiList, setEmojiList] = useState<EmojiDictionary>({});

    const { addOrUpdateEmojiInHistory, historyEmojis } = useEmojiHistory({
        accessToken,
        personId,
        selectedCategory,
    });

    const handleSelect = useCallback(
        (emoji: PickerEmoji, shouldRestoreInputFocus = false) => {
            onSelect(emoji.emoji, shouldRestoreInputFocus);
            void addOrUpdateEmojiInHistory(emoji);
        },
        [addOrUpdateEmojiInHistory, onSelect],
    );

    useEffect(() => {
        void import('unicode-emoji-json/data-by-group.json').then(({ default: categories }) => {
            setEmojiCategories(categories);
        });
        void import('unicode-emoji-json/data-by-emoji.json').then(({ default: emojis }) => {
            setEmojiList(emojis);
        });
    }, []);

    let visibleEmojis: PickerEmoji[];

    if (searchString.trim() !== '') {
        const lowerSearchString = searchString.toLowerCase();
        visibleEmojis = Object.entries(emojiList)
            .filter(([emoji, { name }]) => {
                const keywords = (emojiLib as Record<string, string[]>)[emoji];
                const germanKeywords = (germanEmojiLib as Record<string, string[]>)[emoji];

                return (
                    name.includes(lowerSearchString) ||
                    keywords?.some((keyword) => keyword.includes(lowerSearchString)) ||
                    germanKeywords?.some((keyword) => keyword.includes(lowerSearchString))
                );
            })
            .map(([emoji, data]) => ({ emoji, ...data }));
    } else if (selectedCategory === 'history') {
        visibleEmojis = historyEmojis;
    } else {
        visibleEmojis = emojiCategories.find(({ slug }) => slug === selectedCategory)?.emojis ?? [];
    }

    // Reset navigation and dismiss popups when the displayed identities or their order change,
    // following the existing category-change rule without taking focus from the search field.
    const isHistory = searchString.trim() === '' && selectedCategory === 'history';
    const listKey = JSON.stringify([
        selectedCategory,
        isHistory,
        visibleEmojis.map(({ emoji }) => emoji),
    ]);

    return (
        <EmojiPickerEmojiList
            key={listKey}
            emojis={visibleEmojis}
            emojiList={emojiList}
            isHistory={isHistory}
            onSelect={handleSelect}
        />
    );
};

EmojiPickerEmojis.displayName = 'EmojiPickerEmojis';

export default EmojiPickerEmojis;
