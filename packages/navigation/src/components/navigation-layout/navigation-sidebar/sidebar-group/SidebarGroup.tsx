import React, { FC, memo, useMemo } from 'react';
import { StyledSidebarGroup } from './SidebarGroup.styles';
import {
    NavigationLayoutGroup,
    NavigationLayoutItem,
    NavigationLayoutProps,
} from '../../NavigationLayout.types';
import SidebarItem from './sidebar-item/SidebarItem';

interface SidebarGroupProps {
    items: NavigationLayoutItem[];
    isReorderable?: NavigationLayoutGroup['isReorderable'];
    selectedItemId?: NavigationLayoutProps['selectedItemId'];
    onClick: NavigationLayoutProps['onItemClick'];
    color: string;
    isCompact: boolean;
    shouldShowCollapsedLabel: NavigationLayoutProps['shouldShowCollapsedLabel'];
}

const SidebarGroup: FC<SidebarGroupProps> = ({
    items,
    selectedItemId,
    isCompact,
    onClick,
    isReorderable,
    color,
    shouldShowCollapsedLabel,
}) => {
    const content = useMemo(
        () =>
            items.map(
                ({
                    id,
                    children,
                    label,
                    imageUrl,
                    icons,
                    isDisabled,
                    imageElement,
                    disabledReason,
                }) => (
                    <SidebarItem
                        key={id}
                        icons={icons}
                        imageElement={imageElement}
                        isCompact={isCompact}
                        shouldShowCollapsedLabel={shouldShowCollapsedLabel}
                        label={label}
                        disabledReason={disabledReason}
                        id={id}
                        selectedItemId={selectedItemId}
                        isDisabled={isDisabled}
                        onClick={onClick}
                        childItems={children}
                        imageUrl={imageUrl}
                        color={color}
                    />
                ),
            ),
        [color, items, selectedItemId, isCompact, onClick],
    );

    return <StyledSidebarGroup>{content}</StyledSidebarGroup>;
};

SidebarGroup.displayName = 'SidebarGroup';

export default memo(SidebarGroup);
