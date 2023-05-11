import styled from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledComboBoxItemProps = WithTheme<unknown>;

export const StyledComboBoxItem = styled.div<StyledComboBoxItemProps>`
    &:hover {
        background: ${({ theme }: StyledComboBoxItemProps) => theme['secondary-103']};
    }
`;

export const StyledComboBoxItemText = styled.p`
    margin: 5px;
`;
