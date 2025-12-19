import styled, { css } from 'styled-components';
import { WithTheme } from '@chayns-components/core';

type StyledPersonFinderHeaderProps = WithTheme<{ $shouldShowShadow: boolean }>;

export const StyledPersonFinderHeader = styled.div<StyledPersonFinderHeaderProps>`
    transition: box-shadow 0.2s;

    ${({ $shouldShowShadow }: StyledPersonFinderHeaderProps) =>
        $shouldShowShadow &&
        css`
            box-shadow: 0 1px 4px #0000001a;
        `}
`;

export const StyledPersonFinderHeaderFilter = styled.div`
    padding: 10px;
`;

type StyledPersonFinderHeaderGroupNameProps = WithTheme<unknown>;

export const StyledPersonFinderHeaderGroupName = styled.div<StyledPersonFinderHeaderGroupNameProps>`
    padding: 5px 10px;
    font-weight: bold;

    color: ${({ theme }: StyledPersonFinderHeaderGroupNameProps) => theme.text};
`;
