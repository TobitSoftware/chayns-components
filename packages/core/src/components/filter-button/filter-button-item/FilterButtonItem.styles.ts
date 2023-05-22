import type { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';
import { FilterButtonItemShape, FilterButtonSize } from '../interface';

// ToDo redo all

type StyledFilterButtonItemProps = WithTheme<{
    shape: FilterButtonItemShape;
    color?: CSSProperties['color'];
    selected?: boolean;
    size: FilterButtonSize;
}>;

export const StyledFilterButtonItem = styled.div<StyledFilterButtonItemProps>`
    border-style: solid;
    border-width: 1px;
    padding: 3px 14px;
    cursor: pointer;
    user-select: none;

    height: ${({ size }: StyledFilterButtonItemProps) =>
        size === FilterButtonSize.Small ? 22 : 30}px;

    border-color: ${({ color, theme }: StyledFilterButtonItemProps) => color ?? theme.hedline};

    border-radius: ${({ shape }: StyledFilterButtonItemProps) =>
        shape === FilterButtonItemShape.Round ? 100 : 0}px;

    // Background color
    ${({ color, selected, theme }: StyledFilterButtonItemProps) =>
        selected &&
        css`
            background-color: ${() => color ?? theme.headline};
        `};
`;

type StyledFilterButtonItemTextWrapperProps = WithTheme<{
    size: FilterButtonSize;
}>;

export const StyledFilterButtonItemTextWrapper = styled.div<StyledFilterButtonItemTextWrapperProps>`
    display: flex;
    align-items: center;
    gap: ${({ size }: StyledFilterButtonItemTextWrapperProps) =>
        size === FilterButtonSize.Normal ? 5 : 1}px;
`;

type StyledFilterButtonItemTextProps = WithTheme<{
    size: FilterButtonSize;
}>;

export const StyledFilterButtonItemText = styled.div<StyledFilterButtonItemTextProps>`
    scale: ${({ size }: StyledFilterButtonItemTextProps) =>
        size === FilterButtonSize.Normal ? 1 : 0.7};
`;

type StyledFilterButtonItemBackgroundProps = WithTheme<{
    shape: FilterButtonItemShape;
    color?: CSSProperties['color'];
}>;

export const StyledFilterButtonItemBackground = styled.div<StyledFilterButtonItemBackgroundProps>`
    z-index: 1;
    opacity: 0;
    width: 100%;

    border-radius: ${({ shape }: StyledFilterButtonItemProps) =>
        shape === FilterButtonItemShape.Round ? 100 : 0}px;

    background-color: ${({ color, theme }: StyledFilterButtonItemProps) => color ?? theme.hedline};

    &:hover {
        opacity: 0.5;
    }
`;

// type StyledFilterButtonItemProps = WithTheme<{
//     size: FilterButtonSize;
//     shape: FilterButtonItemShape;
//     color?: CSSProperties['color'];
//     selected?: boolean;
// }>;
//
// export const StyledFilterButtonItem = styled.div<StyledFilterButtonItemProps>`
//     position: relative;
//     cursor: pointer;
//     border-style: solid;
//     border-width: 1px;
//     width: 100%;
//
//     border-color: ${({ color, theme }: StyledFilterButtonItemProps) => color ?? theme.hedline};
//
//     border-radius: ${({ shape }: StyledFilterButtonItemProps) =>
//         shape === FilterButtonItemShape.Round ? 100 : 0}px;
//
//     height: ${({ size }: StyledFilterButtonItemProps) =>
//         size === FilterButtonSize.Small ? 22 : 30}px;
//
//     // Background color
//     ${({ color, selected, theme }: StyledFilterButtonItemProps) =>
//         selected &&
//         css`
//             background-color: ${() => color ?? theme.headline};
//         `};
// `;
//
// type StyledFilterButtonItemTextWrapperProps = WithTheme<{ size: FilterButtonSize }>;
//
// export const StyledFilterButtonItemTextWrapper = styled.div<StyledFilterButtonItemTextWrapperProps>`
//     display: flex;
//     align-items: center;
//     position: absolute;
//     padding: ${({ size }: StyledFilterButtonItemTextWrapperProps) =>
//         size === FilterButtonSize.Normal ? '3px 14px' : '0 10px'};
//     z-index: 2;
// `;
//
// type StyledFilterButtonItemTextProps = WithTheme<{ size: FilterButtonSize }>;
//
// export const StyledFilterButtonItemText = styled.div<StyledFilterButtonItemTextProps>`
//     line-height: ${({ size }: StyledFilterButtonItemTextProps) =>
//         size === FilterButtonSize.Normal ? 18 : 14}px;
//     margin-left: 5px;
// `;
//
// type StyledFilterButtonItemBackgroundProps = WithTheme<{
//     size: FilterButtonSize;
//     shape: FilterButtonItemShape;
//     color?: CSSProperties['color'];
// }>;
//
// export const StyledFilterButtonItemBackground = styled.div<StyledFilterButtonItemBackgroundProps>`
//     z-index: 1;
//     opacity: 0;
//     width: 100%;
//
//     height: ${({ size }: StyledFilterButtonItemProps) =>
//         size === FilterButtonSize.Small ? 22 : 30}px;
//
//     border-radius: ${({ shape }: StyledFilterButtonItemProps) =>
//         shape === FilterButtonItemShape.Round ? 100 : 0}px;
//
//     background-color: ${({ color, theme }: StyledFilterButtonItemProps) => color ?? theme.hedline};
//
//     &:hover {
//         opacity: 0.5;
//     }
// `;
