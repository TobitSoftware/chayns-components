import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

type StyledNavigationSidebarProps = WithTheme<{ $color: string }>;

export const StyledNavigationSidebar = styled.div<StyledNavigationSidebarProps>`
    height: 100%;
    color: ${({ $color }) => $color};
`;
