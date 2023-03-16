export interface ImageUploadResult {
    base?: string;
    key?: string;
    meta?: {
        preview: string;
        width: number;
        height: number;
    };
}

export type OnChange = {
    files: UploadedFile[];
};

export interface Video {
    id: number;
    originalVideoQuality: string;
    thumbnailUrl: string;
    url: string;
}

export interface Image {
    url: string;
}

export type UploadedFile = Video | Image;

export type UploadState = 'none' | 'pending' | 'successful' | 'rejected';
