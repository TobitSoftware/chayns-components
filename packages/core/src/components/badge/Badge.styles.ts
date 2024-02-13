import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledBadgeProps = WithTheme<{
    backgroundColor?: string;
    fontColor?: string;
    isOnClick: boolean;
}>;

export const StyledBadge = styled.div<StyledBadgeProps>`
    background-color: ${({ backgroundColor, theme }: StyledBadgeProps) =>
        backgroundColor ?? theme['secondary-202']};
    border-radius: 15px;
    color: ${({ fontColor, theme }: StyledBadgeProps) => fontColor ?? theme['007']};
    display: inline-block;
    font-size: 0.8rem;
    min-width: 1.65rem;
    padding: 2px 7px;
    text-align: center;
    cursor: ${({ isOnClick }) => (isOnClick ? 'pointer' : 'default')};
`;
