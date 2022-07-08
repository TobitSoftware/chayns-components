import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import type { BadgeProps } from './Badge';

type StyledBadgeProps = WithTheme<Pick<BadgeProps, 'backgroundColor' | 'fontColor'>>;

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
`;
