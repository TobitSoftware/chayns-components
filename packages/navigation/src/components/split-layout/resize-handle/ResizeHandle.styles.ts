import { css, styled } from 'styled-components';
import { WithTheme } from '@chayns-components/core';
import { SplitLayoutDirection } from '../SplitLayout.types';

type StyledResizeHandleProps = WithTheme<{ $direction: SplitLayoutDirection; $size: number }>;

export const StyledResizeHandle = styled.div<StyledResizeHandleProps>`
    position: relative;
    flex-shrink: 0;
    width: ${({ $direction, $size }) =>
        $direction === SplitLayoutDirection.HORIZONTAL ? `${$size}px` : '100%'};
    height: ${({ $direction, $size }) =>
        $direction === SplitLayoutDirection.VERTICAL ? `${$size}px` : '100%'};
`;

type StyledResizeHandleLineProps = WithTheme<unknown>;

export const StyledResizeHandleLine = styled.div<StyledResizeHandleLineProps>`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme['002']};
    position: relative;
    z-index: 10;
`;

type StyledResizeHandleDragProps = WithTheme<{ $direction: SplitLayoutDirection }>;

export const StyledResizeHandleDrag = styled.div<StyledResizeHandleDragProps>`
    position: absolute;

    opacity: 0;
    z-index: 20;

    ${({ $direction }) =>
        $direction === SplitLayoutDirection.HORIZONTAL
            ? css`
                  cursor: col-resize;

                  transform: translateX(-50%);
                  top: 0;
                  left: 50%;

                  width: 20px;
                  height: 100%;
              `
            : css`
                  cursor: row-resize;
                  transform: translateY(-50%);

                  top: 50%;
                  left: 0;

                  width: 100%;
                  height: 20px;
              `}
`;
