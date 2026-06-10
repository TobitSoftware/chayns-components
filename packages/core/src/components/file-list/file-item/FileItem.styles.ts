import styled from 'styled-components';
import { keyboardFocusHighlightingRingCss } from '../../styles/keyboardFocusHighlighting.styles';

export const StyledFileItem = styled.div``;

export const StyledFileItemKeyboardWrapper = styled.div`
    &:focus-visible {
        ${keyboardFocusHighlightingRingCss}
    }
`;

export const StyledFileItemActions = styled.span`
    display: flex;
    gap: 8px;
    align-items: center;
`;

export const StyledFileItemRemoveButton = styled.span`
    display: inline-flex;

    &:focus-visible {
        ${keyboardFocusHighlightingRingCss}
    }
`;
