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
}

const SidebarGroup: FC<SidebarGroupProps> = ({
    items,
    selectedItemId,
    isCompact,
    onClick,
    isReorderable,
    color,
}) => {
    const content = useMemo(
        () =>
            items.map(({ id, children, label, imageUrl, icons, isDisabled }) => (
                <SidebarItem
                    key={id}
                    icons={icons}
                    isCompact={isCompact}
                    label={label}
                    id={id}
                    selectedItemId={selectedItemId}
                    isDisabled={isDisabled}
                    childItems={children}
                    imageUrl={imageUrl}
                    color={color}
                />
            )),
        [color, items, selectedItemId, isCompact],
    );

    return <StyledSidebarGroup>{content}</StyledSidebarGroup>;
};

SidebarGroup.displayName = 'SidebarGroup';

export default memo(SidebarGroup);
