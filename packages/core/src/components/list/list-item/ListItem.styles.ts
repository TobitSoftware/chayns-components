import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledListItemProps = WithTheme<{
    isClickable: boolean;
    isOpen: boolean;
}>;

export const StyledListItem = styled.div<StyledListItemProps>`
    ${({ isOpen }) =>
        isOpen &&
        css`
            background-color: rgba(${({ theme }: StyledListItemProps) => theme['100-rgb']}, 0.85);
        `}

    transition: background-color 0.3s ease;

    ${({ isClickable }) =>
        isClickable &&
        css`
            :hover {
                background-color: rgba(
                    ${({ theme }: StyledListItemProps) => theme['100-rgb']},
                    0.85
                );
            }
        `}

    :not(:last-child) {
        border-bottom: 1px solid ${({ theme }: StyledListItemProps) => theme.headline};
    }
`;
