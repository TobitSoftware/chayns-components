import React, { FC, useRef } from 'react';
import { Member } from '../../CommunicationHeader.types';
import { StyledHeaderMember } from './HeaderMember.styles';
import {
    ContextMenu,
    useFocusRingPortal,
    useKeyboardFocusHighlighting,
} from '@chayns-components/core';

interface HeaderMemberProps extends Omit<Member, 'id'> {
    isFocusable?: boolean;
    shouldEnableKeyboardHighlighting?: boolean;
}

const HeaderMember: FC<HeaderMemberProps> = ({
    name,
    actions,
    isFocusable = true,
    shouldEnableKeyboardHighlighting,
}) => {
    const memberRef = useRef<HTMLButtonElement>(null);
    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
        shouldEnableKeyboardHighlighting,
    );

    useFocusRingPortal(memberRef, { isEnabled: isFocusable && shouldShowKeyboardHighlighting });

    const handleClick = () => {
        const firstAction = actions[0];

        if (!firstAction) {
            return;
        }

        firstAction.onClick();
    };

    if (actions.length > 1) {
        return (
            <ContextMenu
                items={actions.map(({ onClick, label, icons }) => ({
                    onClick,
                    icons,
                    key: label,
                    text: label,
                }))}
                shouldEnableKeyboardHighlighting={false}
                shouldUseDefaultTriggerStyles={false}
            >
                <StyledHeaderMember
                    $isContextMenu
                    ref={memberRef}
                    tabIndex={isFocusable ? undefined : -1}
                    type="button"
                >
                    {name}
                </StyledHeaderMember>
            </ContextMenu>
        );
    }

    return (
        <StyledHeaderMember
            onClick={handleClick}
            ref={memberRef}
            tabIndex={isFocusable ? undefined : -1}
            type="button"
        >
            {name}
        </StyledHeaderMember>
    );
};

HeaderMember.displayName = 'HeaderMember';

export default HeaderMember;
