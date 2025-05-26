import type { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import { BadgeDesign } from '../../types/badge';

type StyledBadgeProps = WithTheme<{
    $cursor: CSSProperties['cursor'];
    $backgroundColor?: CSSProperties['backgroundColor'];
    $borderRadius: CSSProperties['borderRadius'];
    $fontColor?: CSSProperties['color'];
    $minWidth: CSSProperties['minWidth'];
    $size?: { font: CSSProperties['fontSize']; padding: CSSProperties['padding'] };
    $design: BadgeDesign;
}>;

export const StyledBadge = styled.div<StyledBadgeProps>`
    ${({
        $backgroundColor,
        theme,
        $fontColor,
        $design,
        $cursor,
        $borderRadius,
        $size,
        $minWidth,
    }: StyledBadgeProps) => {
        switch ($design) {
            case BadgeDesign.BORDER:
                return css`
                    border-radius: 50px;
                    border: 1px solid ${theme.primary};
                    color: ${theme.primary};
                    font-size: ${$size?.font};
                    padding: ${$size?.padding};
                    user-select: none;
                    width: fit-content;
                `;
            case BadgeDesign.DEFAULT:
            default:
                return css`
                    background-color: ${$backgroundColor ?? theme['secondary-202']};
                    border-radius: ${$borderRadius};
                    color: ${$fontColor ?? theme.text};
                    display: inline-block;
                    font-size: 0.8rem;
                    min-width: ${$minWidth};
                    padding: 2px 6px;
                    line-height: 20px;
                    text-align: center;
                    cursor: ${$cursor};
                `;
        }
    }}
`;
