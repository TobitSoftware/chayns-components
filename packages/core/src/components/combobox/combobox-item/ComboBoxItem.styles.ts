import styled from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledComboBoxItemProps = WithTheme<unknown>;

export const StyledComboBoxItem = styled.div<StyledComboBoxItemProps>`
    &:hover {
        background: ${({ theme }: StyledComboBoxItemProps) => theme['secondary-103']};
    }
`;

type StyledComboBoxItemTextProps = WithTheme<unknown>;

export const StyledComboBoxItemText = styled.p<StyledComboBoxItemTextProps>`
    color: ${({ theme }: StyledComboBoxItemTextProps) => theme.text};
    margin: 5px;
`;
