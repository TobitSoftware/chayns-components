import styled, { css } from 'styled-components';
import { WithTheme } from '@chayns-components/core';

type StyledPersonFinderHeaderProps = WithTheme<{ $isScrollTop: boolean }>;

export const StyledPersonFinderHeader = styled.div<StyledPersonFinderHeaderProps>`
    transition: box-shadow 0.2s;

    ${({ $isScrollTop }: StyledPersonFinderHeaderProps) =>
        !$isScrollTop &&
        css`
            box-shadow: 0 1px 4px #0000001a;
        `}
`;

export const StyledPersonFinderHeaderFilter = styled.div`
    padding: 10px;
`;

export const StyledPersonFinderHeaderGroupName = styled.div`
    padding: 5px 10px;
    font-weight: bold;
`;
