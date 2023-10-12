import styled from 'styled-components';

export const StyledPopup = styled.span`
    cursor: pointer;
    position: relative;
`;

export const StyledPopupPseudo = styled.div<{
    menuHeight: number;
}>`
    top: ${({ menuHeight }) => `${menuHeight - 0}px`};
    left: 0;
    pointer-events: none;
    visibility: hidden;
    position: absolute;
`;
