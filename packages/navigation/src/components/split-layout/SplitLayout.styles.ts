import styled, { css } from 'styled-components';
import { SplitLayoutDirection } from './SplitLayout.types';
import { WithTheme } from '@chayns-components/core';

type StyledSplitLayoutProps = WithTheme<{ $direction: SplitLayoutDirection }>;

export const StyledSplitLayout = styled.div<StyledSplitLayoutProps>`
    display: flex;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    overflow: hidden;

    ${({ $direction }) =>
        $direction === SplitLayoutDirection.HORIZONTAL
            ? css`
                  flex-direction: row;
              `
            : css`
                  flex-direction: column;
              `}
`;

type StyledSplitLayoutPaneProps = WithTheme<{
    $direction: SplitLayoutDirection;
    $size?: number;
    $defaultSize?: number;
}>;

export const StyledSplitLayoutPane = styled.div<StyledSplitLayoutPaneProps>`
    position: relative;
    flex: 0 0 auto;
    overflow: hidden;

    ${({ $direction, $size, $defaultSize }) =>
        $direction === SplitLayoutDirection.HORIZONTAL
            ? css`
                  min-width: 0;
                  height: 100%;
                  width: ${$size ?? $defaultSize ?? 0}px;
              `
            : css`
                  min-height: 0;
                  width: 100%;
                  height: ${$size ?? $defaultSize ?? 0}px;
              `}
`;
