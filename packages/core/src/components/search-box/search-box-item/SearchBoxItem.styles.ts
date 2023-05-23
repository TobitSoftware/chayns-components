import styled from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledSearchBoxItemProps = WithTheme<unknown>;
export const StyledSearchBoxItem = styled.div<StyledSearchBoxItemProps>`
    &:hover {
        background: ${({ theme }: StyledSearchBoxItemProps) => theme['secondary-103']};
    }
`;

type StyledSearchBoxItemTextProps = WithTheme<unknown>;

export const StyledSearchBoxItemText = styled.p<StyledSearchBoxItemTextProps>`
    color: ${({ theme }: StyledSearchBoxItemTextProps) => theme.text};
    margin: 5px;
`;
