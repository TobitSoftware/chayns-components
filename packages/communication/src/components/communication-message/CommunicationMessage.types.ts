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
}

export interface MessageMetaDataFile {
    previewUrl: string;
    type: 'image' | 'video' | 'file';
}

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
    pluginId?: string;
    files?: MessageMetaDataFile[];
    plainText?: string;
}
