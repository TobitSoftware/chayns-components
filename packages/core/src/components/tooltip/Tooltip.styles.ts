import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledTooltip = styled.div``;

type StyledTooltipChildrenProps = WithTheme<{
    $isOnlyText: boolean;
    $shouldUseChildrenWidth: boolean;
    $shouldUseFullWidth: boolean;
}>;
export const StyledTooltipChildren = styled.div<StyledTooltipChildrenProps>`
    ${({ $shouldUseChildrenWidth }) =>
        $shouldUseChildrenWidth &&
        css`
            width: fit-content;
        `}

    ${({ $shouldUseFullWidth }) =>
        $shouldUseFullWidth &&
        css`
            width: 100%;
        `};

    ${({ $isOnlyText, theme }: StyledTooltipChildrenProps) =>
        $isOnlyText &&
        css`
            line-height: normal;

            border-bottom-width: 1px;
            border-bottom-style: dotted;
            border-bottom-color: ${theme.text};
        `}
`;
