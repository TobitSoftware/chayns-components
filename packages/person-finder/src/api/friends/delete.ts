import { getAccessToken } from 'chayns-api';

const URL = 'https://webapi.tobit.com/AccountService/v1.0/chayns/friends?friend=##personId##';

export const deleteFriends = async (personId: string) => {
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
        return false;
    }

    const requestInit: RequestInit = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        method: 'DELETE',
    };

    const response = await fetch(URL.replace('##personId##', personId), requestInit);

    return response.status === 200;
};
