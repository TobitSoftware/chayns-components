import { ColorMode } from 'chayns-api';
import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import { PopupAlignment } from '../Popup.types';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';
import { BrowserName } from '../../../types/chayns';

type StyledMotionPopupContentWrapperProps = WithTheme<{
    $position: PopupAlignment;
    $colorMode: ColorMode;
    $offset: number;
    $shouldScrollWithContent: boolean;
}>;

export const StyledMotionPopupContentWrapper = styled(
    motion.div,
)<StyledMotionPopupContentWrapperProps>`
    background-color: ${({ theme }: StyledMotionPopupContentWrapperProps) => theme['000']};
    border-radius: 3px;
    box-shadow: 1px 3px 8px rgb(0 0 0 / 30%);
    color: ${({ theme }: StyledMotionPopupContentWrapperProps) => theme.text};
    z-index: 100;
    position: ${({ $shouldScrollWithContent }) =>
        $shouldScrollWithContent ? 'absolute' : 'fixed'};
    pointer-events: all;

    &::after {
        background-color: inherit;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 2px 2px 8px rgb(4 3 4 / 10%);
        content: '';
        height: 14px;
        position: absolute;
        width: 14px;
        z-index: -2;

        ${({ $position, $offset }) => {
            switch ($position) {
                case PopupAlignment.TopLeft:
                    return css`
                        bottom: -7px;
                        right: ${13 + $offset}px;
                        transform: rotate(45deg);
                    `;
                case PopupAlignment.BottomLeft:
                    return css`
                        top: -7px;
                        right: ${13 + $offset}px;
                        transform: rotate(225deg);
                    `;
                case PopupAlignment.TopRight:
                    return css`
                        transform: rotate(45deg);
                        bottom: -7px;
                        left: ${13 + $offset}px;
                    `;
                case PopupAlignment.BottomRight:
                    return css`
                        transform: rotate(225deg);
                        top: -7px;
                        left: ${13 + $offset}px;
                    `;
                default:
                    return undefined;
            }
        }}
    }

    &::before {
        background-color: inherit;
        border-radius: 3px;
        bottom: 0;
        content: '';
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: -1;
    }
`;

type StyledPopupContentWrapperContentProps = WithTheme<{
    $browser: BrowserName;
    $maxHeight?: number;
}>;

export const StyledPopupContentWrapperContent = styled.div<StyledPopupContentWrapperContentProps>`
    height: 100%;
    width: 100%;

    ${({ $maxHeight }) =>
        $maxHeight &&
        css`
            max-height: ${$maxHeight}px;
            overflow-y: auto;
            overflow-x: hidden;
        `}

    ${({ $browser, theme }: StyledPopupContentWrapperContentProps) =>
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
