import type { CSSProperties } from 'react';
import styled from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';
import { FilterButtonItemShape, FilterButtonSize } from '../interface';

type StyledFilterButtonItemProps = WithTheme<{
    size: FilterButtonSize;
    shape: FilterButtonItemShape;
    color?: CSSProperties['color'];
    selected?: boolean;
}>;

export const StyledFilterButtonItem = styled.div<StyledFilterButtonItemProps>`
    position: relative;
    cursor: pointer;
    background-color: ${({ color, selected }: StyledFilterButtonItemProps) =>
        selected ? color : 'transparent'};
    border-style: solid;
    border-width: 1px;
    border-color: ${({ color, theme }: StyledFilterButtonItemProps) => color ?? theme.hedline};
    border-radius: ${({ shape }: StyledFilterButtonItemProps) =>
        shape === FilterButtonItemShape.Round ? 100 : 0}px;
    height: ${({ size }: StyledFilterButtonItemProps) =>
        size === FilterButtonSize.Small ? 22 : 30}px;
    width: 100%;
`;

export const StyledFilterButtonItemTextWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 3px 14px;
    position: absolute;
    z-index: 2;
`;

export const StyledFilterButtonItemText = styled.div`
    margin-left: 5px;
`;

type StyledFilterButtonItemBackgroundProps = WithTheme<{
    size: FilterButtonSize;
    shape: FilterButtonItemShape;
    color?: CSSProperties['color'];
}>;

export const StyledFilterButtonItemBackground = styled.div<StyledFilterButtonItemBackgroundProps>`
    height: ${({ size }: StyledFilterButtonItemProps) =>
        size === FilterButtonSize.Small ? 22 : 30}px;
    width: 100%;
    border-radius: ${({ shape }: StyledFilterButtonItemProps) =>
        shape === FilterButtonItemShape.Round ? 100 : 0}px;
    border-color: ${({ color, theme }: StyledFilterButtonItemProps) => color ?? theme.hedline};
    background-color: ${({ color, theme }: StyledFilterButtonItemProps) => color ?? theme.hedline};
    opacity: 0;

    &:hover {
        opacity: 0.5;
    }
`;
