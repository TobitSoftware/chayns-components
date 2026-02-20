import styled, { css } from 'styled-components';
import { BrowserName } from '../../types/chayns';
import type { Theme, WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import { ComboBoxProps, ComboBoxSize } from './ComboBox';
import { DropdownDirection } from '../../types/dropdown';

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
    $direction: DropdownDirection;
    $isDisabled?: boolean;
    $shouldChangeColor: boolean;
    $shouldShowBigImage: ComboBoxProps['shouldShowBigImage'];
    $shouldShowTransparentBackground: boolean;
    $size: ComboBoxSize;
}>;

export const StyledComboBoxHeader = styled.div<StyledComboBoxHeaderProps>`
    display: flex;
    border: 1px solid transparent;
    cursor: ${({ $isDisabled }) => (!$isDisabled ? 'pointer' : 'default')};
    justify-content: space-between;
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    transition: background-color 0.2s ease-in-out;

    ${({ $size }) => {
        switch ($size) {
            case ComboBoxSize.SMALL:
                return css`
                    height: 34px;
                `;
            case ComboBoxSize.NORMAL:
            default:
                return css`
                    min-height: 42px;
                `;
        }
    }}

    ${({ theme, $shouldShowTransparentBackground, $shouldChangeColor }) => {
        if ($shouldShowTransparentBackground) {
            if (theme.colorMode === 'dark') {
                return css`
                    border-color: rgba(255, 255, 255, 0.5);
                    background-color: transparent;
                `;
            }

            return css`
                border-color: rgba(0, 0, 0, 0.5);
                background-color: transparent;
            `;
        }

        return css`
            border-color: rgba(160, 160, 160, 0.3);
            background-color: ${theme.colorMode === 'classic' || $shouldChangeColor
                ? theme['000']
                : theme['100']};
        `;
    }}

    ${({ $shouldShowBigImage }) =>
        $shouldShowBigImage &&
        css`
            height: 42px;
        `}

    ${({ $isOpen, $direction }) => {
        if ($isOpen) {
            return [
                DropdownDirection.BOTTOM,
                DropdownDirection.BOTTOM_LEFT,
                DropdownDirection.BOTTOM_RIGHT,
            ].includes($direction)
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
    padding: 4px 10px;
`;

type StyledComboBoxPrefixProps = {
    $prefixMinWidth?: number;
};

export const StyledComboBoxPrefix = styled.div<StyledComboBoxPrefixProps>`
    flex: 0 0 auto;
    min-width: ${({ $prefixMinWidth }) => $prefixMinWidth ?? 0}px;
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

type StyledComboBoxClearIconWrapperProps = { $isDisabled: boolean };

export const StyledComboBoxClearIconWrapper = styled.div<StyledComboBoxClearIconWrapperProps>`
    align-items: center;
    cursor: ${({ $isDisabled }) => (!$isDisabled ? 'pointer' : 'default')};
    display: flex;
    flex: 0 0 auto;
    height: 40px;
    justify-content: center;
    width: 40px;
`;

type StyledComboBoxIconWrapperProps = {
    $shouldShowBorderLeft: boolean;
    $isDisabled: boolean;
    $size: ComboBoxSize;
};

export const StyledComboBoxIconWrapper = styled.div<StyledComboBoxIconWrapperProps>`
    align-items: center;
    border-left: ${({ $shouldShowBorderLeft }) =>
        $shouldShowBorderLeft ? '1px solid rgba(160, 160, 160, 0.3)' : 'none'};
    cursor: ${({ $isDisabled }) => (!$isDisabled ? 'pointer' : 'default')};
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    width: 40px;

    ${({ $size }) => {
        switch ($size) {
            case ComboBoxSize.SMALL:
                return css`
                    height: 30px;
                `;
            case ComboBoxSize.NORMAL:
            default:
                return css`
                    height: 40px;
                `;
        }
    }}
`;

type StyledComboBoxBodyProps = WithTheme<{
    $shouldUseCurrentItemWidth: boolean;
    $browser: BrowserName;
    $maxHeight: number;
    $minWidth: number;
}>;

export const StyledComboBoxBody = styled.div<StyledComboBoxBodyProps>`
    display: flex;
    flex-direction: column;
    cursor: pointer;

    overflow-x: hidden;
    overflow-y: auto;

    max-height: ${({ $maxHeight }) => $maxHeight}px;

    // Styles for custom scrollbar
    ${({ $browser, theme }: StyledComboBoxBodyProps) =>
        $browser === 'firefox'
            ? css`
                  scrollbar-color: rgba(${theme['text-rgb']}, 0.15) transparent;
                  scrollbar-width: thin;
              `
            : css`
                  &::-webkit-scrollbar {
                      width: 10px;
                      height: 10px;
                  }

                  &::-webkit-scrollbar-track {
                      background-color: transparent;
                  }

                  &::-webkit-scrollbar-button {
                      background-color: transparent;
                      height: 5px;
                      width: 5px;
                  }

                  &::-webkit-scrollbar-thumb {
                      background-color: rgba(${theme['text-rgb']}, 0.15);
                      border-radius: 20px;
                      background-clip: padding-box;
                      border: solid 3px transparent;
                  }

                  &::-webkit-scrollbar-corner {
                      background-color: transparent;
                  }
              `}
`;

type StyledComboBoxTopicProps = WithTheme<unknown>;

export const StyledComboBoxTopic = styled.div`
    align-items: center;
    background-color: ${({ theme }: StyledComboBoxTopicProps) => theme['secondary-102']};
    color: rgba(${({ theme }: StyledComboBoxTopicProps) => theme['text-rgb']}, 0.65);
    cursor: default;
    display: flex;
    flex: 0 0 auto;
    font-weight: bold;
    min-height: 38px;
    line-height: normal;
    padding: 8px 10px;
    position: sticky;
    top: 0;
    z-index: 10;
`;
