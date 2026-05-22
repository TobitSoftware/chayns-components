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
} from '../../../communication-message/CommunicationMessage.types';
import { sortComments } from '../../SocialPlugin.utils';

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
    const t = 0;

    const metadata = useMemo(
        () => ({
            id: String(id),
            creationTime,
            deletionTime,
            author: {
                id: personId,
                name: `${firstName} ${lastName}`,
                imageUrl: `https://tsimg.cloud/${personId}/profile_w200-h200.png`,
            },
            status: CommunicationMessageStatus.SEND,
        }),
        [creationTime, deletionTime, firstName, id, lastName, personId],
    );

    const renderContent = useCallback(
        (rawText?: string, rawImage?: string) => (
            <StyledMessageContent>
                {typeof rawImage === 'string' && <StyledMessageContentImage src={rawImage} />}
                {typeof rawText === 'string' && (
                    <StyledMessageContentText>{rawText}</StyledMessageContentText>
                )}
            </StyledMessageContent>
        ),
        [],
    );

    const childMessages = useMemo(
        () =>
            sortComments(comments ?? []).map((childComment) => (
                <StyledSocialPluginMessageChildMessage key={childComment.id}>
                    <StyledSocialPluginMessageChildMessageSubLine />
                    <CommunicationMessage.Text
                        metadata={{
                            id: String(childComment.id),
                            creationTime: childComment.creationTime,
                            deletionTime: childComment.deletionTime,
                            author: {
                                id: childComment.personId,
                                name: `${childComment.firstName} ${childComment.lastName}`,
                                imageUrl: `https://tsimg.cloud/${childComment.personId}/profile_w200-h200.png`,
                            },
                            status: CommunicationMessageStatus.SEND,
                        }}
                        content={renderContent(childComment.text, childComment.imageUrl)}
                        alignment={CommunicationMessageAlignment.LEFT}
                        shouldShowAuthorImage
                        shouldShowAuthorName
                        shouldShowTimestamp={false}
                        shouldShowStatus={false}
                    />
                </StyledSocialPluginMessageChildMessage>
            )),
        [comments, renderContent],
    );

    return (
        <StyledSocialPluginMessage>
            <StyledSocialPluginMessageParentMessage>
                <CommunicationMessage.Text
                    metadata={metadata}
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
