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
    isMobile: boolean;
    isOpen: boolean;
    minWidth: number;
    direction: ComboBoxDirection;
}>;

export const StyledComboBoxHeader = styled.div<StyledComboBoxHeaderProps>`
    display: flex;
    justify-content: space-between;
    border: 1px solid rgba(160, 160, 160, 0.3);
    padding: 4px 10px;
    cursor: pointer;
    background: ${({ theme }: StyledComboBoxHeaderProps) => theme['001']};
    min-width: ${({ minWidth }) => minWidth}px;
    max-width: ${({ minWidth }) => minWidth}px;

    ${({ isOpen, direction }) => {
        if (isOpen) {
            return direction === ComboBoxDirection.BOTTOM
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

    ${({ isMobile, theme }: StyledComboBoxHeaderProps) =>
        !isMobile &&
        css`
            &:hover {
                background-color: ${theme['secondary-101']};
            }
        `}
`;

type StyledComboBoxPlaceholderProps = WithTheme<unknown>;

export const StyledComboBoxPlaceholder = styled.div<StyledComboBoxPlaceholderProps>`
    align-items: center;
    color: ${({ theme }: StyledComboBoxPlaceholderProps) => theme.text};
    display: flex;
    gap: 8px;
`;

type StyledComboBoxPlaceholderImageProps = WithTheme<
    Pick<ComboBoxItemProps, 'shouldShowRoundImage'>
>;

export const StyledComboBoxPlaceholderImage = styled.img<StyledComboBoxPlaceholderImageProps>`
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledComboBoxPlaceholderImageProps) => theme['009-rgb']}, 0.08) inset;
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
    height: number;
    minWidth: number;
    maxHeight: CSSProperties['maxHeight'];
    direction: ComboBoxDirection;
}>;

export const StyledMotionComboBoxBody = styled(motion.div)<StyledComboBoxBodyProps>`
    background: ${({ theme }: StyledComboBoxBodyProps) => theme['001']};
    display: flex;
    position: absolute;
    z-index: 4;
    flex-direction: column;
    border: 1px solid rgba(160, 160, 160, 0.3);
    cursor: pointer;
    min-width: ${({ minWidth }) => minWidth}px;
    max-width: ${({ minWidth }) => minWidth}px;
    max-height: ${({ maxHeight }) => maxHeight};
    overflow-y: ${({ height }) => (height <= 300 ? 'hidden' : 'auto')};
    box-shadow: 0 0 0 1px rgba(${({ theme }: StyledComboBoxBodyProps) => theme['009-rgb']}, 0.08)
        inset;

    ${({ direction }) => {
        if (direction === ComboBoxDirection.BOTTOM) {
            return css`
                border-bottom-left-radius: 3px;
                border-bottom-right-radius: 3px;
                border-top: none;
            `;
        }

        return css`
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
            border-bottom: none;
        `;
    }}

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(160, 160, 160, 1);
    }
`;
