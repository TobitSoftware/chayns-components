import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import { ContextMenuAlignment } from '../../../types/contextMenu';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledMotionContextMenuContentProps = WithTheme<{
    $position: ContextMenuAlignment;
    $zIndex: number;
    $shouldHidePopupArrow: boolean;
}>;

export const StyledMotionContextMenuContent = styled(
    motion.div,
)<StyledMotionContextMenuContentProps>`
    background-color: ${({ theme }: StyledMotionContextMenuContentProps) => theme['001']};
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: ${({ $shouldHidePopupArrow }) => ($shouldHidePopupArrow ? '6px' : '3px')};
    box-shadow: 1px 3px 8px rgb(0 0 0 / 30%);
    color: ${({ theme }: StyledMotionContextMenuContentProps) => theme.text};
    pointer-events: all;
    position: absolute;
    z-index: ${({ $zIndex }) => $zIndex};

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

        ${({ $shouldHidePopupArrow }) =>
            $shouldHidePopupArrow &&
            css`
                display: none;
            `}

        ${({ $position }) => {
            switch ($position) {
                case ContextMenuAlignment.TopLeft:
                    return css`
                        bottom: -7px;
                        right: 7px;
                        transform: rotate(45deg);
                    `;
                case ContextMenuAlignment.BottomLeft:
                    return css`
                        top: -7px;
                        right: 7px;
                        transform: rotate(225deg);
                    `;
                case ContextMenuAlignment.TopRight:
                    return css`
                        transform: rotate(45deg);
                        bottom: -7px;
                        left: 7px;
                    `;
                case ContextMenuAlignment.BottomRight:
                    return css`
                        transform: rotate(225deg);
                        top: -7px;
                        left: 7px;
                    `;
                case ContextMenuAlignment.TopCenter:
                    return css`
                        bottom: -7px;
                        right: 45%;
                        transform: rotate(45deg);
                    `;
                case ContextMenuAlignment.BottomCenter:
                    return css`
                        transform: rotate(225deg);
                        top: -7px;
                        left: 45%;
                    `;

                default:
                    return undefined;
            }
        }}
    }

    &::before {
        background-color: inherit;
        bottom: 0;
        content: '';
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        border-radius: ${({ $shouldHidePopupArrow }) => ($shouldHidePopupArrow ? '6px' : '3px')};
        z-index: -1;
    }
`;

type StyledContextMenuContentItemProps = WithTheme<{
    $shouldHidePopupArrow: boolean;
}>;

export const StyledContextMenuContentItem = styled.div<StyledContextMenuContentItemProps>`
    cursor: pointer;
    display: flex;
    padding: 5px 8px 5px 5px;
    transition: background-color 0.3s ease;
    border-radius: ${({ $shouldHidePopupArrow }) => ($shouldHidePopupArrow ? '3px' : 0)};
    margin: ${({ $shouldHidePopupArrow }) => ($shouldHidePopupArrow ? '3px' : 0)};

    &:hover {
        background-color: ${({ theme }: StyledContextMenuContentItemProps) =>
            theme['secondary-103']};
    }
`;

export const StyledContextMenuContentItemIconWrapper = styled.div`
    flex: 0 0 auto;
    margin: 0 8px 0 3px;
    width: 20px;
`;

type StyledContextMenuContentItemBorderProps = WithTheme<unknown>;

export const StyledContextMenuContentItemBorder = styled.div<StyledContextMenuContentItemBorderProps>`
    width: 100%;
    border-top: ${({ theme }: StyledContextMenuContentItemBorderProps) =>
        `1px solid rgba(${theme['text-rgb'] ?? '34, 34, 34'}, 0.2)`};
`;

export const StyledContextMenuContentHeadline = styled.div`
    width: 100%;
    margin: 3px 6px;
    opacity: 50%;
    font-weight: bold;
`;

export const StyledContextMenuContentItemText = styled.div`
    flex: 0 0 auto;
    white-space: nowrap;
`;
