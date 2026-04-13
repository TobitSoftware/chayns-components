import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ExpandableContent, Icon, Tooltip } from '@chayns-components/core';
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
    imageElement: NavigationLayoutItem['imageElement'];
    disabledReason: NavigationLayoutItem['disabledReason'];
    onClick: NavigationLayoutProps['onItemClick'];
    color: string;
    isCompact: boolean;
    selectedItemId: NavigationLayoutProps['selectedItemId'];
}

const SidebarItem: FC<SidebarItemProps> = ({
    childItems,
    id,
    icons,
    imageUrl,
    label,
    selectedItemId,
    isCompact,
    imageElement,
    onClick,
    disabledReason,
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

    useEffect(() => {
        if (isCompact) {
            setShouldShowChildren(false);
        }
    }, [isCompact]);

    const handleClick = useCallback(() => {
        if (isDisabled || typeof onClick !== 'function') {
            return;
        }

        onClick(id);
    }, [isDisabled, onClick, id]);

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
                disabledReason={childItem.disabledReason}
                imageUrl={childItem.imageUrl}
                imageElement={childItem.imageElement}
                label={childItem.label}
                childItems={childItem.children}
                color={color}
                onClick={onClick}
                isCompact={isCompact}
            />
        ));
    }, [childItems, color, selectedItemId, isCompact, onClick]);

    return (
        <StyledSidebarItem>
            <Tooltip
                item={{ text: disabledReason ?? '' }}
                isDisabled={!disabledReason}
                shouldUseFullWidth
            >
                <StyledSidebarItemHead
                    $shouldHighlight={!isDisabled && (isHovered || isSelected)}
                    $isDisabled={isDisabled}
                    $hasDisabledReason={!!disabledReason}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleClick}
                >
                    <StyledSidebarItemHeadContent>
                        <StyledSidebarItemIcon>
                            {imageUrl && <StyledSidebarItemIconImage src={imageUrl} />}
                            {imageElement}
                            {icons && <Icon icons={icons} size={21} color={color} />}
                        </StyledSidebarItemIcon>
                        <StyledSidebarItemLabel>{label}</StyledSidebarItemLabel>
                    </StyledSidebarItemHeadContent>
                    {!!children && !isCompact && !isDisabled && (
                        <StyledMotionSidebarOpenIcon
                            initial={false}
                            animate={{ rotate: shouldShowChildren ? 180 : 0 }}
                            transition={{ type: 'tween' }}
                            onClick={(event) => {
                                event.stopPropagation();
                                setShouldShowChildren((prev) => !prev);
                            }}
                        >
                            <Icon icons={['fa fa-chevron-down']} color={color} />
                        </StyledMotionSidebarOpenIcon>
                    )}
                </StyledSidebarItemHead>
            </Tooltip>
            {!!children && (
                <ExpandableContent isOpen={shouldShowChildren}>
                    <StyledSidebarItemChildren>{children}</StyledSidebarItemChildren>
                </ExpandableContent>
            )}
        </StyledSidebarItem>
    );
};

SidebarItem.displayName = 'SidebarItem';

export default memo(SidebarItem);
