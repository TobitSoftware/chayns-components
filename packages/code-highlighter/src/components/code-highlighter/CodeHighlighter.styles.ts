import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';
import { CodeHighlighterTheme } from '../../types/codeHighlighter';

type StyledCodeHighlighterProps = WithTheme<{
    $codeTheme: CodeHighlighterTheme;
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
