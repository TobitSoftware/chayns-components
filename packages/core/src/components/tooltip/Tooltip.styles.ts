import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledTooltip = styled.div``;

type StyledTooltipChildrenProps = WithTheme<{ $isOnlyText: boolean }>;
export const StyledTooltipChildren = styled.div<StyledTooltipChildrenProps>`
    ${({ $isOnlyText, theme }: StyledTooltipChildrenProps) =>
        $isOnlyText &&
        css`
            border-bottom-width: 1px;
            border-bottom-style: dotted;
            border-bottom-color: ${theme.text};
        `}
`;
