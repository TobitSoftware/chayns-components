import { format } from 'prettier/standalone';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useColorScheme } from '@chayns-components/core';
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

type AddScrollbarClassOptions = {
    root: HTMLDivElement | null;
    className: string;
};

const addScrollbarClassToPre = ({ root, className }: AddScrollbarClassOptions) => {
    if (!root) return;

    const preElement = root.querySelector('pre');
    if (!preElement) return;

    preElement.classList.add(className);
};

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
    theme,
    code,
    copyButtonText,
    language,
    highlightedLines,
    shouldFormatCode = false,
    onFormatError,
    shouldShowLineNumbers = false,
    shouldWrapLines,
}) => {
    const colorScheme = useColorScheme();

    const [width, setWidth] = useState(0);
    const [formattedCode, setFormattedCode] = useState(code);

    const ref = useRef<HTMLDivElement>(null);

    const resolvedTheme =
        theme ??
        (colorScheme?.theme.colorMode === 'dark'
            ? CodeHighlighterTheme.Dark
            : CodeHighlighterTheme.Light);

    useEffect(() => {
        addScrollbarClassToPre({ root: ref.current, className: 'chayns-scrollbar' });
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (ref.current) {
                const { children } = ref.current;

                const preElement = Array.from(children).find(
                    ({ tagName }) => tagName.toLowerCase() === 'pre',
                );

                if (preElement) {
                    setWidth(preElement.scrollWidth);
                }
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
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

    const lineNumberStyle = useMemo(
        () => ({
            WebkitUserSelect: 'none' as const,
        }),
        [],
    );

    const syntaxHighlighterStyle = useMemo(
        () => ({
            padding: '0 15px 15px',
        }),
        [],
    );

    useEffect(() => {
        let isCurrent = true;

        if (!shouldFormatCode) {
            setFormattedCode(code);

            return () => {
                isCurrent = false;
            };
        }

        void getParserForLanguage(language).then((config) => {
            if (!config || !isCurrent) {
                return;
            }

            try {
                setFormattedCode(format(code, config) as unknown as string);
            } catch (error) {
                onFormatError?.(error);
                setFormattedCode(code);
            }
        });

        return () => {
            isCurrent = false;
        };
    }, [code, language, onFormatError, shouldFormatCode]);

    useEffect(() => {
        const elements = document.getElementsByClassName('linenumber');

        Array.from(elements).forEach((element) => {
            const wrapper = document.createElement('tw-ignore');

            while (element.firstChild) {
                wrapper.appendChild(element.firstChild);
            }

            element.appendChild(wrapper);
        });
    }, []);

    return useMemo(
        () => (
            <StyledCodeHighlighter
                $shouldWrapLines={shouldWrapLines}
                $codeTheme={resolvedTheme}
                ref={ref}
            >
                <StyledCodeHighlighterHeader $codeTheme={resolvedTheme}>
                    <StyledCodeHighlighterFileName $codeTheme={resolvedTheme}>
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        <tw-ignore>{formatLanguage(language)}</tw-ignore>
                    </StyledCodeHighlighterFileName>
                </StyledCodeHighlighterHeader>
                <CopyToClipboard
                    text={code}
                    theme={resolvedTheme}
                    copyButtonText={copyButtonText}
                />
                <SyntaxHighlighter
                    customStyle={syntaxHighlighterStyle}
                    language={language ?? ''}
                    lineNumberStyle={lineNumberStyle}
                    showLineNumbers={shouldShowLineNumbers}
                    style={resolvedTheme === CodeHighlighterTheme.Dark ? oneDark : oneLight}
                    wrapLines
                    wrapLongLines={shouldWrapLines}
                    lineProps={lineWrapper}
                >
                    {formattedCode}
                </SyntaxHighlighter>
            </StyledCodeHighlighter>
        ),
        [
            shouldWrapLines,
            resolvedTheme,
            language,
            code,
            copyButtonText,
            lineNumberStyle,
            syntaxHighlighterStyle,
            shouldShowLineNumbers,
            lineWrapper,
            formattedCode,
        ],
    );
};

CodeHighlighter.displayName = 'CodeHighlighter';

export default CodeHighlighter;
