import React, { FC } from 'react';
import { Action } from '../../CommunicationHeader.types';
import { StyledHeaderAction, StyledHeaderActionLabel } from './HeaderAction.styles';
import { ContextMenu, Icon } from '@chayns-components/core';

interface HeaderActionProps extends Omit<Action, 'id'> {
    shouldShowLabel?: boolean;
    shouldForceHover?: boolean;
}

const HeaderAction: FC<HeaderActionProps> = ({
    shouldShowLabel = false,
    shouldForceHover = false,
    label,
    onClick,
    icons,
    contextMenuItems,
    isDisabled,
}) => {
    if (contextMenuItems && contextMenuItems.length > 0) {
        return (
            <StyledHeaderAction
                title={label}
                aria-disabled={isDisabled}
                $shouldForceHover={shouldForceHover}
            >
                <ContextMenu items={contextMenuItems} shouldDisableClick={isDisabled}>
                    <Icon icons={icons} />
                </ContextMenu>
            </StyledHeaderAction>
        );
    }

    return (
        <StyledHeaderAction
            onClick={isDisabled ? undefined : onClick}
            title={label}
            aria-disabled={isDisabled}
            $shouldForceHover={shouldForceHover}
        >
            <Icon icons={icons} />
            {shouldShowLabel && <StyledHeaderActionLabel>{label}</StyledHeaderActionLabel>}
        </StyledHeaderAction>
    );
};

HeaderAction.displayName = 'HeaderAction';

export default HeaderAction;
