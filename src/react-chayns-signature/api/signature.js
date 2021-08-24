const SERVER_URL =
    'https://webapi.tobit.com/AccountService/v1.0/General/PersonKeyValue/signature';

export const getUserSignature = async () => {
    if (!chayns.env.user.isAuthenticated) {
        return null;
    }

    try {
        const response = await fetch(SERVER_URL, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                authorization: `bearer ${chayns.env.user.tobitAccessToken}`,
            },
        });

        if (response.status === 200) {
            const { value } = await response.json();

            return value;
        }

        if (response.status === 204) {
            return null;
        }

        console.error(
            '[chayns components] Signature: failed to get user signature',
            response.status
        );
    } catch (ex) {
        console.error(
            '[chayns components] Signature: failed to get user signature',
            ex
        );
    }

    return null;
};

export const putUserSignature = async (dataURL) => {
    if (!chayns.env.user.isAuthenticated) {
        return false;
    }

    try {
        const response = await fetch(SERVER_URL, {
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
        console.error(
            '[chayns components] Signature: failed to put user signature',
            ex
        );
    }

    return false;
};

export const deleteUserSignature = async () => {
    if (!chayns.env.user.isAuthenticated) {
        return false;
    }

    try {
        const response = await fetch(SERVER_URL, {
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
            response.status
        );
    } catch (ex) {
        console.error(
            '[chayns components] Signature: failed to delete user signature',
            ex
        );
    }

    return false;
};
