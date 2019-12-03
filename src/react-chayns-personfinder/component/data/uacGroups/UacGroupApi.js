
export const fetchGroups = async () => {
    let result;
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
        console.error('req failed', response.status);
    }
    return result;
};
