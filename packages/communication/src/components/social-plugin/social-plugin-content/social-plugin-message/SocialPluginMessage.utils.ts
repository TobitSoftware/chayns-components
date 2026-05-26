import { Comment } from '../../SocialPlugin.types';
import {
    CommunicationMessageStatus,
    MessageMetaData,
} from '../../../communication-message/CommunicationMessage.types';
import { ContextMenuItem } from '@chayns-components/core';
import { getUser } from 'chayns-api';

interface GetMetadataOptions {
    id: Comment['id'];
    personId: Comment['personId'];
    text: Comment['text'];
    imageUrl: Comment['imageUrl'];
    creationTime: Comment['creationTime'];
    deletionTime: Comment['deletionTime'];
    firstName: Comment['firstName'];
    lastName: Comment['lastName'];
}

export const getMetadata = ({
    id,
    creationTime,
    deletionTime,
    text,
    firstName,
    lastName,
    imageUrl,
    personId,
}: GetMetadataOptions): MessageMetaData => ({
    id: String(id),
    creationTime,
    deletionTime,
    plainText: text,
    status: CommunicationMessageStatus.SEND,
    author: {
        id: personId,
        name: `${firstName} ${lastName}`,
        imageUrl: `https://tsimg.cloud/${personId}/profile_w200-h200.png`,
    },
    files:
        typeof imageUrl === 'string'
            ? [
                  {
                      type: 'image',
                      previewUrl: imageUrl,
                  },
              ]
            : undefined,
});

interface GetMessageOptionsOptions {
    isAdminMode: boolean;
    isChildComment?: boolean;
    metadata: MessageMetaData;
    onReply: (metadata: MessageMetaData) => void;
    onDelete: (id: Comment['id']) => void;
}

export const getMessageOptions = ({
    onReply,
    onDelete,
    isAdminMode,
    isChildComment = false,
    metadata,
}: GetMessageOptionsOptions): ContextMenuItem[] => {
    const personId = getUser()?.personId;

    const items: ContextMenuItem[] = [];

    if (!isChildComment) {
        items.push({
            text: 'Antworten',
            key: 'reply',
            onClick: () => onReply(metadata),
            icons: ['fa fa-reply'],
        });
    }

    if (isAdminMode || (personId && personId === metadata.author.id)) {
        items.push({
            text: 'Löschen',
            key: 'delete',
            onClick: () => onDelete(Number(metadata.id)),
            icons: ['fa fa-trash'],
        });
    }

    return items;
};
