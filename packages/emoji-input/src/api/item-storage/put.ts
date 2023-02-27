import { ITEM_STORAGE_BASE_URL } from '../../constants/externalServerUrl';
import type { HistoryItem } from '../../hooks/emojiHistory';
import type { ApiFunctionResult } from '../../types/api';

interface PutEmojiHistoryOptions {
    accessToken: string;
    personId: string;
    value: HistoryItem[];
}

interface PutEmojiHistoryResponseData {
    key: string;
    personId: string;
    schemeId: string;
    value: HistoryItem[];
}

export const putEmojiHistory = async ({
    accessToken,
    personId,
    value,
}: PutEmojiHistoryOptions): Promise<ApiFunctionResult<HistoryItem[]>> => {
    const requestInit: RequestInit = {
        body: JSON.stringify({ value }),
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        method: 'PUT',
    };

    const url = `${ITEM_STORAGE_BASE_URL}/7/users/${personId}/keys/emojis`;

    const response = await fetch(url, requestInit);

    if (response.status === 201) {
        try {
            const data = (await response.json()) as PutEmojiHistoryResponseData;

            return { data: data.value, status: 200 };
        } catch (e) {
            // Do nothing
        }
    }

    return { status: response.status };
};
