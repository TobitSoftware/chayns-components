import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledPopupProps = WithTheme<{
    $shouldUseChildrenWidth: boolean;
    $shouldUseFullWidth: boolean;
}>;

export const StyledPopup = styled.span<StyledPopupProps>`
    cursor: pointer;
    position: relative;

    ${({ $shouldUseFullWidth }) =>
        $shouldUseFullWidth &&
        css`
            width: 100%;
        `};

    ${({ $shouldUseChildrenWidth }) =>
        $shouldUseChildrenWidth &&
        css`
            display: flex;
            width: fit-content;
            height: fit-content;
        `}
`;

export const StyledPopupPseudo = styled.div<{
    $menuHeight: number;
}>`
    top: ${({ $menuHeight }) => `${$menuHeight - 0}px`};
    left: 0;
    margin: 2px;
    pointer-events: none;
    opacity: 0;
    position: absolute;
`;
