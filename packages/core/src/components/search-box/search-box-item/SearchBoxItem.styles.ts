import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledSearchBoxItemProps = WithTheme<unknown>;
export const StyledSearchBoxItem = styled.div<StyledSearchBoxItemProps>`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;

    &:hover {
        background: ${({ theme }: StyledSearchBoxItemProps) => theme['secondary-103']};
    }

    &:focus {
        background: ${({ theme }: StyledSearchBoxItemProps) => theme['secondary-103']};
    }
`;

type StyledSearchBoxItemImageProps = WithTheme<{ $shouldShowRoundImage?: boolean }>;

export const StyledSearchBoxItemImage = styled.img<StyledSearchBoxItemImageProps>`
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledSearchBoxItemImageProps) => theme['009-rgb']}, 0.15);
    height: 22px;
    width: 22px;

    ${({ $shouldShowRoundImage }) =>
        $shouldShowRoundImage &&
        css`
            border-radius: 50%;
        `}
`;

type StyledSearchBoxItemTextProps = WithTheme<unknown>;

export const StyledSearchBoxItemText = styled.p<StyledSearchBoxItemTextProps>`
    color: ${({ theme }: StyledSearchBoxItemTextProps) => theme.text};
    margin: 5px 0 !important;
`;
