import { getAccessToken } from 'chayns-api';
import { COMMENT_API_BASE_URL } from '../../constants/urls';

interface DeleteCommentOptions {
    id: number;
}

export const deleteComment = async ({ id }: DeleteCommentOptions) => {
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
        return { status: 403 };
    }

    const response = await fetch(`${COMMENT_API_BASE_URL}Comment/${id}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `bearer ${accessToken}`,
        },
        method: 'DELETE',
    });

    return {
        status: response.status,
    };
};
