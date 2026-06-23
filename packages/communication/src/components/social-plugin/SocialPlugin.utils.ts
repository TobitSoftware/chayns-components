import type { Comment } from './SocialPlugin.types';

export const sortComments = (comments: Comment[]): Comment[] =>
    [...comments].sort(
        (left, right) =>
            new Date(left.creationTime).getTime() - new Date(right.creationTime).getTime(),
    );

export const countComments = (comments: Comment[]): number =>
    comments.reduce((total, comment) => total + 1 + countComments(comment.comments ?? []), 0);

const parseUtcDateString = (value?: string): string | undefined => {
    if (!value) return undefined;

    return new Date(value.endsWith('Z') ? value : `${value}Z`).toISOString();
};

const normalizeComment = (comment: Comment): Comment => ({
    ...comment,
    creationTime: parseUtcDateString(comment.creationTime) ?? comment.creationTime,
    deletionTime: parseUtcDateString(comment.deletionTime),
    lastModified: parseUtcDateString(comment.lastModified),
});

export const mergeComments = (
    currentComments: Comment[],
    incomingComments: Comment[],
): Comment[] => {
    const commentMap = new Map<number, Comment>();

    const collectComments = (comments: Comment[]) => {
        comments.forEach((comment) => {
            const { comments: childComments, ...commentWithoutChildren } =
                normalizeComment(comment);

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
    const comments: Comment[] = Array.from(commentMap.values()).map((comment) => ({
        ...comment,
        comments: [],
    }));
    const rebuiltCommentMap = new Map(comments.map((comment) => [comment.id, comment]));

    comments.forEach((comment) => {
        if (comment.parentCommentId) {
            const parentComment = rebuiltCommentMap.get(comment.parentCommentId);

            if (parentComment) {
                parentComment.comments?.push(comment);
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
