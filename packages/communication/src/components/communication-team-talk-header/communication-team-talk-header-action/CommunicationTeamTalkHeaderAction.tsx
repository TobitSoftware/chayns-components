import React, { FC, useRef } from 'react';
import { CommunicationTeamTalkHeaderActionProps } from './CommunicationTeamTalkHeaderAction.types';
import {
    StyledCommunicationTeamTalkHeaderAction,
    StyledCommunicationTeamTalkHeaderActionLabel,
} from './CommunicationTeamTalkHeaderAction.styles';
import { Icon, useFocusRingPortal, useKeyboardFocusHighlighting } from '@chayns-components/core';

const CommunicationTeamTalkHeaderAction: FC<CommunicationTeamTalkHeaderActionProps> = ({
    onClick,
    label,
    icons,
    shouldShowLabel,
    isDisabled,
    shouldEnableKeyboardHighlighting,
}) => {
    const actionRef = useRef<HTMLButtonElement>(null);
    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
        isDisabled ? false : shouldEnableKeyboardHighlighting,
    );

    useFocusRingPortal(actionRef, { isEnabled: shouldShowKeyboardHighlighting });

    return (
        <StyledCommunicationTeamTalkHeaderAction
            disabled={isDisabled}
            onClick={isDisabled ? undefined : onClick}
            title={label}
            $isDisabled={isDisabled}
            ref={actionRef}
            type="button"
        >
            <Icon icons={icons} />
            {shouldShowLabel && (
                <StyledCommunicationTeamTalkHeaderActionLabel>
                    {label}
                </StyledCommunicationTeamTalkHeaderActionLabel>
            )}
        </StyledCommunicationTeamTalkHeaderAction>
    );
};

CommunicationTeamTalkHeaderAction.displayName = 'CommunicationTeamTalkHeaderAction';

export default CommunicationTeamTalkHeaderAction;
