import styled from 'styled-components';

export const StyledFileItem = styled.div``;
export const StyledFileItemIcon = styled.div`
    align-items: center;
    cursor: pointer;
    display: flex;
    background-color: transparent;
    border-radius: 3px;
    padding: 6px;
    transition: background-color 0.3s ease;

    &:focus-visible {
        outline: none;
        color: inherit;
    }
`;

export const StyledFileItemKeyboardWrapper = styled.div``;

export const StyledFileItemActions = styled.span`
    display: flex;
    gap: 8px;
    align-items: center;
`;

export const StyledFileItemRemoveButton = styled.span`
    display: inline-flex;
`;
