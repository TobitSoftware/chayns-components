import type { BrowserName, WithTheme } from '@chayns-components/core';
import styled, { css } from 'styled-components';
import { CodeHighlighterTheme } from './CodeHighlighter.types';

type StyledCodeHighlighterProps = WithTheme<{
    $codeTheme: CodeHighlighterTheme;
    $browser: BrowserName;
    $shouldWrapLines?: boolean;
}>;

export const StyledCodeHighlighter = styled.div<StyledCodeHighlighterProps>`
    margin: 4px 0;
    background-color: ${({ $codeTheme }) =>
        $codeTheme === CodeHighlighterTheme.Dark ? '#282c34' : '#fafafa'};
    border-radius: 8px;
    padding-bottom: 6px;

    pre {
        margin: 0 !important;
        overflow: auto;
        padding: 15px;
        line-height: 1.5;

        // Styles for custom scrollbar
        ${({ $browser, theme }: StyledCodeHighlighterProps) =>
            $browser === 'firefox'
                ? css`
                      scrollbar-color: rgba(${theme['text-rgb']}, 0.15) transparent;
                      scrollbar-width: thin;
                  `
                : css`
                      &::-webkit-scrollbar {
                          height: 5px;
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
                      }
                  `}

        code {
            white-space: ${({ $shouldWrapLines }) =>
                $shouldWrapLines ? 'pre-wrap' : 'pre'} !important;
        }
    }

    // Fixes display of tables in code highlighter for markdown.
    .language-markdown .token.table {
        display: inline;
    }
`;

type StyledCodeHighlighterHeaderProps = WithTheme<{
    $codeTheme: CodeHighlighterTheme;
}>;

export const StyledCodeHighlighterHeader = styled.div<StyledCodeHighlighterHeaderProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid
        ${({ $codeTheme }) => ($codeTheme === CodeHighlighterTheme.Dark ? '#e5e5e5' : '#999999')};
    padding: 4px 12px;
`;

type StyledCodeHighlighterFileNameProps = WithTheme<{
    $codeTheme: CodeHighlighterTheme;
}>;

export const StyledCodeHighlighterFileName = styled.span<StyledCodeHighlighterFileNameProps>`
    color: ${({ $codeTheme }) =>
        $codeTheme === CodeHighlighterTheme.Dark ? '#e5e5e5' : '#999999'};
`;
