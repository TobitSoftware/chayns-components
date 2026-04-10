import React, { FC } from 'react';
import { StyledSidebarDivider } from './SidebarDivider.styles';

interface SidebarDividerProps {
    color: string;
}

const SidebarDivider: FC<SidebarDividerProps> = ({ color }) => (
    <StyledSidebarDivider $color={color} />
);

SidebarDivider.displayName = 'SidebarDivider';

export default SidebarDivider;
