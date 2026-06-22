export interface CommunicationFileListProps {
    files: (CommunicationFile | CommunicationVideo | CommunicationImage)[];
    onRemove?: (fileId: string) => void;
}

export enum CommunicationLoadingState {
    uploaded = 'uploaded',
    uploading = 'uploading',
    error = 'error',
}

export interface BaseCommunicationFile {
    type: 'file' | 'image' | 'video';
    id: string;
    url: string;
    loadingState: CommunicationLoadingState;
}

export interface CommunicationVideo extends BaseCommunicationFile {
    type: 'video';
    thumbnail: string;
}

export interface CommunicationImage extends BaseCommunicationFile {
    type: 'image';
    thumbnail: string;
}

export interface CommunicationFile extends BaseCommunicationFile {
    type: 'file';
    mimeType: string;
    name?: string;
    size: number;
}
