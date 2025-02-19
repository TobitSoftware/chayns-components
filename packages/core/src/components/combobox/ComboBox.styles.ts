import { motion } from 'motion/react';
import type { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import { BrowserName } from '../../types/chayns';
import { ComboBoxDirection } from '../../types/comboBox';
import type { Theme, WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import type { ComboBoxProps } from './ComboBox';

type StyledComboBoxProps = WithTheme<{
    $minWidth?: number;
    $shouldUseFullWidth: ComboBoxProps['shouldUseFullWidth'];
    $shouldUseCurrentItemWidth: ComboBoxProps['shouldUseCurrentItemWidth'];
}>;

export const StyledComboBox = styled.div<StyledComboBoxProps>`
    user-select: none;
    position: relative;

    ${({ $shouldUseFullWidth, $minWidth, $shouldUseCurrentItemWidth }) => {
        if (typeof $minWidth !== 'number') {
            return css`
                width: fit-content;
            `;
        }

        if ($shouldUseFullWidth) {
            return css`
                min-width: ${$minWidth}px;
                width: 100%;
            `;
        }

        if ($shouldUseCurrentItemWidth) {
            return '';
        }

        return css`
            min-width: ${$minWidth}px;
            max-width: ${$minWidth}px;
        `;
    }}
`;

type StyledComboBoxHeaderProps = WithTheme<{
    $isTouch: boolean;
    $isOpen: boolean;
    $direction: ComboBoxDirection;
    $isDisabled?: boolean;
    $shouldChangeColor: boolean;
    $shouldShowBigImage: ComboBoxProps['shouldShowBigImage'];
}>;

export const StyledComboBoxHeader = styled.div<StyledComboBoxHeaderProps>`
    display: flex;
    justify-content: space-between;
    border: 1px solid rgba(160, 160, 160, 0.3);
    padding: 4px 10px;
    cursor: ${({ $isDisabled }) => (!$isDisabled ? 'pointer' : 'default')};
    background-color: ${({ theme, $shouldChangeColor }: StyledComboBoxHeaderProps) =>
        theme.colorMode === 'classic' || $shouldChangeColor ? theme['000'] : theme['100']};
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    transition: background-color 0.2s ease-in-out;

    ${({ $shouldShowBigImage }) =>
        $shouldShowBigImage &&
        css`
            height: 42px;
        `}

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

    ${({ $isTouch, $isDisabled, theme }: StyledComboBoxHeaderProps) =>
        !$isTouch &&
        !$isDisabled &&
        css`
            &:hover {
                background-color: ${theme['secondary-102']};
            }
        `}
`;

type StyledComboBoxPlaceholderProps = WithTheme<{ $shouldReduceOpacity: boolean }>;

export const StyledComboBoxPlaceholder = styled.div<StyledComboBoxPlaceholderProps>`
    align-items: center;
    color: ${({ theme }: StyledComboBoxPlaceholderProps) => theme.text};
    display: flex;
    flex: 1 1 auto;
    gap: 10px;
    min-width: 0;
    opacity: ${({ $shouldReduceOpacity }) => ($shouldReduceOpacity ? 0.5 : 1)};
`;

export const StyledComboBoxPlaceholderText = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const StyledComboBoxPrefixAndPlaceholderWrapper = styled.div`
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    min-width: 0;
`;

export const StyledComboBoxPrefix = styled.div`
    flex: 0 0 auto;
    min-width: 32px;
    padding-right: 5px;
`;

export const StyledComboBoxInput = styled.input`
    color: ${({ theme }: { theme: Theme }) => theme.text};
    border: none;
    background-color: transparent;
    width: 100%;
`;

type StyledComboBoxPlaceholderImageProps = WithTheme<{
    $shouldShowBigImage: ComboBoxProps['shouldShowBigImage'];
    $shouldShowRoundImage: ComboBoxProps['shouldShowRoundImage'];
}>;

export const StyledComboBoxPlaceholderImage = styled.img<StyledComboBoxPlaceholderImageProps>`
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledComboBoxPlaceholderImageProps) => theme['009-rgb']}, 0.15);
    height: ${({ $shouldShowBigImage }) => ($shouldShowBigImage ? '32px' : '22px')};
    width: ${({ $shouldShowBigImage }) => ($shouldShowBigImage ? '32px' : '22px')};

    ${({ $shouldShowRoundImage }) =>
        $shouldShowRoundImage &&
        css`
            border-radius: 50%;
        `}
`;

export const StyledComboBoxIconWrapper = styled.div`
    align-items: center;
    display: flex;
    margin-left: 5px;
`;

type StyledComboBoxBodyProps = WithTheme<{
    $overflowY: CSSProperties['overflowY'];
    $maxHeight: CSSProperties['maxHeight'];
    $direction: ComboBoxDirection;
    $browser: BrowserName;
    $minWidth: number;
    $shouldUseCurrentItemWidth: boolean;
}>;

export const StyledMotionComboBoxBody = styled(motion.div)<StyledComboBoxBodyProps>`
    background: ${({ theme }: StyledComboBoxBodyProps) => theme['000']};
    display: flex;
    position: absolute;
    z-index: 4;
    flex-direction: column;
    border: 1px solid rgba(160, 160, 160, 0.3);
    cursor: pointer;
    max-height: ${({ $maxHeight }) => $maxHeight};
    overflow-y: ${({ $overflowY }) => $overflowY};
    overflow-x: hidden;
    min-width: ${({ $minWidth, $overflowY }) => $minWidth - ($overflowY === 'scroll' ? 5 : 0)}px;

    ${({ $minWidth, $overflowY, $shouldUseCurrentItemWidth }) =>
        !$shouldUseCurrentItemWidth &&
        css`
            max-width: ${$minWidth - ($overflowY === 'scroll' ? 5 : 0)}px;
        `}

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

type StyledComboBoxTopicProps = WithTheme<unknown>;

export const StyledComboBoxTopic = styled.div`
    align-items: center;
    color: rgba(${({ theme }: StyledComboBoxTopicProps) => theme['text-rgb']}, 0.65);
    position: sticky;
    top: 0;
    border: black 5px;
    cursor: default;
    font-weight: bold;
    display: flex;
    gap: 10px;
    z-index: 10;
    padding: 4px 10px;
    background-color: ${({ theme }: StyledComboBoxTopicProps) => theme['secondary-101']};
`;
