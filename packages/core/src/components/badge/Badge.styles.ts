import type { CSSProperties } from 'react';
import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledBadgeProps = WithTheme<{
    $cursor: CSSProperties['cursor'];
    $backgroundColor?: CSSProperties['backgroundColor'];
    $borderRadius: CSSProperties['borderRadius'];
    $fontColor?: CSSProperties['color'];
    $minWidth: CSSProperties['minWidth'];
}>;

export const StyledBadge = styled.div<StyledBadgeProps>`
    background-color: ${({ $backgroundColor, theme }: StyledBadgeProps) =>
        $backgroundColor ?? theme['secondary-202']};
    border-radius: ${({ $borderRadius }) => $borderRadius};
    color: ${({ $fontColor, theme }: StyledBadgeProps) => $fontColor ?? theme.text};
    display: inline-block;
    font-size: 0.8rem;
    min-width: ${({ $minWidth }) => $minWidth};
    padding: 2px 6px;
    line-height: 20px;
    text-align: center;
    cursor: ${({ $cursor }) => $cursor};
`;
