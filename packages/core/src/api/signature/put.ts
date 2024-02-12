import { getAccessToken } from 'chayns-api';
import { SIGNATURE_SERVER_URL } from '../../constants/signature';

export const putUserSignature = async (dataURL: string) => {
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
        return false;
    }

    try {
        const response = await fetch(SIGNATURE_SERVER_URL, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                authorization: `bearer ${accessToken}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify({ value: dataURL }),
        });

        if (response.ok) {
            return true;
        }

        console.error(
            '[chayns components] Signature: failed to put user signature',
            response.status,
        );
    } catch (ex) {
        console.error('[chayns components] Signature: failed to put user signature', ex);
    }

    return false;
};
