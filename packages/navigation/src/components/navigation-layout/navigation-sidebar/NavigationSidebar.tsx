import React, { FC } from 'react';
import { StyledNavigationSidebar } from './NavigationSidebar.styles';
import { NavigationSidebarProps } from './NavigationSidebar.types';

const NavigationSidebar: FC<NavigationSidebarProps> = ({ color }) => (
    <StyledNavigationSidebar $color={color}>Sidebar</StyledNavigationSidebar>
);
NavigationSidebar.displayName = 'NavigationSidebar';

export default NavigationSidebar;
