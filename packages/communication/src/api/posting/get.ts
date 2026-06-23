import { getAccessToken, getSite } from 'chayns-api';
import { COMMENT_API_BASE_URL } from '../../constants/urls';

interface GetPostingOptions {
    commentType: number;
    postingId: string;
}

interface GetPostingResult {
    commentCount: number;
    likeCount: number;
    userMayReact: boolean;
    userHasReacted: boolean;
    reactionsEnabled: boolean;
    userMayComment: boolean;
    commentsEnabled: boolean;
    authorizationType: number;
}

export const getPosting = async ({ postingId, commentType }: GetPostingOptions) => {
    const { locationId } = getSite();
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
        return { status: 403 };
    }

    const response = await fetch(
        `${COMMENT_API_BASE_URL}Posting/overview/${locationId}/${commentType}/${postingId}`,
        {
            headers: {
                Accept: 'application/json',
                Authorization: `bearer ${accessToken}`,
            },
            method: 'GET',
        },
    );

    if (response.ok) {
        const data = (await response.json()) as GetPostingResult;

        return {
            status: response.status,
            data,
        };
    }

    return {
        status: response.status,
    };
};
