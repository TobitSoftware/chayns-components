import React, { FC, useCallback } from 'react';
import { Icon } from '@chayns-components/core';
import type { DynamicToolbarItem } from '../DynamicToolbar.types';
import { StyledDynamicToolbarItemButton } from './DynamicToolbarItemButton.styles';

export type DynamicToolbarItemButtonProps = {
    /**
     * @description Maximum badge value before switching to the `max+` format.
     */
    badgeMaxValue: number;
    /**
     * @description Indicates whether the corresponding item is currently active.
     */
    isActive: boolean;
    /**
     * @description Item configuration that should be rendered.
     */
    item: DynamicToolbarItem;
    /**
     * @description Callback triggered when the user selects the toolbar entry.
     */
    onSelect: (item: DynamicToolbarItem) => void;
};

const DynamicToolbarItemButton: FC<DynamicToolbarItemButtonProps> = ({
    badgeMaxValue,
    isActive,
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
            $isActive={isActive}
            $isDisabled={Boolean(item.isDisabled)}
            onClick={handleClick}
        >
            <Icon color="white" icons={item.icons} size={22} />
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
