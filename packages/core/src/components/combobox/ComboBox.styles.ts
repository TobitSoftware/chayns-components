import type { Browser } from 'detect-browser';
import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import { ComboBoxDirection } from '../../types/comboBox';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import type { ComboBoxItemProps } from './combobox-item/ComboBoxItem';

export const StyledComboBox = styled.div`
    user-select: none;
    width: fit-content;
`;

type StyledComboBoxHeaderProps = WithTheme<{
    $isMobile: boolean;
    $isOpen: boolean;
    $minWidth: number;
    $direction: ComboBoxDirection;
    $isDisabled?: boolean;
}>;

export const StyledComboBoxHeader = styled.div<StyledComboBoxHeaderProps>`
    display: flex;
    justify-content: space-between;
    border: 1px solid rgba(160, 160, 160, 0.3);
    padding: 4px 10px;
    cursor: ${({ $isDisabled }) => (!$isDisabled ? 'pointer' : 'default')};
    background: ${({ theme }: StyledComboBoxHeaderProps) => theme['001']};
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    min-width: ${({ $minWidth }) => $minWidth}px;
    max-width: ${({ $minWidth }) => $minWidth}px;
    transition: background-color 0.2s ease-in-out;

    ${({ $isOpen, $direction }) => {
        if ($isOpen) {
            return $direction === ComboBoxDirection.BOTTOM
                ? css`
                      border-top-left-radius: 3px;
                      border-top-right-radius: 3px;
                  `
                : css`
                      border-bottom-left-radius: 3px;
                      border-bottom-right-radius: 3px;
                  `;
        }

        return css`
            border-radius: 3px;
        `;
    }}

    ${({ $isMobile, $isDisabled, theme }: StyledComboBoxHeaderProps) =>
        !$isMobile &&
        !$isDisabled &&
        css`
            &:hover {
                background-color: ${theme['secondary-102']};
            }
        `}
`;

type StyledComboBoxPlaceholderProps = WithTheme<unknown>;

export const StyledComboBoxPlaceholder = styled.div<StyledComboBoxPlaceholderProps>`
    align-items: center;
    color: ${({ theme }: StyledComboBoxPlaceholderProps) => theme.text};
    display: flex;
    gap: 10px;
`;

type StyledComboBoxPlaceholderImageProps = WithTheme<
    Pick<ComboBoxItemProps, 'shouldShowRoundImage'>
>;

export const StyledComboBoxPlaceholderImage = styled.img<StyledComboBoxPlaceholderImageProps>`
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledComboBoxPlaceholderImageProps) => theme['009-rgb']}, 0.15);
    height: 22px;
    width: 22px;

    ${({ shouldShowRoundImage }) =>
        shouldShowRoundImage &&
        css`
            border-radius: 50%;
        `}
`;

export const StyledComboBoxIconWrapper = styled.div`
    margin-left: 5px;
`;

type StyledComboBoxBodyProps = WithTheme<{
    $overflowY: CSSProperties['overflowY'];
    $minWidth: number;
    $maxHeight: CSSProperties['maxHeight'];
    $direction: ComboBoxDirection;
    $browser: Browser | 'bot' | null | undefined;
}>;

export const StyledMotionComboBoxBody = styled(motion.div)<StyledComboBoxBodyProps>`
    background: ${({ theme }: StyledComboBoxBodyProps) => theme['101']};
    display: flex;
    position: absolute;
    z-index: 4;
    flex-direction: column;
    border: 1px solid rgba(160, 160, 160, 0.3);
    cursor: pointer;
    min-width: ${({ $minWidth }) => $minWidth}px;
    max-width: ${({ $minWidth }) => $minWidth}px;
    max-height: ${({ $maxHeight }) => $maxHeight};
    overflow-y: ${({ $overflowY }) => $overflowY};

    ${({ $direction }) => {
        if ($direction === ComboBoxDirection.BOTTOM) {
            return css`
                border-bottom-left-radius: 3px;
                border-bottom-right-radius: 3px;
                box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.2);
            `;
        }

        return css`
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
            box-shadow: 0 -3px 10px 0 rgba(0, 0, 0, 0.2);
        `;
    }}

    // Styles for custom scrollbar
    ${({ $browser, theme }: StyledComboBoxBodyProps) =>
        $browser === 'firefox'
            ? css`
                  scrollbar-color: rgba(${theme['text-rgb']}, 0.15) transparent;
                  scrollbar-width: thin;
              `
            : css`
                  &::-webkit-scrollbar {
                      width: 5px;
                  }

                  &::-webkit-scrollbar-track {
                      background-color: transparent;
                  }

                  &::-webkit-scrollbar-button {
                      background-color: transparent;
                      height: 5px;
                  }

                  &::-webkit-scrollbar-thumb {
                      background-color: rgba(${theme['text-rgb']}, 0.15);
                      border-radius: 20px;
                  }
              `}
`;
