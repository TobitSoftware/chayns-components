import React, { FC } from 'react';
import { CommunicationTeamTalkHeaderActionProps } from './CommunicationTeamTalkHeaderAction.types';
import {
    StyledCommunicationTeamTalkHeaderAction,
    StyledCommunicationTeamTalkHeaderActionLabel,
} from './CommunicationTeamTalkHeaderAction.styles';
import { Icon } from '@chayns-components/core';

const CommunicationTeamTalkHeaderAction: FC<CommunicationTeamTalkHeaderActionProps> = ({
    onClick,
    label,
    icons,
    shouldShowLabel,
    isDisabled,
}) => (
    <StyledCommunicationTeamTalkHeaderAction
        onClick={isDisabled ? undefined : onClick}
        title={label}
        $isDisabled={isDisabled}
    >
        <Icon icons={icons} />
        {shouldShowLabel && (
            <StyledCommunicationTeamTalkHeaderActionLabel>
                {label}
            </StyledCommunicationTeamTalkHeaderActionLabel>
        )}
    </StyledCommunicationTeamTalkHeaderAction>
);

CommunicationTeamTalkHeaderAction.displayName = 'CommunicationTeamTalkHeaderAction';

export default CommunicationTeamTalkHeaderAction;
