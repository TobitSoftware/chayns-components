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
import { NavigationLayoutItem, NavigationLayoutProps } from '../../../NavigationLayout.types';
import { isItemOrChildSelected } from './SidebarItem.utils';

interface SidebarItemProps {
    id: NavigationLayoutItem['id'];
    isDisabled: NavigationLayoutItem['isDisabled'];
    icons: NavigationLayoutItem['icons'];
    imageUrl: NavigationLayoutItem['imageUrl'];
    label: NavigationLayoutItem['label'];
    childItems: NavigationLayoutItem['children'];
    color: string;
    selectedItemId: NavigationLayoutProps['selectedItemId'];
}

const SidebarItem: FC<SidebarItemProps> = ({
    childItems,
    id,
    icons,
    imageUrl,
    label,
    selectedItemId,
    isDisabled,
    color,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [shouldShowChildren, setShouldShowChildren] = useState(false);

    const isSelected = useMemo(
        () =>
            isItemOrChildSelected(
                { id, label, imageUrl, icons, isDisabled, children: childItems },
                selectedItemId,
            ),
        [id, label, imageUrl, icons, isDisabled, childItems, selectedItemId],
    );

    const children = useMemo(() => {
        if (!childItems || childItems.length === 0) {
            return null;
        }

        return childItems.map((childItem) => (
            <SidebarItem
                key={childItem.id}
                id={childItem.id}
                selectedItemId={selectedItemId}
                isDisabled={childItem.isDisabled}
                icons={childItem.icons}
                imageUrl={childItem.imageUrl}
                label={childItem.label}
                childItems={childItem.children}
                color={color}
            />
        ));
    }, [childItems, color, selectedItemId]);

    return (
        <StyledSidebarItem>
            <StyledSidebarItemHead
                $shouldHighlight={!isDisabled && (isHovered || isSelected)}
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
                        transition={{ type: 'tween' }}
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
