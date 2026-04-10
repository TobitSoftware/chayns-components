import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

type StyledSidebarDividerProps = WithTheme<{ $color: string }>;

export const StyledSidebarDivider = styled.div<StyledSidebarDividerProps>`
    background-color: ${({ $color }) => $color};
    opacity: 0.35;
    flex: none;
    height: 1px;
    margin: 4px 0 8px;
    width: 100%;
`;
