import { getAccessToken } from 'chayns-api';
import type { GetUserSignatureResult } from '../../types/signature';
import { SIGNATURE_SERVER_URL } from '../../constants/signature';

export const getUserSignature = async (): Promise<string | undefined> => {
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
        return undefined;
    }

    try {
        const response = await fetch(SIGNATURE_SERVER_URL, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                authorization: `bearer ${accessToken}`,
            },
        });

        if (response.status === 200) {
            const { value } = (await response.json()) as GetUserSignatureResult;

            return value;
        }

        if (response.status === 204) {
            return undefined;
        }

        console.error(
            '[chayns components] Signature: failed to get user signature',
            response.status,
        );
    } catch (ex) {
        console.error('[chayns components] Signature: failed to get user signature', ex);
    }

    return undefined;
};
