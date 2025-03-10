import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

type StyledPersonFinderItemProps = WithTheme<unknown>;

export const StyledPersonFinderItem = styled.div<StyledPersonFinderItemProps>`
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }: StyledPersonFinderItemProps) => theme['102']};
    }
`;
