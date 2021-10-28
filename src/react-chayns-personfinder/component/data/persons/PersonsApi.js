/* eslint-disable no-console */
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';

const RELATIONS_SERVER_URL = 'https://relations.chayns.net/relations/';
const ADMIN_SERVER_URL = 'https://sub50.tobit.com/backend/';
const SITE_SERVER_URL = 'https://relations.chayns.net/relations/location/';
const FRIENDS_SERVER_URL =
    'https://webapi.tobit.com/AccountService/v1.0/chayns/friends';

const requestTracker = {};

const fetchHelper = (key, requestData) => {
    if (requestTracker[key] instanceof AbortController) {
        requestTracker[key].abort();
    }

    const controller = new AbortController();
    const { signal } = controller;
    requestTracker[key] = controller;

    return fetch(requestData.url, { ...requestData.config, signal });
};

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
        console.error(
            '[chayns components] Personfinder: failed to fetch friends',
            response.status
        );
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
    if (!chayns.env.user.isAuthenticated) {
        chayns.login();

        return Promise.reject(new Error('Not authenticated'));
    }
    let result = [];
    let url = `${RELATIONS_SERVER_URL}v2/person`;
    if (value.match(/^[A-NP-Z0-9]{3}-[A-NP-Z0-9]{5}$/)) {
        url += `?personId=${value}`;
    } else {
        url += `?skip=${skip}&take=${take}&query=${value}`;
    }

    const response = await fetchHelper('persons', {
        url,
        config: {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `bearer ${chayns.env.user.tobitAccessToken}`,
            },
        },
    });

    if (response.ok) {
        result = response.status !== 204 ? (await response.json()).list : [];
    } else {
        console.error(
            '[chayns components] Personfinder: failed to fetch persons',
            response.status
        );
    }

    return result;
};

export const fetchUacPersons = (uacId, locationId) => async (value) => {
    if (!chayns.env.user.isAuthenticated) {
        chayns.login();

        return Promise.reject(new Error('Not authenticated'));
    }
    let result = [];
    const response = await fetchHelper('uacPersons', {
        url: `${ADMIN_SERVER_URL}${
            locationId || chayns.env.site.locationId
        }/usergroup/${uacId}/users?filter=${value}`,
        config: {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `bearer ${chayns.env.user.tobitAccessToken}`,
            },
        },
    });

    if (response.ok) {
        result = response.status !== 204 ? await response.json() : [];
    } else {
        console.error(
            '[chayns components] Personfinder: failed to fetch persons',
            response.status
        );
    }

    return result;
};

export const fetchSites = async (value, skip, take) => {
    let result = [];
    const response = await fetchHelper('sites', {
        url: `${SITE_SERVER_URL}?query=${value}&skip=${skip}&take=${take}`,
        config: {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `bearer ${chayns.env.user.tobitAccessToken}`,
            },
        },
    });

    if (response.ok) {
        result = response.status !== 204 ? (await response.json()).list : [];
    } else {
        console.error(
            '[chayns components] Personfinder: failed to fetch sites',
            response.status
        );
    }

    return result;
};

export const fetchKnownPersons = async (value, skip, take) => {
    if (!chayns.env.user.isAuthenticated) {
        chayns.login();

        return Promise.reject(new Error('Not authenticated'));
    }
    let result = [];
    let url = `https://sub50.tobit.com/backend/${chayns.env.site.locationId}/User?sortByDate=true&skip=${skip}&limit=${take}`;
    if (value) {
        url += `&q=${value}`;
    }
    const response = await fetchHelper('knownPersons', {
        url,
        config: {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `bearer ${chayns.env.user.tobitAccessToken}`,
            },
        },
    });

    if (response.ok) {
        result = response.status !== 204 ? await response.json() : [];
    } else {
        console.error(
            '[chayns components] Personfinder: failed to fetch known persons',
            response.status
        );
    }
    return result;
};
