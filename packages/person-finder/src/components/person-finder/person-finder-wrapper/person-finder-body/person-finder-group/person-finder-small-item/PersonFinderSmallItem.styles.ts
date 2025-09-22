import styled, { css } from 'styled-components';
import { WithTheme } from '@chayns-components/core';

type StyledPersonFinderSmallItemProps = WithTheme<{
    $isSelected?: boolean;
}>;

export const StyledPersonFinderSmallItem = styled.div<StyledPersonFinderSmallItemProps>`
    cursor: pointer;

    transition: background-color 0.2s;

    padding: 6px;

    &:hover {
        background-color: ${({ theme }: StyledPersonFinderSmallItemProps) => theme['102']};
    }

    ${({ $isSelected, theme }: StyledPersonFinderSmallItemProps) =>
        $isSelected &&
        css`
            background-color: ${theme['102']};

            &:hover {
                background-color: ${theme['102']};
            }
        `}
`;
