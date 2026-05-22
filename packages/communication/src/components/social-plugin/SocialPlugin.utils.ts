import type { Comment } from './SocialPlugin.types';

export const sortComments = (comments: Comment[]): Comment[] =>
    [...comments].sort(
        (left, right) =>
            new Date(left.creationTime).getTime() - new Date(right.creationTime).getTime(),
    );
