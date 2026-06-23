export interface SocialPluginProps {
    link: string;
    commentType: number;
    postingId: string;
}

export interface Comment {
    id: number;
    commentTypeId: number;
    originalPostingId: string;
    personId: string;
    text: string;
    imageUrl?: string;
    locationId: number;
    parentCommentId?: number;
    creationTime: string;
    deletionTime?: string;
    reactions: unknown[];
    comments?: Comment[];
    lastModified?: string;
    firstName: string;
    lastName: string;
    hidden?: boolean;
    deleted?: boolean;
    changes?: unknown[];
}
