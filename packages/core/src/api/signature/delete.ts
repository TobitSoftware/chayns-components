import { SIGNATURE_SERVER_URL } from '../../constants/signature';

export const deleteUserSignature = async () => {
    if (!chayns.env.user.isAuthenticated) {
        return false;
    }

    try {
        const response = await fetch(SIGNATURE_SERVER_URL, {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
                authorization: `bearer ${chayns.env.user.tobitAccessToken}`,
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
