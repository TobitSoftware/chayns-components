import { getAccessToken, getUser } from 'chayns-api';
import { COMMENT_API_BASE_URL } from '../../constants/urls';

interface PostReactionOptions {
    commentType: number;
    postingId: string;
}

interface PostReactionBody {
    commentTypeId: number;
    originalPostingId: string;
    personId: string;
    postingId: number;
    reactionId: number;
}

export const postReaction = async ({ postingId, commentType }: PostReactionOptions) => {
    const { accessToken } = await getAccessToken();
    const personId = getUser()?.personId;

    if (!accessToken || !personId) {
        return { status: 403 };
    }

    const parsedPostingId = Number(postingId);
    const body: PostReactionBody = {
        commentTypeId: commentType,
        originalPostingId: postingId,
        personId,
        postingId: Number.isFinite(parsedPostingId) ? parsedPostingId : 0,
        reactionId: 1,
    };

    const response = await fetch(`${COMMENT_API_BASE_URL}Reaction`, {
        body: JSON.stringify(body),
        headers: {
            Accept: 'application/json',
            Authorization: `bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        method: 'POST',
    });

    return {
        status: response.status,
    };
};
