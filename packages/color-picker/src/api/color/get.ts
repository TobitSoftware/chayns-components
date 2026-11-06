import { getAccessToken, getSite } from 'chayns-api';
import { ITEM_STORAGE_URL } from '../../constants/color';
import { ItemStorageResult } from '../../types/colorPicker';

export const getSiteColors = async (): Promise<ItemStorageResult> => {
    const { accessToken } = await getAccessToken();
    const { id } = getSite();

    if (!accessToken) {
        return { value: [] };
    }

    const result = await fetch(
        `${ITEM_STORAGE_URL}/schemes/0/sites/${id}/keys/custom-colors
`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );

    if (result.status === 200) {
        return (await result.json()) as unknown as ItemStorageResult;
    }

    return { value: [] };
};
