import type { Comment } from './SocialPlugin.types';

export const sortComments = (comments: Comment[]): Comment[] =>
    [...comments].sort(
        (left, right) =>
            new Date(left.creationTime).getTime() - new Date(right.creationTime).getTime(),
    );

export const mergeComments = (
    currentComments: Comment[],
    incomingComments: Comment[],
): Comment[] => {
    const commentMap = new Map<number, Comment>();

    const collectComments = (comments: Comment[]) => {
        comments.forEach((comment) => {
            const { comments: childComments, ...commentWithoutChildren } = comment;

            const existingComment = commentMap.get(comment.id);

            commentMap.set(comment.id, {
                ...existingComment,
                ...commentWithoutChildren,
                comments: [],
            });

            if (childComments?.length) {
                collectComments(childComments);
            }
        });
    };

    collectComments(currentComments);
    collectComments(incomingComments);

    const rootComments: Comment[] = [];
    const comments = Array.from(commentMap.values());

    comments.forEach((comment) => {
        comment.comments = [];
    });

    comments.forEach((comment) => {
        if (comment.parentCommentId) {
            const parentComment = commentMap.get(comment.parentCommentId);

            if (parentComment) {
                parentComment.comments ??= [];
                parentComment.comments.push(comment);
                return;
            }
        }

        rootComments.push(comment);
    });

    const sortByCreationTime = (a: Comment, b: Comment) =>
        new Date(a.creationTime).getTime() - new Date(b.creationTime).getTime();

    const sortRecursive = (commentsToSort: Comment[]) => {
        commentsToSort.sort(sortByCreationTime);

        commentsToSort.forEach((comment) => {
            if (comment.comments?.length) {
                sortRecursive(comment.comments);
            }
        });
    };

    sortRecursive(rootComments);

    return rootComments;
};

export const markCommentAsDeleted = (
    comments: Comment[],
    commentId: number,
    deletionTime = new Date().toISOString(),
): Comment[] =>
    comments.map((comment) => {
        if (comment.id === commentId) {
            return {
                ...comment,
                deletionTime,
                deleted: true,
            };
        }

        if (comment.comments?.length) {
            return {
                ...comment,
                comments: markCommentAsDeleted(comment.comments, commentId, deletionTime),
            };
        }

        return comment;
    });
