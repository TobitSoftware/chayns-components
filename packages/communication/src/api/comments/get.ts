import type { Comment } from '../../components/social-plugin/SocialPlugin.types';
import { getAccessToken, getSite } from 'chayns-api';
import { COMMENT_API_BASE_URL } from '../../constants/urls';

interface GetCommentsOptions {
    commentType: number;
    postingId: string;
    skip?: number;
    take?: number;
}

interface GetCommentsResult {
    authorizationType: number;
    comments: Comment[];
    creationTime: string;
    reactions: unknown[];
    userMayComment: boolean;
}

export const getComments = async ({
    commentType,
    postingId,
    skip,
    take = 10,
}: GetCommentsOptions) => {
    const { locationId } = getSite();
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
        return { status: 403 };
    }

    let skipTake = '';
    if (skip && take) {
        skipTake = `?skip=${skip}&take=${take}`;
    } else if (skip) {
        skipTake = `?skip=${skip}`;
    } else if (take) {
        skipTake = `?take=${take}`;
    }

    const response = await fetch(
        `${COMMENT_API_BASE_URL}Comment/${locationId}/${commentType}/${postingId}${skipTake}`,
        {
            headers: {
                Accept: 'application/json',
                Authorization: `bearer ${accessToken}`,
            },
            method: 'GET',
        },
    );

    if (response.ok) {
        const data = (await response.json()) as GetCommentsResult;

        return {
            status: response.status,
            data: data.comments,
        };
    }

    return {
        status: response.status,
    };
};
