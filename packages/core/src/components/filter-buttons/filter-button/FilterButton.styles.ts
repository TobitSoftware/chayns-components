import { motion } from 'motion/react';
import type { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import { FilterButtonItemShape, FilterButtonSize } from '../../../types/filterButtons';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledFilterButtonItemProps = WithTheme<{ $size: FilterButtonSize; $isSelected: boolean }>;

export const StyledFilterButtonItem = styled.div<StyledFilterButtonItemProps>`
    position: relative;
    line-height: 1;
    cursor: pointer;
    user-select: none;
    padding: ${({ $size }) => ($size === FilterButtonSize.Normal ? '8px 14px' : '4px 8px')};

    display: flex;
    align-items: center;

    &:hover > div:last-child {
        ${({ $isSelected }) =>
            !$isSelected &&
            css`
                opacity: 0.2;
            `}
    }
`;

export const StyledFilterButtonItemLabel = styled.div`
    display: flex;
    gap: 5px;
    align-items: baseline;
    position: relative;
    z-index: 1;
`;

type StyledFilterButtonItemLabelTextProps = WithTheme<unknown>;

export const StyledFilterButtonItemLabelText = styled.p<StyledFilterButtonItemLabelTextProps>`
    color: ${({ theme }: StyledFilterButtonItemLabelTextProps) => theme.text};
    margin: 0;
    line-height: 1;
`;

type StyledFilterButtonItemLabelCountProps = WithTheme<unknown>;

export const StyledFilterButtonItemLabelCount = styled.p<StyledFilterButtonItemLabelCountProps>`
    color: ${({ theme }: StyledFilterButtonItemLabelTextProps) => theme.text};
    margin: 0;
    line-height: 1;
    font-weight: bold;
`;

type StyledFilterButtonItemBorderProps = WithTheme<{
    $shape: FilterButtonItemShape;
    $color: CSSProperties['color'];
    $isSelected: boolean;
}>;

export const StyledFilterButtonItemBorder = styled.div<StyledFilterButtonItemBorderProps>`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0.4;
    z-index: 0;
    border-radius: ${({ $shape }) => ($shape === FilterButtonItemShape.Round ? 100 : 3)}px;

    ${({ $color, theme, $isSelected }: StyledFilterButtonItemBorderProps) =>
        !$isSelected &&
        css`
            border-width: 1px;
            border-style: solid;
            border-color: ${$color ?? theme.headline};
        `};
`;

type StyledFilterButtonItemBackgroundProps = WithTheme<{
    $shape: FilterButtonItemShape;
    $color: CSSProperties['color'];
    $isSelected: boolean;
}>;

export const StyledMotionFilterButtonItemBackground = styled(
    motion.div,
)<StyledFilterButtonItemBackgroundProps>`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 0;
    opacity: ${({ $isSelected }) => ($isSelected ? 0.4 : 0)};
    transition: opacity 0.5s ease;
    border-radius: ${({ $shape }) => ($shape === FilterButtonItemShape.Round ? 100 : 3)}px;
    background-color: ${({ $color, theme }: StyledFilterButtonItemBackgroundProps) =>
        $color ?? theme.headline};
`;
