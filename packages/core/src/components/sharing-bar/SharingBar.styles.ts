import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledSharingBar = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    width: fit-content;
`;

export const StyledSharingBarIconWrapper = styled.div`
    margin-right: -4px;
`;

type StyledSharingBarTextProps = WithTheme<unknown>;

export const StyledSharingBarText = styled.p<StyledSharingBarTextProps>`
    color: ${({ theme }: StyledSharingBarTextProps) => theme.text};
`;
