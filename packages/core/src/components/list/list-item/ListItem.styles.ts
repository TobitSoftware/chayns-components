import styled, { css } from 'styled-components';

interface StyledListItemProps {
    isClickable: boolean;
    isOpen: boolean;
}

export const StyledListItem = styled.div<StyledListItemProps>`
    ${({ isOpen }) =>
        isOpen &&
        css`
            background-color: rgba(${({ theme }) => theme['100-rgb']}, 0.85);
        `}

    transition: background-color 0.2s ease;

    ${({ isClickable }) =>
        isClickable &&
        css`
            :hover {
                background-color: rgba(${({ theme }) => theme['100-rgb']}, 0.85);
            }
        `}

    :not(:last-child) {
        border-bottom: 1px solid ${({ theme }) => theme['headline']};
    }
`;
