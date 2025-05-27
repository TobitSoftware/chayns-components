import { getAccessToken } from 'chayns-api';

const URL = 'https://webapi.tobit.com/AccountService/v1.0/chayns/friends?friend=##personId##';

interface PostFriendsResult {
    creationTime: Date;
    firstName: string;
    fullName: string;
    lastName: string;
    personId: string;
    userId: number;
    verificationState: number;
}

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
        return (await response.json()) as PostFriendsResult;
    }

    return undefined;
};
