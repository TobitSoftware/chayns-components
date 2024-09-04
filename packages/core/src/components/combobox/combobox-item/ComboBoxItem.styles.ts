import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledComboBoxItemProps = WithTheme<{
    $isTouch: boolean;
    $isSelected: boolean;
}>;

export const StyledComboBoxItem = styled.div<StyledComboBoxItemProps>`
    align-items: center;
    background-color: ${({ theme, $isSelected }: StyledComboBoxItemProps) =>
        $isSelected && theme['secondary-103']};
    color: ${({ theme }: StyledComboBoxItemProps) => theme.text};
    display: flex;
    gap: 10px;
    padding: 4px 10px;
    transition: background-color 0.2s ease-in-out;

    ${({ $isTouch, theme }: StyledComboBoxItemProps) =>
        !$isTouch &&
        css`
            &:hover {
                background-color: ${theme['secondary-102']};
            }

            &:focus {
                background-color: ${theme['secondary-102']};
            }
        `}
`;

type StyledComboBoxItemImageProps = WithTheme<{
    $shouldShowBigImage?: boolean;
    $shouldShowRoundImage?: boolean;
}>;

export const StyledComboBoxItemImage = styled.img<StyledComboBoxItemImageProps>`
    ${({ $shouldShowRoundImage }) =>
        $shouldShowRoundImage &&
        css`
            border-radius: 50%;
        `}

    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledComboBoxItemImageProps) => theme['009-rgb']}, 0.15);
    flex: 0 0 auto;
    height: ${({ $shouldShowBigImage }) => ($shouldShowBigImage ? '40px' : '22px')};
    width: ${({ $shouldShowBigImage }) => ($shouldShowBigImage ? '40px' : '22px')};
`;

export const StyledComboBoxItemContent = styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    line-height: normal;
`;

export const StyledComboBoxItemContentHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const StyledComboBoxItemContentHeaderText = styled.div`
    display: flex;
    gap: 4px;
`;

export const StyledComboBoxItemContentHeaderRightElement = styled.div``;

export const StyledComboBoxItemContentSubtext = styled.div`
    font-size: 90%;
    margin-top: 2px;
`;
