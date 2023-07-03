export type LoadingState = 'uploading' | 'uploaded' | 'none';

export interface Video {
    id: string;
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

export interface FileItem {
    /**
     * The state will be set in this component
     */
    state?: LoadingState;
    /**
     * Raw file from select or drag and drop
     */
    file?: File;
    /**
     * File that is uploaded at any service
     */
    uploadedFile?: Video | Image;
    /**
     * The ID of the file. If an `uploadedFile` object is provided, the ID is set to the ID of the uploaded file.
     * If no `uploadedFile` object is provided, a new ID will be generated.
     */
    id?: string;
    /**
     * Preview url of the file
     */
    previewUrl?: string;
}
