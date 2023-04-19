export interface Video {
    id: number;
    originalVideoQuality?: string;
    thumbnailUrl: string;
    url: string;
    ratio?: number;
}

export interface Image {
    id?: string;
    url: string;
    meta?: Meta;
    ratio?: number;
}

export interface Meta {
    preview: string;
    width: string;
    height: string;
}

export type Files = Omit<Video, 'originalVideoQuality'> | Image;

export type UploadedFile = Video | Image;
