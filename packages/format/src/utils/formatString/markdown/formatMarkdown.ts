import { marked, Tokens } from 'marked';
import type { TableObject } from '../../../types/format';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { stringify } from 'csv-stringify/browser/esm/sync';
import { escapeBBCodeSquareBrackets } from '../bb-code/formatBBCode';

const inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
const tokenizer = {
    // Codespan Tokenizer is overwritten to prevent html escaping, since html is already escaped.
    // The function is copied from marked.js and slightly modified: https://github.com/markedjs/marked/blob/42954aaba960b6f815b24ec0d39da464960e4ec9/src/Tokenizer.ts#L749
    codespan(src: string): Tokens.Codespan | undefined {
        const cap = inlineCode.exec(src);
        if (cap) {
            let text = (cap[2] as string).replace(/\n/g, ' ');
            const hasNonSpaceChars = /[^ ]/.test(text);
            const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
            if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
                text = text.substring(1, text.length - 1);
            }

            return {
                type: 'codespan',
                raw: cap[0],
                text,
            };
        }

        return undefined;
    },
    lheading(src: string): Tokens.Heading | undefined {
        return undefined;
    },
    url() {
        return undefined;
    },
};

const renderer = {
    // Code Renderer is overwritten to prevent html escaping, since html is already escaped.
    // The function is copied from marked.js and slightly modified: https://github.com/markedjs/marked/blob/42954aaba960b6f815b24ec0d39da464960e4ec9/src/Renderer.ts#L24
    code(text: string, lang: string): string {
        const langString = (lang || '').match(/^\S*/)?.[0];

        const code = `${text.replace(/\n$/, '')}`;

        if (!langString) {
            return `<pre><code>${code}</code></pre>\n`;
        }

        return `<pre><code class="language-${langString}">${code}</code></pre>\n`;
    },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
marked.use({ tokenizer, renderer });

// Parses markdown following the Github Flavored Markdown specification.
// The tokenizer and renderer are slightly modified to prevent html escaping in code block and inline code.
export const parseMarkdown = (text: string, parseBBCode: boolean) =>
    marked.parse(text, {
        walkTokens: (token) => {
            if (parseBBCode && (token.type === 'codespan' || token.type === 'code')) {
                // eslint-disable-next-line no-param-reassign
                (token as Tokens.Codespan).text = escapeBBCodeSquareBrackets(
                    (token as Tokens.Codespan).text,
                );
            }
        },
    }) as string;

// It is important that, &amp; is replaced lastly to prevent double escaping.
const unescapeHtml = (text: string) =>
    text.replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');

export const getMarkdownTables = (text: string): TableObject[] => {
    const tableTokens: Tokens.Table[] = [];

    marked.parse(text, {
        walkTokens: (token) => {
            if (token.type === 'table') {
                tableTokens.push(token as Tokens.Table);
            }
        },
    }) as string;

    const tables: TableObject[] = [];

    tableTokens.forEach((tableToken) => {
        const tableArray: string[][] = [];

        if (tableToken.header?.length > 0) {
            const rowArray: string[] = [];

            tableToken.header.forEach((header) => {
                rowArray.push(unescapeHtml(header.text));
            });

            tableArray.push(rowArray);
        }
        if (tableToken.rows?.length > 0) {
            tableToken.rows.forEach((row) => {
                const rowArray: string[] = [];

                row.forEach((cell) => {
                    rowArray.push(unescapeHtml(cell.text));
                });

                tableArray.push(rowArray);
            });
        }

        const csv = stringify(tableArray || []);

        tables.push({
            raw: unescapeHtml(tableToken.raw),
            csv,
        });
    });

    return tables;
};
