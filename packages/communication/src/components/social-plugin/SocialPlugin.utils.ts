import type { Comment } from './SocialPlugin.types';

export const sortComments = (comments: Comment[]): Comment[] =>
    [...comments].sort(
        (left, right) =>
            new Date(left.creationTime).getTime() - new Date(right.creationTime).getTime(),
    );

interface InsertCommentIntoCommentsOptions {
    comments: Comment[];
    newComment: Comment;
    parentCommentId?: Comment['id'];
}

export const insertCommentIntoComments: (
    options: InsertCommentIntoCommentsOptions,
) => Comment[] = ({ comments, newComment, parentCommentId }) => {
    if (!parentCommentId) {
        return comments.concat([newComment]);
    }

    let hasInsertedComment = false;

    const updatedComments = comments.map((comment) => {
        if (comment.id === parentCommentId) {
            hasInsertedComment = true;

            return {
                ...comment,
                comments: (comment.comments ?? []).concat([newComment]),
            };
        }

        return comment;
    });

    return hasInsertedComment ? updatedComments : comments.concat([newComment]);
};

interface RemoveCommentFromCommentsOptions {
    comments: Comment[];
    id: Comment['id'];
}

export const removeCommentFromComments: (
    options: RemoveCommentFromCommentsOptions,
) => Comment[] = ({ comments, id }) => {
    let hasRemovedComment = false;

    const updatedComments = comments.reduce<Comment[]>((result, comment) => {
        if (comment.id === id) {
            hasRemovedComment = true;

            return result;
        }

        if (!comment.comments?.length) {
            result.push(comment);

            return result;
        }

        const updatedChildComments = removeCommentFromComments({
            comments: comment.comments,
            id,
        });

        if (updatedChildComments !== comment.comments) {
            hasRemovedComment = true;

            result.push({
                ...comment,
                comments: updatedChildComments,
            });

            return result;
        }

        result.push(comment);

        return result;
    }, []);

    return hasRemovedComment ? updatedComments : comments;
};
