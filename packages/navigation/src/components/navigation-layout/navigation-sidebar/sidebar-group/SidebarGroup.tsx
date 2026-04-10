import React, { FC, useMemo } from 'react';
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
}

const SidebarGroup: FC<SidebarGroupProps> = ({
    items,
    selectedItemId,
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
                    label={label}
                    id={id}
                    isDisabled={isDisabled}
                    childItems={children}
                    imageUrl={imageUrl}
                    color={color}
                />
            )),
        [color, items],
    );

    return <StyledSidebarGroup>{content}</StyledSidebarGroup>;
};

SidebarGroup.displayName = 'SidebarGroup';

export default SidebarGroup;
