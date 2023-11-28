import React, { FC, useCallback, useMemo } from 'react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeHighlighterTheme, HighlightedLines } from '../types/codeHighlighter';
import {
    StyledCodeHighlighter,
    StyledCodeHighlighterFileName,
    StyledCodeHighlighterHeader,
} from './CodeHighlighter.styles';
import CopyToClipboard from './copy-to-clipboard/CopyToClipboard';

export type CodeHighlighterProps = {
    theme?: CodeHighlighterTheme;
    language: string;
    code: string;
    highlightedLines?: HighlightedLines;
    shouldShowLines?: boolean;
};

const CodeHighlighter: FC<CodeHighlighterProps> = ({
    theme = CodeHighlighterTheme.Dark,
    code,
    language,
    highlightedLines,
    shouldShowLines = false,
}) => {
    const lineWrapper = useCallback(
        (lineNumber: number) => {
            let style = {
                backgroundColor: 'none',
                display: 'block',
                borderRadius: '2px',
            };

            if (highlightedLines?.added && highlightedLines.added.includes(lineNumber)) {
                style = { ...style, backgroundColor: '#2EF29930' };
            } else if (highlightedLines?.removed && highlightedLines.removed.includes(lineNumber)) {
                style = { ...style, backgroundColor: '#F22E5B30' };
            } else if (highlightedLines?.marked && highlightedLines.marked.includes(lineNumber)) {
                style = { ...style, backgroundColor: '#cccccc40' };
            }

            return { style };
        },
        [highlightedLines],
    );

    return useMemo(
        () => (
            <StyledCodeHighlighter codeTheme={theme}>
                <StyledCodeHighlighterHeader codeTheme={theme}>
                    <StyledCodeHighlighterFileName codeTheme={theme}>
                        {language}
                    </StyledCodeHighlighterFileName>
                    <CopyToClipboard text={code} theme={theme} />
                </StyledCodeHighlighterHeader>
                <SyntaxHighlighter
                    language={language}
                    showLineNumbers={shouldShowLines}
                    style={theme === CodeHighlighterTheme.Dark ? oneDark : oneLight}
                    wrapLines
                    lineProps={lineWrapper}
                >
                    {code}
                </SyntaxHighlighter>
            </StyledCodeHighlighter>
        ),
        [theme, language, code, shouldShowLines, lineWrapper],
    );
};

CodeHighlighter.displayName = 'CodeHighlighter';

export default CodeHighlighter;
