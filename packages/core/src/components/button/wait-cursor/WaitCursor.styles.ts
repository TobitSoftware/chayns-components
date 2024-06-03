import styled, { keyframes } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledWaitCursorProps = WithTheme<{
    $shouldShowWaitCursor: boolean;
}>;

export const StyledWaitCursor = styled.div<StyledWaitCursorProps>`
    position: relative;
    height: 26px;
    width: 26px;
    opacity: ${({ $shouldShowWaitCursor }) => ($shouldShowWaitCursor ? 1 : 0)};
`;

type StyledWaitCursorBackgroundProps = WithTheme<unknown>;

export const StyledWaitCursorBackground = styled.div<StyledWaitCursorBackgroundProps>`
    background-color: white;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
    box-shadow:
        0 4px 12px 0 rgba(0, 0, 0, 0.2),
        0 1px 1px rgba(0, 0, 0, 0.2);
`;

type StyledWaitCursorWaitCursorProps = WithTheme<{ $color: string }>;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const StyledWaitCursorWaitCursor = styled.div<StyledWaitCursorWaitCursorProps>`
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 2;
    border-style: solid;
    border-width: 3px;
    border-color: ${({ $color }) => $color};
    height: ${26 - 10}px;
    width: ${26 - 10}px;
    border-radius: 50%;
    display: inline-block;
    border-top: 3px solid transparent;

    animation: ${spin} 1s linear infinite;
`;
