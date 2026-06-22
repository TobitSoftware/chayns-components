export type CommunicationFileStatus = 'uploading' | 'uploaded' | 'error';

export interface CommunicationFile {
    id: string;
    name: string;
    mimeType: string;
    size?: number;
    url?: string;
    previewUrl?: string;
    status: CommunicationFileStatus;
    preview?: React.ReactNode;
}

export interface CommunicationFileListProps {
    files: CommunicationFile[];
}
