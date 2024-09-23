import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledPopupProps = WithTheme<{
    $shouldUseChildrenWidth: boolean;
}>;

export const StyledPopup = styled.span<StyledPopupProps>`
    cursor: pointer;
    position: relative;

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
    visibility: hidden;
    position: absolute;
    border: red solid 1px;
`;
