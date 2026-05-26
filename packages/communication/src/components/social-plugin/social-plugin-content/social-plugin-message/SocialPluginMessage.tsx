import React, { FC, useCallback, useMemo } from 'react';
import {
    StyledMessageContent,
    StyledMessageContentImage,
    StyledMessageContentText,
    StyledSocialPluginMessage,
    StyledSocialPluginMessageChildMessage,
    StyledSocialPluginMessageChildMessageLine,
    StyledSocialPluginMessageChildMessages,
    StyledSocialPluginMessageChildMessageSubLine,
    StyledSocialPluginMessageChildMessageWrapper,
    StyledSocialPluginMessageParentMessage,
} from './SocialPluginMessage.styles';
import { Comment } from '../../SocialPlugin.types';
import CommunicationMessage from '../../../communication-message/variants';
import {
    CommunicationMessageAlignment,
    CommunicationMessageStatus,
    MessageMetaData,
} from '../../../communication-message/CommunicationMessage.types';
import { sortComments } from '../../SocialPlugin.utils';
import { getMessageOptions, getMetadata } from './SocialPluginMessage.utils';
import { useIsAdminMode, usePage, useSite, useUser } from 'chayns-api';
import { useSocialPlugin } from '../../SocialPlugin.context';

interface SocialPluginMessageProps {
    id: Comment['id'];
    personId: Comment['personId'];
    text: Comment['text'];
    imageUrl: Comment['imageUrl'];
    parentCommentId: Comment['parentCommentId'];
    creationTime: Comment['creationTime'];
    deletionTime: Comment['deletionTime'];
    comments: Comment['comments'];
    firstName: Comment['firstName'];
    lastName: Comment['lastName'];
}

const renderContent = (text?: string, imageUrl?: string) => (
    <StyledMessageContent>
        {typeof imageUrl === 'string' && <StyledMessageContentImage src={imageUrl} />}
        {typeof text === 'string' && <StyledMessageContentText>{text}</StyledMessageContentText>}
    </StyledMessageContent>
);

const SocialPluginMessage: FC<SocialPluginMessageProps> = ({
    comments,
    parentCommentId,
    id,
    firstName,
    lastName,
    deletionTime,
    creationTime,
    text,
    imageUrl,
    personId,
}) => {
    const isAdminMode = useIsAdminMode();

    const { deleteComment, setReplyMetadata } = useSocialPlugin();

    const metadata = useMemo(
        () =>
            getMetadata({
                imageUrl,
                id,
                lastName,
                firstName,
                text,
                creationTime,
                deletionTime,
                personId,
            }),
        [creationTime, deletionTime, firstName, id, imageUrl, lastName, personId, text],
    );

    const handleDelete = useCallback(
        (messageId: Comment['id']) => {
            deleteComment(messageId);
        },
        [deleteComment],
    );

    const handleReply = useCallback(
        (messageMetadata: MessageMetaData) => {
            setReplyMetadata(messageMetadata);
        },
        [setReplyMetadata],
    );

    const childMessages = useMemo(
        () =>
            sortComments(comments ?? []).map((childComment) => {
                const childMetadata = getMetadata({
                    id: childComment.id,
                    personId: childComment.personId,
                    deletionTime: childComment.deletionTime,
                    creationTime: childComment.creationTime,
                    firstName: childComment.firstName,
                    text: childComment.text,
                    lastName: childComment.lastName,
                    imageUrl: childComment.imageUrl,
                });

                return (
                    <StyledSocialPluginMessageChildMessage key={childComment.id}>
                        <StyledSocialPluginMessageChildMessageSubLine />
                        <CommunicationMessage.Text
                            metadata={childMetadata}
                            options={getMessageOptions({
                                isAdminMode,
                                isChildComment: true,
                                metadata: childMetadata,
                                onDelete: handleDelete,
                                onReply: handleReply,
                            })}
                            content={renderContent(childComment.text, childComment.imageUrl)}
                            alignment={CommunicationMessageAlignment.LEFT}
                            shouldShowAuthorImage
                            shouldShowAuthorName
                            shouldShowTimestamp={false}
                            shouldShowStatus={false}
                        />
                    </StyledSocialPluginMessageChildMessage>
                );
            }),
        [comments, handleDelete, handleReply, isAdminMode],
    );

    return (
        <StyledSocialPluginMessage>
            <StyledSocialPluginMessageParentMessage>
                <CommunicationMessage.Text
                    metadata={metadata}
                    options={getMessageOptions({
                        isAdminMode,
                        metadata,
                        onDelete: handleDelete,
                        onReply: handleReply,
                    })}
                    content={renderContent(text, imageUrl)}
                    alignment={CommunicationMessageAlignment.LEFT}
                    shouldShowAuthorImage
                    shouldShowAuthorName
                    shouldShowTimestamp={false}
                    shouldShowStatus={false}
                />
            </StyledSocialPluginMessageParentMessage>
            {Array.isArray(comments) && (
                <StyledSocialPluginMessageChildMessageWrapper>
                    <StyledSocialPluginMessageChildMessageLine />
                    <StyledSocialPluginMessageChildMessages>
                        {childMessages}
                    </StyledSocialPluginMessageChildMessages>
                </StyledSocialPluginMessageChildMessageWrapper>
            )}
        </StyledSocialPluginMessage>
    );
};

SocialPluginMessage.displayName = 'SocialPluginMessage';

export default SocialPluginMessage;
