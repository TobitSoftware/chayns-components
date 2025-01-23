import { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledComboBoxItemProps = WithTheme<{
    $isDisabled?: boolean;
    $isSelected: boolean;
    $isTouch: boolean;
}>;

export const StyledComboBoxItem = styled.div<StyledComboBoxItemProps>`
    align-items: center;
    background-color: ${({ theme, $isSelected }: StyledComboBoxItemProps) =>
        $isSelected && theme['secondary-102']};
    color: ${({ theme }: StyledComboBoxItemProps) => theme.text};
    display: flex;
    gap: 10px;
    padding: 4px 10px;
    transition: background-color 0.2s ease-in-out;

    ${({ $isDisabled }) =>
        $isDisabled &&
        css`
            opacity: 0.5;
            pointer-events: none;
        `}

    ${({ $isDisabled, $isTouch, theme }: StyledComboBoxItemProps) =>
        !$isDisabled &&
        !$isTouch &&
        css`
            &:hover {
                background-color: ${theme['secondary-101']};
            }

            &:focus {
                background-color: ${theme['secondary-101']};
            }
        `}
`;

type StyledComboBoxItemImageProps = WithTheme<{
    $background?: CSSProperties['background'];
    $shouldShowBigImage?: boolean;
    $shouldShowRoundImage?: boolean;
}>;

export const StyledComboBoxItemImage = styled.img<StyledComboBoxItemImageProps>`
    ${({ $shouldShowRoundImage }) =>
        $shouldShowRoundImage &&
        css`
            border-radius: 50%;
        `}

    background: ${({ $background, theme }: StyledComboBoxItemImageProps) =>
        $background || `rgba(${theme['text-rgb'] ?? '0,0,0'}, 0.1)`};
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
    min-width: 0;
    width: 100%;
`;

type StyledComboBoxItemContentHeaderProps = {
    $text?: string;
    $subtext?: string;
};
export const StyledComboBoxItemContentHeader = styled.div<StyledComboBoxItemContentHeaderProps>`
    align-items: center;
    display: flex;
    justify-content: space-between;
    font-weight: ${({ $text, $subtext }) => ($text && $subtext ? 'bold' : 'normal')};
    font-size: ${({ $text, $subtext }) => $text && $subtext && '17px'};
`;

export const StyledComboBoxItemContentHeaderWrapper = styled.div`
    display: flex;
    flex: 1 1 auto;
    gap: 4px;
    min-width: 0;
`;

export const StyledComboBoxItemContentHeaderWrapperText = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const StyledComboBoxItemContentHeaderRightElement = styled.div`
    align-items: center;
    display: flex;
`;

export const StyledComboBoxItemContentSubtext = styled.div`
    font-size: 90%;
    margin-top: 2px;
`;
