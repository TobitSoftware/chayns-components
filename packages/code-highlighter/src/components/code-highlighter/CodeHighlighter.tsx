import { BrowserName } from '@chayns-components/core';
import { useDevice } from 'chayns-api';
import { format } from 'prettier/standalone';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
    CodeHighlighterLanguage,
    CodeHighlighterTheme,
    HighlightedLines,
} from '../../types/codeHighlighter';
import { formatLanguage, getParserForLanguage } from '../../utils/codeHighlighter';
import {
    StyledCodeHighlighter,
    StyledCodeHighlighterFileName,
    StyledCodeHighlighterHeader,
} from './CodeHighlighter.styles';
import CopyToClipboard from './copy-to-clipboard/CopyToClipboard';

export type CodeHighlighterProps = {
    /**
     * The code that should be displayed.
     */
    code: string;
    /**
     * The text that should be displayed after the copy button.
     * If not set, just the button is displayed without text.
     */
    copyButtonText?: string;
    /**
     * The lines of code that should be highlighted.
     * Following lines can be highlighted: added, removed and just marked.
     */
    highlightedLines?: HighlightedLines;
    /**
     * The language of the displayed code.
     */
    language: CodeHighlighterLanguage;
    /**
     * Function to be executed when the formatting of the code fails.
     */
    onFormatError?: (error: unknown) => void;
    /**
     * Whether the code should be formatted with prettier.
     */
    shouldFormatCode?: boolean;
    /**
     * Whether the line numbers should be displayed.
     */
    shouldShowLineNumbers?: boolean;
    /**
     * Whether long lines should be wrapped.
     */
    shouldWrapLines?: boolean;
    /**
     * The theme of the code block. Decide between dark and light.
     */
    theme?: CodeHighlighterTheme;
};

const CodeHighlighter: FC<CodeHighlighterProps> = ({
    theme = CodeHighlighterTheme.Dark,
    code,
    copyButtonText,
    language,
    highlightedLines,
    shouldFormatCode = false,
    onFormatError,
    shouldShowLineNumbers = false,
    shouldWrapLines,
}) => {
    const [width, setWidth] = useState(0);

    const ref = useRef<HTMLDivElement>(null);

    const { browser } = useDevice();

    useEffect(() => {
        if (ref.current) {
            const { children } = ref.current;

            const preElement = Array.from(children).find(
                ({ tagName }) => tagName.toLowerCase() === 'pre',
            );

            if (preElement) {
                setWidth(preElement.scrollWidth);
            }
        }
    }, []);

    // function to style highlighted code
    const lineWrapper = useCallback(
        (lineNumber: number) => {
            let style = {
                backgroundColor: 'none',
                display: 'block',
                borderRadius: '2px',
                width: width - 15,
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
        [highlightedLines, width],
    );

    const formattedCode = useMemo(() => {
        if (language) {
            void getParserForLanguage(language).then((config) => {
                if (shouldFormatCode && config) {
                    try {
                        return format(code, config) as unknown as string;
                    } catch (error) {
                        if (typeof onFormatError !== 'undefined') onFormatError(error);
                    }
                }

                return code;
            });
        }

        return code;
    }, [code, language, shouldFormatCode, onFormatError]);

    useEffect(() => {
        const elements = document.getElementsByClassName('linenumber');

        Array.from(elements).forEach((element) => {
            const wrapper = document.createElement('twIgnore');

            while (element.firstChild) {
                wrapper.appendChild(element.firstChild);
            }

            element.appendChild(wrapper);
        });
    }, []);

    return useMemo(
        () => (
            <StyledCodeHighlighter
                $browser={browser?.name as BrowserName}
                $shouldWrapLines={shouldWrapLines}
                $codeTheme={theme}
                ref={ref}
            >
                <StyledCodeHighlighterHeader $codeTheme={theme}>
                    <StyledCodeHighlighterFileName $codeTheme={theme}>
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        <twIgnore>{formatLanguage(language)}</twIgnore>
                    </StyledCodeHighlighterFileName>
                    <CopyToClipboard text={code} theme={theme} copyButtonText={copyButtonText} />
                </StyledCodeHighlighterHeader>
                <SyntaxHighlighter
                    language={language ?? ''}
                    showLineNumbers={shouldShowLineNumbers}
                    style={theme === CodeHighlighterTheme.Dark ? oneDark : oneLight}
                    wrapLines
                    wrapLongLines={shouldWrapLines}
                    lineProps={lineWrapper}
                >
                    {formattedCode}
                </SyntaxHighlighter>
            </StyledCodeHighlighter>
        ),
        [
            browser?.name,
            theme,
            language,
            code,
            copyButtonText,
            shouldShowLineNumbers,
            shouldWrapLines,
            lineWrapper,
            formattedCode,
        ],
    );
};

CodeHighlighter.displayName = 'CodeHighlighter';

export default CodeHighlighter;
