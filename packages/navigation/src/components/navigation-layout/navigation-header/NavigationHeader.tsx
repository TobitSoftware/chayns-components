import React, { FC } from 'react';
import { StyledNavigationHeader } from './NavigationHeader.styles';
import { NavigationHeaderProps } from './NavigationHeader.types';

const NavigationHeader: FC<NavigationHeaderProps> = ({
    color,
    height,
    safeAreas,
    headerContent,
}) => (
    <StyledNavigationHeader
        $color={color}
        $height={height}
        $safeAreas={safeAreas}
        className="navigation-layout-header"
    >
        {headerContent}
    </StyledNavigationHeader>
);
NavigationHeader.displayName = 'NavigationHeader';

export default NavigationHeader;
