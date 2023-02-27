import { useCallback, useEffect, useRef, useState } from 'react';
import { getEmojiHistory } from '../api/item-storage/get';
import { putEmojiHistory } from '../api/item-storage/put';
import type { Category } from '../types/category';

export interface HistoryItem {
    count: number;
    emoji: string;
    modifiedTime: string;
    name: string;
    skin_tone_support: boolean;
}

interface UseEmojiHistoryOptions {
    accessToken?: string;
    personId?: string;
    selectedCategory: Category;
}

export const useEmojiHistory = ({
    accessToken,
    personId,
    selectedCategory,
}: UseEmojiHistoryOptions) => {
    const [historyEmojis, setHistoryEmojis] = useState<HistoryItem[]>([]);

    const tempHistoryEmojis = useRef<HistoryItem[] | null>(null);

    const addOrUpdateEmojiInHistory = useCallback(
        async ({
            emoji,
            name,
            skin_tone_support,
        }: {
            emoji: string;
            name: string;
            skin_tone_support: boolean;
        }) => {
            if (typeof accessToken !== 'string' || typeof personId !== 'string') {
                return;
            }

            const newHistoryEmojis = Array.from(tempHistoryEmojis.current ?? historyEmojis);

            const historyItemIndex = newHistoryEmojis.findIndex((item) => item.emoji === emoji);

            let historyItem;

            if (historyItemIndex > -1) {
                [historyItem] = newHistoryEmojis.splice(historyItemIndex, 1);
            }

            newHistoryEmojis.push({
                count: (historyItem?.count ?? 0) + 1,
                emoji,
                modifiedTime: new Date().toISOString(),
                name,
                skin_tone_support,
            });

            newHistoryEmojis.sort((a, b) => {
                if (a.count === b.count) {
                    return new Date(b.modifiedTime).getTime() - new Date(a.modifiedTime).getTime();
                }

                return b.count - a.count;
            });

            const { data } = await putEmojiHistory({
                accessToken,
                personId,
                value: newHistoryEmojis.slice(0, 50),
            });

            if (data) {
                if (selectedCategory === 'history') {
                    tempHistoryEmojis.current = data;
                } else {
                    tempHistoryEmojis.current = null;

                    setHistoryEmojis(data);
                }
            }
        },
        [accessToken, historyEmojis, personId, selectedCategory]
    );

    const loadHistoryEmojis = useCallback(async () => {
        if (typeof accessToken !== 'string' || typeof personId !== 'string') {
            return;
        }

        const { data } = await getEmojiHistory({ accessToken, personId });

        if (data) {
            setHistoryEmojis(data);
        }
    }, [accessToken, personId]);

    useEffect(() => {
        void loadHistoryEmojis();
    }, [loadHistoryEmojis]);

    useEffect(() => {
        if (selectedCategory !== 'history' && tempHistoryEmojis.current) {
            setHistoryEmojis(tempHistoryEmojis.current);
        }
    }, [selectedCategory]);

    return { addOrUpdateEmojiInHistory, historyEmojis: historyEmojis.slice(0, 25) };
};
