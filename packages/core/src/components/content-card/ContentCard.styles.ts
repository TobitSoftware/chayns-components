import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledContentCardProps = WithTheme<unknown>;

export const StyledContentCard = styled.div<StyledContentCardProps>`
    ${({ theme }: StyledContentCardProps) => css`
        background-color: rgba(${theme['100-rgb']}, ${theme.cardBackgroundOpacity});
        border-radius: ${theme.cardBorderRadius}px;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, ${theme.cardShadow});
    `}

    padding: 8px 12px;

    &:not(:last-child) {
        margin-bottom: 8px;
    }
`;
