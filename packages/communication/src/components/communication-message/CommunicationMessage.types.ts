import { ReactNode } from 'react';
import { ContextMenuItem } from '@chayns-components/core';

export enum CommunicationMessageAlignment {
    LEFT = 'LEFT',
    CENTER = 'CENTER',
    RIGHT = 'RIGHT',
}

export enum CommunicationMessageStatus {
    READ = 'READ',
    DELIVERED = 'DELIVERED',
    SEND = 'SEND',
}

export interface CommunicationMessageProps {
    metadata: MessageMetaData;
    shouldShowAuthorImage?: boolean;
    shouldShowTimestamp?: boolean;
    shouldShowAuthorName?: boolean;
    shouldShowStatus?: boolean;
    content: ReactNode;
    alignment: CommunicationMessageAlignment;

    options?: ContextMenuItem[];

    timestampFormatter?: (date: Date) => string;
}

export interface MessageMetaDataImageFile {
    previewUrl: string;
    type: 'image';
}

export interface MessageMetaDataVideoFile {
    previewUrl: string;
    type: 'video';
}

export interface MessageMetaDataFileFile {
    fileName: string;
    type: 'file';
}

export interface MessageMetaDataPlugin {
    icon?: string;
    name: string;
}

export type CombinedPreviewFile = MessageMetaDataImageFile | MessageMetaDataVideoFile;

export type MessageMetaDataFile =
    | MessageMetaDataImageFile
    | MessageMetaDataVideoFile
    | MessageMetaDataFileFile;

export interface MessageMetaData {
    id: string;
    creationTime: string;
    deletionTime?: string;
    author: {
        id: string;
        name: string;
        imageUrl: string;
    };
    status: CommunicationMessageStatus;
    plugin?: MessageMetaDataPlugin;
    files?: MessageMetaDataFile[];
    plainText?: string;
}
