import { getAccessToken, getSite, getUser } from 'chayns-api';
import { COMMENT_API_BASE_URL } from '../../constants/urls';

interface PostCommentOptions {
    commentType: number;
    imageUrl?: string;
    postingId: string;
    parentCommentId?: number;
    text?: string;
}

interface PostCommentBody {
    commentTypeId: number;
    imageUrl?: string;
    locationId: number;
    originalPostingId: string;
    parentCommentId?: number;
    personId: string;
    text?: string;
}

export const postComment = async ({
    commentType,
    imageUrl,
    postingId,
    parentCommentId,
    text,
}: PostCommentOptions) => {
    const { locationId } = getSite();
    const personId = getUser()?.personId;
    const { accessToken } = await getAccessToken();

    if (!accessToken || !personId) {
        return { status: 403 };
    }

    const body: PostCommentBody = {
        commentTypeId: commentType,
        imageUrl,
        locationId,
        originalPostingId: postingId,
        parentCommentId,
        personId,
        text,
    };

    const response = await fetch(`${COMMENT_API_BASE_URL}Comment`, {
        headers: {
            Accept: 'application/json',
            Authorization: `bearer ${accessToken}`,
        },
        method: 'POST',
        body: JSON.stringify(body),
    });

    if (response.ok) {
        const data = (await response.json()) as { id: number };

        return {
            status: response.status,
            data: data.id,
        };
    }

    return {
        status: response.status,
    };
};
