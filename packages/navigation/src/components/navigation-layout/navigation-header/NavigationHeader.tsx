import React, { FC } from 'react';
import { StyledNavigationHeader } from './NavigationHeader.styles';
import { NavigationHeaderProps } from './NavigationHeader.types';
import MenuToggle from './menu-toggle/MenuToggle';

const NavigationHeader: FC<NavigationHeaderProps> = ({
    color,
    height,
    safeAreas,
    headerContent,
    onMenuClick,
    isMobileOpen,
    isMobile,
}) => (
    <StyledNavigationHeader
        $color={color}
        $height={height}
        $safeAreas={safeAreas}
        className="navigation-layout-header"
    >
        {isMobile && <MenuToggle color={color} isOpen={isMobileOpen} onClick={onMenuClick} />}
        {headerContent}
    </StyledNavigationHeader>
);
NavigationHeader.displayName = 'NavigationHeader';

export default NavigationHeader;
