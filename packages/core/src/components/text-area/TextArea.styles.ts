import type { Browser } from 'detect-browser';
import type { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledTextAreaProps = WithTheme<{ $isDisabled?: boolean }>;

export const StyledTextArea = styled.div<StyledTextAreaProps>`
    display: flex;
    flex: 1 1 auto;
    min-width: 0;
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    position: relative;
`;

type StyledTextAreaContentWrapperProps = WithTheme<{ $shouldChangeColor: boolean }>;

export const StyledTextAreaContentWrapper = styled.div<StyledTextAreaContentWrapperProps>`
    background-color: ${({ theme, $shouldChangeColor }: StyledTextAreaContentWrapperProps) =>
        theme.colorMode === 'classic' || $shouldChangeColor ? theme['000'] : theme['100']};
    border-radius: 3px;
    border: 1px solid rgba(160, 160, 160, 0.3);
    width: 100%;
    display: flex;
`;

export const StyledTextAreaContent = styled.div`
    display: flex;
    width: 100%;
`;

type StyledTextAreaInputProps = WithTheme<{
    $maxHeight: CSSProperties['maxHeight'];
    $minHeight: CSSProperties['minHeight'];
    $isOverflowing: boolean;
    $browser: Browser | 'bot' | null | undefined;
}>;

export const StyledTextAreaInput = styled.textarea<StyledTextAreaInputProps>`
    color: ${({ theme }: StyledTextAreaInputProps) => theme.text};
    border: none;
    resize: none;
    overflow-y: ${({ $isOverflowing }) => ($isOverflowing ? 'scroll' : 'hidden')};
    max-height: ${({ $maxHeight }: StyledTextAreaInputProps) =>
        typeof $maxHeight === 'number' ? `${$maxHeight}px` : $maxHeight};
    min-height: ${({ $minHeight }: StyledTextAreaInputProps) =>
        typeof $minHeight === 'number' ? `${$minHeight}px` : $minHeight};
    width: 100%;
    padding: 8px 10px;
    cursor: text;

    // Styles for custom scrollbar
    ${({ $browser, theme }: StyledTextAreaInputProps) =>
        $browser === 'firefox'
            ? css`
                  scrollbar-color: rgba(${theme['text-rgb']}, 0.15) transparent;
                  scrollbar-width: thin;
              `
            : css`
                  &::-webkit-scrollbar {
                      width: 10px;
                  }

                  &::-webkit-scrollbar-track {
                      background-color: transparent;
                  }

                  &::-webkit-scrollbar-button {
                      background-color: transparent;
                      height: 5px;
                  }

                  &::-webkit-scrollbar-thumb {
                      background-color: rgba(${theme['text-rgb']}, 0.15);
                      border-radius: 20px;
                      background-clip: padding-box;
                      border: solid 3px transparent;
                  }
              `}
`;

export const StyledTextAreaLabelWrapper = styled.label`
    left: 10px;
    top: 12px;
    align-items: baseline;
    display: flex;
    flex: 0 0 auto;
    gap: 4px;
    line-height: 1.3;
    pointer-events: none;
    position: absolute;
    user-select: none;
    width: calc(100% - 20px);
    cursor: text;
`;

type StyledTextAreaLabelProps = WithTheme<unknown>;

export const StyledTextAreaLabel = styled.label<StyledTextAreaLabelProps>`
    color: rgba(${({ theme }: StyledTextAreaLabelProps) => theme['text-rgb']}, 0.45);
    line-height: 1.3;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    cursor: text;
    text-overflow: ellipsis;
    color: ${({ theme }: StyledTextAreaLabelProps) => theme['006']};
`;
