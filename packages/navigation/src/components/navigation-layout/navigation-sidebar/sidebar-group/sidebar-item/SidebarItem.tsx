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
    StyledSidebarItemPopup,
} from './SidebarItem.styles';
import { NavigationLayoutItem, NavigationLayoutProps } from '../../../NavigationLayout.types';
import { isItemOrChildSelected } from './SidebarItem.utils';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'motion/react';
import { useSidebarItemPopup } from './SidebarItem.hooks';

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
    shouldShowCollapsedLabel: NavigationLayoutProps['shouldShowCollapsedLabel'];
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
    shouldShowCollapsedLabel,
}) => {
    const [shouldShowChildren, setShouldShowChildren] = useState(false);
    const {
        coordinates,
        handleMouseEnter,
        handleMouseLeave,
        isHovered,
        itemRef,
        popupContainer,
        shouldRenderPopup,
    } = useSidebarItemPopup({
        isDisabled,
        shouldShowCollapsedLabel,
    });

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

    const handleOpenIconClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setShouldShowChildren((previousValue) => !previousValue);
    }, []);

    const renderChildItem = useCallback(
        (childItem: NavigationLayoutItem) => (
            <SidebarItem
                key={childItem.id}
                id={childItem.id}
                selectedItemId={selectedItemId}
                isDisabled={childItem.isDisabled}
                icons={childItem.icons}
                disabledReason={childItem.disabledReason}
                imageUrl={childItem.imageUrl}
                shouldShowCollapsedLabel={false}
                imageElement={childItem.imageElement}
                label={childItem.label}
                childItems={childItem.children}
                color={color}
                onClick={onClick}
                isCompact={isCompact}
            />
        ),
        [color, isCompact, onClick, selectedItemId],
    );

    const children = useMemo(() => {
        if (!childItems || childItems.length === 0) {
            return null;
        }

        return childItems.map(renderChildItem);
    }, [childItems, renderChildItem]);

    return (
        <StyledSidebarItem>
            <Tooltip
                item={{ text: disabledReason ?? '' }}
                isDisabled={!disabledReason}
                shouldUseFullWidth
            >
                <StyledSidebarItemHead
                    ref={itemRef}
                    $shouldHighlight={!isDisabled && (isHovered || isSelected)}
                    $isDisabled={isDisabled}
                    $hasDisabledReason={!!disabledReason}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
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
                            onClick={handleOpenIconClick}
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
            {popupContainer &&
                createPortal(
                    <AnimatePresence initial={false}>
                        {shouldRenderPopup && coordinates && (
                            <StyledSidebarItemPopup $coordinates={coordinates}>
                                {label}
                            </StyledSidebarItemPopup>
                        )}
                    </AnimatePresence>,
                    popupContainer,
                )}
        </StyledSidebarItem>
    );
};

SidebarItem.displayName = 'SidebarItem';

export default memo(SidebarItem);
