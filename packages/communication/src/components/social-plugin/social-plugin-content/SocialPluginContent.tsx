import React, { FC, useCallback, useState, KeyboardEvent, useMemo, useRef } from 'react';
import {
    StyledSocialPluginContent,
    StyledSocialPluginContentComments,
    StyledSocialPluginContentCommentsInner,
    StyledSocialPluginContentRightElement,
} from './SocialPluginContent.styles';
import { ExpandableContent, Icon } from '@chayns-components/core';
import CommunicationInput from '../../communication-input/CommunicationInput';
import { useTranslation } from '@chayns/textstrings';
import textStrings from '../../../constants/textStrings';
import {
    CommunicationInputCornerType,
    CommunicationInputSize,
} from '../../communication-input/CommunicationInput.types';
import { useSocialPlugin } from '../SocialPlugin.context';
import SocialPluginMessage from './social-plugin-message/SocialPluginMessage';
import { sortComments } from '../SocialPlugin.utils';

interface SocialPluginContentProps {
    shouldShowComments: boolean;
}

const SocialPluginContent: FC<SocialPluginContentProps> = ({ shouldShowComments }) => {
    const [value, setValue] = useState('');

    const listRef = useRef<HTMLDivElement>(null);

    const { t } = useTranslation();

    const { comments } = useSocialPlugin();

    const canSend = useMemo(() => {
        const checkValue = value.replaceAll('<br>', '').trim();

        return checkValue.length > 0;
    }, [value]);

    const handleSend = useCallback(() => {}, []);

    const handleInput = useCallback((_: unknown, newValue: string) => {
        setValue(newValue);
    }, []);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            if (!event.shiftKey && event.key === 'Enter' && canSend) {
                handleSend();
            }
        },
        [canSend, handleSend],
    );

    const messages = useMemo(
        () =>
            sortComments(comments).map(
                ({
                    comments: childComments,
                    id,
                    parentCommentId,
                    text,
                    creationTime,
                    firstName,
                    lastName,
                    personId,
                    deletionTime,
                    imageUrl,
                }) => (
                    <SocialPluginMessage
                        key={id}
                        id={id}
                        comments={childComments}
                        personId={personId}
                        creationTime={creationTime}
                        deletionTime={deletionTime}
                        firstName={firstName}
                        lastName={lastName}
                        text={text}
                        parentCommentId={parentCommentId}
                        imageUrl={imageUrl}
                    />
                ),
            ),
        [comments],
    );

    return (
        <ExpandableContent isOpen={shouldShowComments}>
            <StyledSocialPluginContent>
                <StyledSocialPluginContentComments className="chayns-scrollbar" ref={listRef}>
                    <StyledSocialPluginContentCommentsInner>
                        {messages}
                    </StyledSocialPluginContentCommentsInner>
                </StyledSocialPluginContentComments>
                <CommunicationInput
                    inputConfig={{
                        placeholder: t(textStrings.socialPlugin.content.input.placeholder),
                        onInput: handleInput,
                        onKeyDown: handleKeyDown,
                        maxHeight: 200,
                        value,
                    }}
                    scrollContainerRef={listRef}
                    shouldDisableFullHeight
                    cornerType={CommunicationInputCornerType.ROUNDED}
                    size={CommunicationInputSize.SMALL}
                    rightElement={
                        <StyledSocialPluginContentRightElement
                            $isDisabled={!canSend}
                            onClick={handleSend}
                        >
                            <Icon icons={['fa fa-paper-plane']} />
                        </StyledSocialPluginContentRightElement>
                    }
                />
            </StyledSocialPluginContent>
        </ExpandableContent>
    );
};

SocialPluginContent.displayName = 'SocialPluginContent';

export default SocialPluginContent;
