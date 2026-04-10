import React, { FC, useMemo, useState } from 'react';
import { ExpandableContent, Icon } from '@chayns-components/core';
import {
    StyledSidebarItem,
    StyledSidebarItemChildren,
    StyledSidebarItemHead,
    StyledSidebarItemHeadContent,
    StyledSidebarItemIcon,
    StyledSidebarItemIconImage,
    StyledSidebarItemLabel,
    StyledMotionSidebarOpenIcon,
} from './SidebarItem.styles';
import { NavigationLayoutItem } from '../../../NavigationLayout.types';

interface SidebarItemProps {
    id: NavigationLayoutItem['id'];
    isDisabled: NavigationLayoutItem['isDisabled'];
    icons: NavigationLayoutItem['icons'];
    imageUrl: NavigationLayoutItem['imageUrl'];
    label: NavigationLayoutItem['label'];
    childItems: NavigationLayoutItem['children'];
    color: string;
}

const SidebarItem: FC<SidebarItemProps> = ({
    childItems,
    id,
    icons,
    imageUrl,
    label,
    isDisabled,
    color,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [shouldShowChildren, setShouldShowChildren] = useState(false);

    const children = useMemo(() => {
        if (!childItems || childItems.length === 0) {
            return null;
        }

        return childItems.map((childItem) => (
            <SidebarItem
                key={childItem.id}
                id={childItem.id}
                isDisabled={childItem.isDisabled}
                icons={childItem.icons}
                imageUrl={childItem.imageUrl}
                label={childItem.label}
                childItems={childItem.children}
                color={color}
            />
        ));
    }, [childItems, color]);

    return (
        <StyledSidebarItem>
            <StyledSidebarItemHead
                $shouldHighlight={!isDisabled && isHovered}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <StyledSidebarItemHeadContent>
                    <StyledSidebarItemIcon>
                        {imageUrl && <StyledSidebarItemIconImage src={imageUrl} />}
                        {icons && <Icon icons={icons} size={21} color={color} />}
                    </StyledSidebarItemIcon>
                    <StyledSidebarItemLabel>{label}</StyledSidebarItemLabel>
                </StyledSidebarItemHeadContent>
                {!!children && (
                    <StyledMotionSidebarOpenIcon
                        initial={false}
                        animate={{ rotate: shouldShowChildren ? 180 : 0 }}
                        onClick={() => setShouldShowChildren((prev) => !prev)}
                    >
                        <Icon icons={['fa fa-chevron-down']} color={color} />
                    </StyledMotionSidebarOpenIcon>
                )}
            </StyledSidebarItemHead>
            {!!children && (
                <ExpandableContent isOpen={shouldShowChildren}>
                    <StyledSidebarItemChildren>{children}</StyledSidebarItemChildren>
                </ExpandableContent>
            )}
        </StyledSidebarItem>
    );
};

SidebarItem.displayName = 'SidebarItem';

export default SidebarItem;
