import styled, { css } from 'styled-components';
import { WithTheme } from '@chayns-components/core';

type StyledPersonFinderItemProps = WithTheme<{ $isSelected?: boolean }>;

export const StyledPersonFinderItem = styled.div<StyledPersonFinderItemProps>`
    cursor: pointer;

    transition: background-color 0.2s;

    &:hover {
        background-color: ${({ theme }: StyledPersonFinderItemProps) => theme['102']};
    }

    ${({ $isSelected, theme }: StyledPersonFinderItemProps) =>
        $isSelected &&
        css`
            background-color: ${theme['102']};

            &:hover {
                background-color: ${theme['102']};
            }
        `}
`;
