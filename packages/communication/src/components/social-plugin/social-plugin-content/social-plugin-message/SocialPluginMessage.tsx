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
    MessageMetaData,
} from '../../../communication-message/CommunicationMessage.types';
import { sortComments } from '../../SocialPlugin.utils';
import { formatCommentDate, getMessageOptions, getMetadata } from './SocialPluginMessage.utils';
import { useIsAdminMode } from 'chayns-api';
import { useSocialPlugin } from '../../SocialPlugin.context';
import { replaceEmojis } from '../../../../utils/emojione';

interface SocialPluginMessageProps {
    id: Comment['id'];
    personId: Comment['personId'];
    text: Comment['text'];
    imageUrl: Comment['imageUrl'];
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
                const replacedText = replaceEmojis(childComment.text);

                const childMetadata = getMetadata({
                    id: childComment.id,
                    personId: childComment.personId,
                    deletionTime: childComment.deletionTime,
                    creationTime: childComment.creationTime,
                    firstName: childComment.firstName,
                    text: replacedText,
                    lastName: childComment.lastName,
                    imageUrl: childComment.imageUrl,
                });

                return (
                    <StyledSocialPluginMessageChildMessage
                        key={childComment.id}
                        data-comment-id={childComment.id}
                    >
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
                            content={renderContent(replacedText, childComment.imageUrl)}
                            alignment={CommunicationMessageAlignment.LEFT}
                            shouldShowAuthorImage
                            shouldShowAuthorName
                            shouldShowTimestamp
                            shouldShowStatus={false}
                            timestampFormatter={formatCommentDate}
                        />
                    </StyledSocialPluginMessageChildMessage>
                );
            }),
        [comments, handleDelete, handleReply, isAdminMode],
    );

    return (
        <StyledSocialPluginMessage data-comment-id={id}>
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
                    shouldShowTimestamp
                    shouldShowStatus={false}
                    timestampFormatter={formatCommentDate}
                />
            </StyledSocialPluginMessageParentMessage>
            {Array.isArray(comments) && comments.length > 0 && (
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
