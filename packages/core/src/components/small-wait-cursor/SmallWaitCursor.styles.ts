import styled, { keyframes } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledSmallWaitCursorProps = WithTheme<{
    $shouldShowWaitCursor: boolean;
}>;

export const StyledSmallWaitCursor = styled.div<StyledSmallWaitCursorProps>`
    position: relative;
    height: 30px;
    width: 30px;
    opacity: ${({ $shouldShowWaitCursor }) => ($shouldShowWaitCursor ? 1 : 0)};
`;

type StyledSmallWaitCursorBackgroundProps = WithTheme<unknown>;

export const StyledSmallWaitCursorBackground = styled.div<StyledSmallWaitCursorBackgroundProps>`
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

type StyledSmallWaitCursorWaitCursorProps = WithTheme<unknown>;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const StyledSmallWaitCursorWaitCursor = styled.div<StyledSmallWaitCursorWaitCursorProps>`
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 2;
    border-style: solid;
    border-width: 3px;
    border-color: ${({ theme }: StyledSmallWaitCursorWaitCursorProps) => theme.primary};
    height: ${30 - 10}px;
    width: ${30 - 10}px;
    border-radius: 50%;
    display: inline-block;
    border-top: 3px solid transparent;

    animation: ${spin} 1s linear infinite;
`;
