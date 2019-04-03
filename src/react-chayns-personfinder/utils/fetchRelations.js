async function fetchRelations(url, {
    query,
    skip,
    take,
}) {
    if (!chayns.env.user.isAuthenticated) {
        chayns.login();

        return Promise.reject(new Error('Not authenticated'));
    }

    const endpoint = `${url}?query=${query}&skip=${skip}&take=${take}`;

    const config = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
        },
        mode: 'cors',
    };

    try {
        const response = await fetch(endpoint, config);

        return await response.json();
    } catch (ex) {
        return [];
    }
}

export default fetchRelations;

const SERVER_URL = 'https://relations.chayns.net/relations';

export const fetchPersonRelations = (query, skip, take) => fetchRelations(`${SERVER_URL}/person`, {
    query,
    skip,
    take,
});

export const fetchSiteRelations = (query, skip, take) => fetchRelations(`${SERVER_URL}/location`, {
    query,
    skip,
    take,
});
