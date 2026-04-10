import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

type StyledNavigationHeaderProps = WithTheme<{ $height: number; $color: string }>;

export const StyledNavigationHeader = styled.div<StyledNavigationHeaderProps>`
    width: 100%;
    height: ${({ $height }) => $height}px;
    color: ${({ $color }) => $color};
`;
