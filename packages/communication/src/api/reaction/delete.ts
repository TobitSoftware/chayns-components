import { getAccessToken, getUser } from 'chayns-api';
import { COMMENT_API_BASE_URL } from '../../constants/urls';

interface DeleteReactionOptions {
    commentType: number;
    postingId: string;
}

interface DeleteReactionBody {
    commentTypeId: number;
    originalPostingId: string;
    personId: string;
    postingId: number | null;
}

export const deleteReaction = async ({ postingId, commentType }: DeleteReactionOptions) => {
    const { accessToken } = await getAccessToken();
    const personId = getUser()?.personId;

    if (!accessToken || !personId) {
        return { status: 403 };
    }

    const parsedPostingId = Number(postingId);
    const body: DeleteReactionBody = {
        commentTypeId: commentType,
        originalPostingId: postingId,
        personId,
        postingId: Number.isFinite(parsedPostingId) ? parsedPostingId : null,
    };

    const response = await fetch(`${COMMENT_API_BASE_URL}Reaction`, {
        body: JSON.stringify(body),
        headers: {
            Accept: 'application/json',
            Authorization: `bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        method: 'DELETE',
    });

    return {
        status: response.status,
    };
};
