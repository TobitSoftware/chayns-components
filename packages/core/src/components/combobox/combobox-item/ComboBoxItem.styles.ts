import styled from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledComboBoxItemProps = WithTheme<unknown>;

export const StyledComboBoxItem = styled.div<StyledComboBoxItemProps>`
    color: ${({ theme }: StyledComboBoxItemProps) => theme.text};
    padding: 4px 10px;

    &:hover {
        background: ${({ theme }: StyledComboBoxItemProps) => theme['secondary-103']};
    }
`;
