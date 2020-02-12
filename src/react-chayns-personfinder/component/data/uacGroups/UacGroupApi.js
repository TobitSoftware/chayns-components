/* eslint-disable import/prefer-default-export,no-console */

export const fetchGroups = async () => {
    let result = [];
    const response = await fetch(`https://sub50.tobit.com/backend/${chayns.env.site.locationId}/UserGroup`, {
        method: 'GET',
        headers: {
            Authorization: `bearer ${chayns.env.user.tobitAccessToken}`,
            Accept: 'application/json',
        },
    });

    if (response.ok) {
        result = await response.json().catch(() => []);
    } else {
        console.error('[chayns components] Personfinder: failed to fetch uac groups', response.status);
    }
    return result;
};
