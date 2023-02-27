import { ITEM_STORAGE_BASE_URL } from '../../constants/externalServerUrl';
import type { HistoryItem } from '../../hooks/emojiHistory';
import type { ApiFunctionResult } from '../../types/api';

interface GetEmojiHistoryOptions {
    accessToken: string;
    personId: string;
}

interface GetEmojiHistoryResponseData {
    key: string;
    personId: string;
    schemeId: string;
    value: HistoryItem[];
}

export const getEmojiHistory = async ({
    accessToken,
    personId,
}: GetEmojiHistoryOptions): Promise<ApiFunctionResult<HistoryItem[]>> => {
    const requestInit: RequestInit = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        method: 'GET',
    };

    const url = `${ITEM_STORAGE_BASE_URL}/7/users/${personId}/keys/emojis`;

    const response = await fetch(url, requestInit);

    if (response.status === 200) {
        try {
            const data = (await response.json()) as GetEmojiHistoryResponseData;

            return { data: data.value, status: 200 };
        } catch (e) {
            // Do nothing
        }
    }

    return { status: response.status };
};
