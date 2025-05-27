import { getAccessToken } from 'chayns-api';

const URL = 'https://webapi.tobit.com/AccountService/v1.0/chayns/friends';

interface GetFriendsResult {
    creationTime: Date;
    firstName: string;
    fullName: string;
    lastName: string;
    personId: string;
    userId: number;
    verificationState: number;
}

export const getFriends = async () => {
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
        return undefined;
    }

    const requestInit: RequestInit = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        method: 'GET',
    };

    const response = await fetch(URL, requestInit);

    if (response.status === 200) {
        return (await response.json()) as GetFriendsResult[];
    }

    return undefined;
};
