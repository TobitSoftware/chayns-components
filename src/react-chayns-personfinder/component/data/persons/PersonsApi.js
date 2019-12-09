
const RELATIONS_SERVER_URL = 'https://relations.chayns.net/relations/';
const SITE_SERVER_URL = 'https://chayns2.tobit.com/SiteSearchApi/location/search/';
const FRIENDS_SERVER_URL = 'https://webapi.tobit.com/AccountService/v1.0/chayns/friends';

export const fetchFriends = async () => {
    let result = [];

    const response = await fetch(FRIENDS_SERVER_URL, {
        method: 'GET',
        headers: {
            Authorization: `bearer ${chayns.env.user.tobitAccessToken}`,
            Accept: 'application/json',
        },
    });

    if (response.ok) {
        result = response.status !== 204 ? await response.json() : [];
    } else {
        // TODO: error handling
        console.error('req failed', response.status);
    }
    return result;
};

export const setFriend = async (personId, friendship = true) => {
    const response = await fetch(`${FRIENDS_SERVER_URL}?friend=${personId}`, {
        method: friendship ? 'POST' : 'DELETE',
        headers: {
            Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
        },
    });

    return response.status === 200;
};


export const fetchPersons = async (value, skip, take) => {
    let result = [];
    const response = await fetch(`${RELATIONS_SERVER_URL}person?query=${value}&skip=${skip}&take=${take}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `bearer ${chayns.env.user.tobitAccessToken}`,
        },
    });

    if (response.ok) {
        result = response.status !== 204 ? await response.json() : [];
    } else {
        // TODO: error handling
        console.error('req failed', response.status);
    }

    return result;
};

export const fetchSites = async (value, skip, take) => {
    let result = [];
    const response = await fetch(`${SITE_SERVER_URL}${value}/?skip=${skip}&take=${take}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });

    if (response.ok) {
        result = response.status !== 204 ? await response.json() : [];
    } else {
        // TODO: error handling
        console.error('req failed', response.status);
    }

    return result;
};
