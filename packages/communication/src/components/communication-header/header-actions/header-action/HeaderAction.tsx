import React, { FC, useRef } from 'react';
import { Action } from '../../CommunicationHeader.types';
import { StyledHeaderAction, StyledHeaderActionLabel } from './HeaderAction.styles';
import {
    ContextMenu,
    Icon,
    useFocusRingPortal,
    useKeyboardFocusHighlighting,
} from '@chayns-components/core';

interface HeaderActionProps extends Omit<Action, 'id'> {
    shouldShowLabel?: boolean;
    shouldForceHover?: boolean;
    shouldEnableKeyboardHighlighting?: boolean;
}

const HeaderAction: FC<HeaderActionProps> = ({
    shouldShowLabel = false,
    shouldForceHover = false,
    label,
    onClick,
    icons,
    contextMenuItems,
    isDisabled,
    shouldEnableKeyboardHighlighting,
}) => {
    const actionRef = useRef<HTMLButtonElement>(null);
    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
        isDisabled ? false : shouldEnableKeyboardHighlighting,
    );

    useFocusRingPortal(actionRef, { isEnabled: shouldShowKeyboardHighlighting });

    if (contextMenuItems && contextMenuItems.length > 0) {
        return (
            <ContextMenu
                items={contextMenuItems}
                shouldDisableClick={isDisabled}
                shouldEnableKeyboardHighlighting={false}
                shouldUseDefaultTriggerStyles={false}
            >
                <StyledHeaderAction
                    title={label}
                    aria-disabled={isDisabled}
                    $shouldForceHover={shouldForceHover}
                    disabled={isDisabled}
                    ref={actionRef}
                    type="button"
                >
                    <Icon icons={icons} />
                </StyledHeaderAction>
            </ContextMenu>
        );
    }

    return (
        <StyledHeaderAction
            onClick={isDisabled ? undefined : onClick}
            title={label}
            aria-disabled={isDisabled}
            $shouldForceHover={shouldForceHover}
            disabled={isDisabled}
            ref={actionRef}
            type="button"
        >
            <Icon icons={icons} />
            {shouldShowLabel && <StyledHeaderActionLabel>{label}</StyledHeaderActionLabel>}
        </StyledHeaderAction>
    );
};

HeaderAction.displayName = 'HeaderAction';

export default HeaderAction;
