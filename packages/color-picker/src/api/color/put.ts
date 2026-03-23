import { getAccessToken, getSite } from 'chayns-api';
import { ITEM_STORAGE_URL } from '../../constants/color';

export const putSiteColors = async (colorsArray: string[]): Promise<boolean> => {
    const { accessToken } = await getAccessToken();
    const { id } = getSite();

    if (!accessToken) {
        return false;
    }

    const result = await fetch(
        `${ITEM_STORAGE_URL}/schemes/0/sites/${id}/keys/custom-colors
`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ value: colorsArray }),
        },
    );

    return result.status === 201;
};
