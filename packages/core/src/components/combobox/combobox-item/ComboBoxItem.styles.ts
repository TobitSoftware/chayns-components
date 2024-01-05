import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledComboBoxItemProps = WithTheme<{
    isMobile: boolean;
    isSelected: boolean;
}>;

export const StyledComboBoxItem = styled.div<StyledComboBoxItemProps>`
    color: ${({ theme }: StyledComboBoxItemProps) => theme.text};
    padding: 4px 10px;
    background-color: ${({ theme, isSelected }: StyledComboBoxItemProps) =>
        isSelected && theme['secondary-102']};

    ${({ isMobile, theme }: StyledComboBoxItemProps) =>
        !isMobile &&
        css`
            &:hover {
                background-color: ${theme['secondary-101']};
            }
        `}
`;
