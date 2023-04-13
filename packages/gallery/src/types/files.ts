export interface Video {
    id: number;
    originalVideoQuality?: string;
    thumbnailUrl: string;
    url: string;
    ratio?: number;
}

export interface Image {
    key: string;
    base: string;
    meta?: Meta;
    ratio?: number;
}

export interface Meta {
    preview: string;
    width: string;
    height: string;
}

export interface ImageUrl {
    id: number;
    url: string;
}

export type Files = Omit<Video, 'originalVideoQuality'> | ImageUrl;

export type UploadedFile = Video | Image;
