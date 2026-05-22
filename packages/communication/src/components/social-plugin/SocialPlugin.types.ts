export interface SocialPluginProps {
    link: string;
    commentType: number;
    postingId: string;
}

export interface Reaction {
    id: number;
    commentTypeId: number | null;
    originalPostingId: string | null;
    postingId: number;
    personId: string | null;
    reactionId: number;
    emoji: string | null;
    firstName: string | null;
    lastName: string | null;
}

export interface CommentHistory {
    text: string | null;
    imageUrl: string | null;
    updatedTime: string;
}

export interface Comment {
    id: number;
    commentTypeId: number;
    originalPostingId: string | null;
    personId: string | null;
    text: string | null;
    imageUrl: string | null;
    locationId: number;
    parentCommentId: number | null;
    creationTime: string;
    deletionTime: string | null;
    reactions: Reaction[] | null;
    comments: Comment[] | null;
    lastModified: string | null;
    firstName: string | null;
    lastName: string | null;
    hidden: boolean;
    deleted: boolean;
    history: string | null;
    changes: CommentHistory[] | null;
}
