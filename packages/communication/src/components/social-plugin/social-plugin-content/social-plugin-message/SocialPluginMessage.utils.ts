import { Comment } from '../../SocialPlugin.types';
import {
    CommunicationMessageStatus,
    MessageMetaData,
} from '../../../communication-message/CommunicationMessage.types';
import { ContextMenuItem } from '@chayns-components/core';
import { getLanguage, getUser } from 'chayns-api';
import { getFixedT } from '@chayns/textstrings';
import textStrings from '../../../../constants/textStrings';

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
            text: getFixedT(textStrings.socialPlugin.content.message.options.reply),
            key: 'reply',
            onClick: () => onReply(metadata),
            icons: ['fa fa-reply'],
        });
    }

    if (isAdminMode || (personId && personId === metadata.author.id)) {
        items.push({
            text: getFixedT(textStrings.socialPlugin.content.message.options.delete),
            key: 'delete',
            onClick: () => onDelete(Number(metadata.id)),
            icons: ['fa fa-trash'],
        });
    }

    return items;
};
export const formatCommentDate = (date: Date): string => {
    const { active } = getLanguage();

    const now = new Date();

    const diffMs = now.getTime() - date.getTime();

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;

    const rtf = new Intl.RelativeTimeFormat(active ?? 'de', {
        numeric: 'always',
    });

    if (diffMs < minute) {
        return getFixedT(textStrings.socialPlugin.content.message.timestampSeconds);
    }

    if (diffMs < hour) {
        const minutes = Math.floor(diffMs / minute);
        return rtf.format(-minutes, 'minute');
    }

    if (diffMs < day) {
        const hours = Math.floor(diffMs / hour);
        return rtf.format(-hours, 'hour');
    }

    if (diffMs < week) {
        const days = Math.floor(diffMs / day);
        return rtf.format(-days, 'day');
    }

    if (diffMs < month) {
        const weeks = Math.floor(diffMs / week);
        return rtf.format(-weeks, 'week');
    }

    if (diffMs < year) {
        const months = Math.floor(diffMs / month);
        return rtf.format(-months, 'month');
    }

    const years = Math.floor(diffMs / year);

    return rtf.format(-years, 'year');
};
