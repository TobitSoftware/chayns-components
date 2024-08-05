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

export const StyledComboBoxTopic = styled.div`
    align-items: center;
    color: ${({ theme }) => theme.text};
    position: sticky;
    top: 0;
    border: black 5px;
    cursor: default;
    font-weight: bold;
    display: flex;
    gap: 10px;
    padding: 4px 10px;
    transition: background-color 0.2s ease-in-out;
    backdrop-filter: blur(1000px);
`;

type StyledComboBoxItemImageProps = WithTheme<{ $shouldShowRoundImage?: boolean }>;

export const StyledComboBoxItemImage = styled.img<StyledComboBoxItemImageProps>`
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledComboBoxItemImageProps) => theme['009-rgb']}, 0.15);
    height: 22px;
    width: 22px;

    ${({ $shouldShowRoundImage }) =>
        $shouldShowRoundImage &&
        css`
            border-radius: 50%;
        `}
`;
