export interface ImageDialogResult {
    buttonType: number;
    result?: { url: string; uuid: null | string };
}

export interface FileInputFileItem {
    id: string;
    url: string;
    name?: string;
}

export interface UploadedFile {
    url: string;
    size?: number;
    name?: string;
}
