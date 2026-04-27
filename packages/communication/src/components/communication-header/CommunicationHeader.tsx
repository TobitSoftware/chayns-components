import React, { FC } from 'react';
import { CommunicationHeaderProps } from './CommunicationHeader.types';
import { StyledCommunicationHeader } from './CommunicationHeader.styles';
import HeaderSubject from './header-subject/HeaderSubject';
import HeaderMembers from './header-members/HeaderMembers';
import HeaderActions from './header-actions/HeaderActions';
import { TextStringProviderSSR } from '@chayns/textstrings';

const CommunicationHeader: FC<CommunicationHeaderProps> = ({
    from,
    cc,
    date,
    title,
    isRead,
    onReadToggle,
    isTeamTalkActive,
    onTeamTalkToggle,
    onFullScreenToggle,
    isFullScreen,
    to,
    maxActionCount,
    rightActions,
    isLoading,
}) => (
    <TextStringProviderSSR libraries="chayns-components-v5-communication" id="communication-header">
        <StyledCommunicationHeader>
            <HeaderSubject
                isLoading={isLoading}
                title={title}
                isFullScreen={isFullScreen}
                onFullScreenToggle={onFullScreenToggle}
            />
            <HeaderMembers from={from} to={to} date={date} cc={cc} isLoading={isLoading} />
            <HeaderActions
                isLoading={isLoading}
                rightActions={rightActions}
                isRead={isRead}
                maxActionCount={maxActionCount}
                onReadToggle={onReadToggle}
                isTeamTalkActive={isTeamTalkActive}
                onTeamTalkToggle={onTeamTalkToggle}
            />
        </StyledCommunicationHeader>
    </TextStringProviderSSR>
);

CommunicationHeader.displayName = 'CommunicationHeader';

export default CommunicationHeader;
