import React, { FC, MouseEvent, useRef } from 'react';
import ContextMenu from '../context-menu/ContextMenu';
import { ContextMenuAlignment, ContextMenuRef } from '../context-menu/ContextMenu.types';
import Icon from '../icon/Icon';
import { ActionMenuButtonProps } from './ActionMenuButton.types';
import {
    StyledMotionActionMenuButton,
    StyledActionMenuButtonAction,
    StyledActionMenuButtonActionIcon,
    StyledActionMenuButtonActionLabel,
    StyledActionMenuButtonMenu,
} from './ActionMenuButton.styles';

/**
 * A versatile button component that can act as a standard button, a menu trigger, or a split button.
 */
const ActionMenuButton: FC<ActionMenuButtonProps> = ({
    contextMenuItems,
    icon,
    isCollapsed = false,
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

    let buttonWidth = shouldUseFullWidth ? '100%' : 'auto';
    let menuOpacity = isDisabled ? 0.5 : 1;

    if (isCollapsed) {
        buttonWidth = '42px';
        menuOpacity = 0;
    }

    return (
        <StyledMotionActionMenuButton
            animate={{ width: buttonWidth }}
            $shouldUseFullWidth={shouldUseFullWidth}
            transition={{ duration: 0.25, type: 'tween' }}
        >
            <StyledActionMenuButtonAction
                onClick={isDisabled ? undefined : handleActionClick}
                type="button"
                $hasIcon={typeof icon === 'string'}
                $isCollapsed={isCollapsed}
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
                    style={{ opacity: menuOpacity }}
                    type="button"
                    $isCollapsed={isCollapsed}
                    $isDisabled={isDisabled}
                    $isSplit
                >
                    <ContextMenu
                        alignment={ContextMenuAlignment.BottomRight}
                        items={contextMenuItems}
                        shouldDisableClick={isDisabled}
                        ref={contextMenuRef}
                    >
                        <Icon color="white" icons={['fa fa-angle-down']} size={14} />
                    </ContextMenu>
                </StyledActionMenuButtonMenu>
            )}
        </StyledMotionActionMenuButton>
    );
};

ActionMenuButton.displayName = 'ActionMenuButton';

export default ActionMenuButton;
