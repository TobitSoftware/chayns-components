import { CommunicationInputSize } from '../communication-input/CommunicationInput.types';

export interface CommunicationFileListProps {
    files: (CommunicationFile | CommunicationVideo | CommunicationImage)[];
    onRemove?: (fileId: string) => void;
    size?: CommunicationInputSize;
}

export enum CommunicationLoadingState {
    UPLOADED = 'UPLOADED',
    UPLOADING = 'UPLOADING',
    ERROR = 'ERROR',
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
