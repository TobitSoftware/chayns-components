import styled, { css } from 'styled-components';
import { WithTheme } from '../../../../color-scheme-provider/ColorSchemeProvider';

type StyledFinderHeaderProps = {
    $shouldUseShadow: boolean;
};

export const StyledFinderHeader = styled.div<StyledFinderHeaderProps>`
    transition: box-shadow 0.2s;

    ${({ $shouldUseShadow }) =>
        $shouldUseShadow &&
        css`
            box-shadow: 0 1px 4px #0000001a;
        `}
`;

export const StyledFinderHeaderFilter = styled.div`
    padding: 10px;
`;

type StyledFinderHeaderGroupNameProps = WithTheme<unknown>;

export const StyledFinderHeaderGroupName = styled.div<StyledFinderHeaderGroupNameProps>`
    padding: 5px 10px;
    font-weight: bold;

    color: ${({ theme }) => theme.text};
`;
