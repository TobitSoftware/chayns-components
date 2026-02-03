import React, { FC, MouseEvent, useRef } from 'react';
import ContextMenu from '../context-menu/ContextMenu';
import type { ContextMenuRef } from '../context-menu/ContextMenu.types';
import Icon from '../icon/Icon';
import { ActionMenuButtonProps } from './ActionMenuButton.types';
import {
    StyledActionMenuButtonAction,
    StyledActionMenuButton,
    StyledActionMenuButtonMenu,
    StyledActionMenuButtonActionIcon,
    StyledActionMenuButtonActionLabel,
} from './ActionMenuButton.styles';

/**
 * A versatile button component that can act as a standard button, a menu trigger, or a split button.
 */
const ActionMenuButton: FC<ActionMenuButtonProps> = ({
    contextMenuItems,
    icon,
    isDisabled,
    label,
    onClick,
    shouldUseFullWidth = false,
}) => {
    const contextMenuRef = useRef<ContextMenuRef>(null);

    const hasDropdown = Array.isArray(contextMenuItems) && contextMenuItems.length > 0;

    const handleActionClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        if (typeof onClick === 'function') {
            onClick(event);
        } else if (hasDropdown) {
            contextMenuRef.current?.show();
        }
    };

    const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        contextMenuRef.current?.show();
    };

    return (
        <StyledActionMenuButton $shouldUseFullWidth={shouldUseFullWidth}>
            <StyledActionMenuButtonAction
                onClick={isDisabled ? undefined : handleActionClick}
                type="button"
                $hasIcon={typeof icon === 'string'}
                $isDisabled={isDisabled}
                $isSplit={hasDropdown}
            >
                {typeof icon === 'string' && (
                    <StyledActionMenuButtonActionIcon>
                        <Icon color="white" icons={[icon]} size={20} />
                    </StyledActionMenuButtonActionIcon>
                )}
                <StyledActionMenuButtonActionLabel>{label}</StyledActionMenuButtonActionLabel>
            </StyledActionMenuButtonAction>
            {hasDropdown && (
                <StyledActionMenuButtonMenu
                    onClick={isDisabled ? undefined : handleMenuClick}
                    type="button"
                    $isDisabled={isDisabled}
                    $isSplit
                >
                    <ContextMenu
                        items={contextMenuItems}
                        shouldDisableClick={isDisabled}
                        ref={contextMenuRef}
                    >
                        <Icon color="white" icons={['fa fa-angle-down']} size={14} />
                    </ContextMenu>
                </StyledActionMenuButtonMenu>
            )}
        </StyledActionMenuButton>
    );
};

ActionMenuButton.displayName = 'ActionMenuButton';

export default ActionMenuButton;
