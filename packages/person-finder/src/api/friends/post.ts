import { getAccessToken } from 'chayns-api';
import { PersonEntry } from '../../types/personFinder';

const URL = 'https://webapi.tobit.com/AccountService/v1.0/chayns/friends?friend=##personId##';

export const postFriends = async (personId: string) => {
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
        return undefined;
    }

    const requestInit: RequestInit = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        method: 'POST',
    };

    const response = await fetch(URL.replace('##personId##', personId), requestInit);

    if (response.status === 200) {
        return (await response.json()) as PersonEntry;
    }

    return undefined;
};
