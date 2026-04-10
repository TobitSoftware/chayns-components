import React, { FC } from 'react';
import { StyledNavigationHeader } from './NavigationHeader.styles';
import { NavigationHeaderProps } from './NavigationHeader.types';

const NavigationHeader: FC<NavigationHeaderProps> = ({ color, height }) => (
    <StyledNavigationHeader $color={color} $height={height}>
        Header
    </StyledNavigationHeader>
);
NavigationHeader.displayName = 'NavigationHeader';

export default NavigationHeader;
