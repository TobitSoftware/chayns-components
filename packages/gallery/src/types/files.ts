export interface Video {
    id: number;
    originalVideoQuality: string;
    thumbnailUrl: string;
    url: string;
}

export interface Image {
    key: string;
    base: string;
    meta: Meta;
}

export interface Meta {
    preview: string;
    width: string;
    height: string;
}

export type UploadedFile = Video | Image;
