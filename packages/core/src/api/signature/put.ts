import { SIGNATURE_SERVER_URL } from '../../constants/serverUrls';

export const putUserSignature = async (dataURL: string) => {
    if (!chayns.env.user.isAuthenticated) {
        return false;
    }

    try {
        const response = await fetch(SIGNATURE_SERVER_URL, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                authorization: `bearer ${chayns.env.user.tobitAccessToken}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify({ value: dataURL }),
        });

        if (response.ok) {
            return true;
        }

        console.error(
            '[chayns components] Signature: failed to put user signature',
            response.status
        );
    } catch (ex) {
        console.error('[chayns components] Signature: failed to put user signature', ex);
    }

    return false;
};
