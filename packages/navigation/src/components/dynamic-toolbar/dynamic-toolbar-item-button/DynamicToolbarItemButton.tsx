import React, { FC, useCallback } from 'react';
import { Icon } from '@chayns-components/core';
import type { DynamicToolbarItem } from '../DynamicToolbar.types';
import {
    StyledDynamicToolbarItemButton,
    StyledMotionDynamicToolbarItemButtonBackground,
    StyledDynamicToolbarItemIconWrapper,
    StyledDynamicToolbarItemBadge,
    StyledDynamicToolbarItemLabel,
} from './DynamicToolbarItemButton.styles';

export type DynamicToolbarItemButtonProps = {
    /**
     * Maximum badge value before switching to the `max+` format.
     */
    badgeMaxValue: number;
    /**
     * Indicates whether the corresponding item is currently active.
     */
    isActive: boolean;
    /**
     * Indicates whether the corresponding item is rendered within an overflow tray.
     */
    isInOverflowTray?: boolean;
    /**
     * Item configuration that should be rendered.
     */
    item: DynamicToolbarItem;
    /**
     * Callback triggered when the user selects the toolbar entry.
     */
    onSelect: (item: DynamicToolbarItem) => void;
};

const DynamicToolbarItemButton: FC<DynamicToolbarItemButtonProps> = ({
    badgeMaxValue,
    isActive,
    isInOverflowTray = false,
    item,
    onSelect,
}) => {
    const hasBadge = typeof item.badgeCount === 'number' && item.badgeCount > 0;

    const badgeDisplayValue =
        hasBadge && item.badgeCount ? formatBadgeValue(item.badgeCount, badgeMaxValue) : null;

    const handleClick = useCallback(() => {
        onSelect(item);
    }, [onSelect, item]);

    return (
        <StyledDynamicToolbarItemButton
            type="button"
            disabled={item.isDisabled}
            $isDisabled={Boolean(item.isDisabled)}
            $isInOverflowTray={isInOverflowTray}
            $hasRightSeparator={item.hasRightSeparator}
            onClick={handleClick}
        >
            <StyledDynamicToolbarItemIconWrapper>
                <Icon color={isInOverflowTray ? undefined : 'white'} icons={item.icons} size={22} />
                {badgeDisplayValue && (
                    <StyledDynamicToolbarItemBadge>
                        {badgeDisplayValue}
                    </StyledDynamicToolbarItemBadge>
                )}
            </StyledDynamicToolbarItemIconWrapper>
            {isActive && (
                <StyledMotionDynamicToolbarItemButtonBackground layoutId="toolbarItemBackground" />
            )}
            {isInOverflowTray && (
                <StyledDynamicToolbarItemLabel className="ellipsis">
                    {item.label}
                </StyledDynamicToolbarItemLabel>
            )}
        </StyledDynamicToolbarItemButton>
    );
};

const formatBadgeValue = (value: number, maxValue: number): string => {
    if (value > maxValue) {
        return `${maxValue}+`;
    }

    return `${value}`;
};

export default DynamicToolbarItemButton;
