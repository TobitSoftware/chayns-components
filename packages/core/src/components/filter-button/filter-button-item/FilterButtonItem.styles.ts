import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';
import { FilterButtonItemShape, FilterButtonSize } from '../interface';

type StyledFilterButtonItemProps = WithTheme<{ size: FilterButtonSize; isSelected: boolean }>;

export const StyledFilterButtonItem = styled.div<StyledFilterButtonItemProps>`
    position: relative;
    font-size: ${({ size }) => (size === FilterButtonSize.Normal ? 15 : 12)}px;
    cursor: pointer;
    user-select: none;
    padding: 3px 14px;

    &:hover > div:last-child {
        ${({ isSelected }) =>
            !isSelected &&
            css`
                opacity: 0.2;
            `}
    }
`;

export const StyledFilterButtonItemLabel = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
`;

type StyledFilterButtonItemLabelTextProps = WithTheme<unknown>;

export const StyledFilterButtonItemLabelText = styled.p<StyledFilterButtonItemLabelTextProps>`
    color: ${({ theme }: StyledFilterButtonItemLabelTextProps) => theme.text};
    margin-top: 2px;
`;

type StyledFilterButtonItemBorderProps = WithTheme<{
    shape: FilterButtonItemShape;
    color: CSSProperties['color'];
    isSelected: boolean;
}>;

export const StyledFilterButtonItemBorder = styled.div<StyledFilterButtonItemBorderProps>`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0.4;
    z-index: -1;
    border-radius: ${({ shape }) => (shape === FilterButtonItemShape.Round ? 100 : 0)}px;
    ${({ color, theme, isSelected }: StyledFilterButtonItemBorderProps) =>
        !isSelected &&
        css`
            border-width: 1px;
            border-style: solid;
            border-color: ${color ?? theme.headline};
        `};
`;

type StyledFilterButtonItemBackgroundProps = WithTheme<{
    shape: FilterButtonItemShape;
    color: CSSProperties['color'];
    isSelected: boolean;
}>;

export const StyledMotionFilterButtonItemBackground = styled(
    motion.div
)<StyledFilterButtonItemBackgroundProps>`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    opacity: ${({ isSelected }) => (isSelected ? 0.4 : 0)};
    transition: opacity 0.5s ease;
    border-radius: ${({ shape }) => (shape === FilterButtonItemShape.Round ? 100 : 0)}px;
    background-color: ${({ color, theme }: StyledFilterButtonItemBackgroundProps) =>
        color ?? theme.headline};
`;
