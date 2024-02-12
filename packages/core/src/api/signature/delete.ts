import { getAccessToken } from 'chayns-api';
import { SIGNATURE_SERVER_URL } from '../../constants/signature';

export const deleteUserSignature = async () => {
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
        return false;
    }

    try {
        const response = await fetch(SIGNATURE_SERVER_URL, {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
                authorization: `bearer ${accessToken}`,
            },
        });

        if (response.ok || response.status === 304) {
            return true;
        }

        console.error(
            '[chayns components] Signature: failed to delete user signature',
            response.status,
        );
    } catch (ex) {
        console.error('[chayns components] Signature: failed to delete user signature', ex);
    }

    return false;
};
