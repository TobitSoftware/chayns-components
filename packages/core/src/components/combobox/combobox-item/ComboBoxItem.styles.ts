import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';
import type { ComboBoxItemProps } from './ComboBoxItem';

type StyledComboBoxItemProps = WithTheme<{
    isMobile: boolean;
    isSelected: boolean;
}>;

export const StyledComboBoxItem = styled.div<StyledComboBoxItemProps>`
    align-items: center;
    background-color: ${({ theme, isSelected }: StyledComboBoxItemProps) =>
        isSelected && theme['secondary-102']};
    color: ${({ theme }: StyledComboBoxItemProps) => theme.text};
    display: flex;
    gap: 10px;
    padding: 4px 10px;

    ${({ isMobile, theme }: StyledComboBoxItemProps) =>
        !isMobile &&
        css`
            &:hover {
                background-color: ${theme['secondary-101']};
            }
        `}
`;

type StyledComboBoxItemImageProps = WithTheme<Pick<ComboBoxItemProps, 'shouldShowRoundImage'>>;

export const StyledComboBoxItemImage = styled.img<StyledComboBoxItemImageProps>`
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledComboBoxItemImageProps) => theme['009-rgb']}, 0.15);
    height: 22px;
    width: 22px;

    ${({ shouldShowRoundImage }) =>
        shouldShowRoundImage &&
        css`
            border-radius: 50%;
        `}
`;
