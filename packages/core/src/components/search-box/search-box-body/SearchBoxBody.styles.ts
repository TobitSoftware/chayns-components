import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

export const StyledSearchBoxBody = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StyledSearchBoxBodyHead = styled.div<StyledSearchBoxHeadProps>`
    padding: 10px 10px 5px;
    display: flex;
    flex-direction: column;

    ${({ $hasGroupName }) =>
        $hasGroupName &&
        css`
            gap: 15px;
        `}

    ${({ $hasScrolled }) =>
        $hasScrolled &&
        css`
            box-shadow: 0 1px 4px #0000001a;
        `}
`;

type StyledSearchBoxHeadProps = WithTheme<{ $hasScrolled: boolean; $hasGroupName: boolean }>;

type StyledSearchBoxBodyHeadGroupNameNameProps = WithTheme<unknown>;

export const StyledSearchBoxBodyHeadGroupName = styled.div<StyledSearchBoxBodyHeadGroupNameNameProps>`
    color: ${({ theme }: StyledSearchBoxBodyHeadGroupNameNameProps) => theme.text};
    font-weight: bold;
`;

type StyledSearchBoxBodyContentProps = WithTheme<{
    $height: number;
    $headHeight: number;
}>;

export const StyledSearchBoxBodyContent = styled.div<StyledSearchBoxBodyContentProps>`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    width: 100%;
    max-height: ${({ $headHeight }) => 300 - $headHeight}px;
    overflow-y: ${({ $height, $headHeight }) => ($height + $headHeight <= 300 ? 'hidden' : 'auto')};
`;
