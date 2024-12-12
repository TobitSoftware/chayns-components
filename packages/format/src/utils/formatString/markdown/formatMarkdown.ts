import { marked, Tokens } from 'marked';
import type { TableObject } from '../../../types/format';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { stringify } from 'csv-stringify/browser/esm/sync';
import { escapeBBCodeSquareBrackets } from '../bb-code/formatBBCode';

const inlineCodeRule = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
const inlineTextRule = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<![`*_]|\b_|$)|[^ ](?= {2,}\n)))/;

const TABLE_ID_PREFIX = 'formatted-table-';

/*
   The marked Pipeline, including tokenizer, renderer and hooks are explained here:
   https://marked.js.org/using_pro
*/

const tokenizer = {
    // Codespan Tokenizer is overwritten to prevent html escaping, since html is already escaped.
    // The function is copied from marked.js and slightly modified: https://github.com/markedjs/marked/blob/42954aaba960b6f815b24ec0d39da464960e4ec9/src/Tokenizer.ts#L749
    codespan(src: string): Tokens.Codespan | undefined {
        const cap = inlineCodeRule.exec(src);
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
    // Disables Markdown formatting for setext headings.
    lheading(): Tokens.Heading | undefined {
        return undefined;
    },
    // Disables converting urls to hyperlinks.
    url() {
        return undefined;
    },
    // Disables converting text with 4 leading spaces to code block.
    code() {
        return undefined;
    },
    // inlineText is overwritten to prevent html escaping, specifically since quote characters are escaped, which breaks the attributes of bb-code elements.
    // The function is copied from marked.js and slightly modified: https://github.com/markedjs/marked/blob/42954aaba960b6f815b24ec0d39da464960e4ec9/src/Tokenizer.ts#L854
    inlineText(src: string) {
        const cap = inlineTextRule.exec(src);
        if (cap) {
            return {
                type: 'text',
                raw: cap[0],
                text: cap[0],
            };
        }
        return undefined;
    },
    // Disables escaping of characters via backslash. This is needed for LaTeX formulas, since multiline LaTeX formulas have 2 backslashes at the end of their lines.
    // Without this function, the backslashes would be escaped and the LaTeX formula would be broken.
    escape() {
        return undefined;
    },
    // Disables the conversion of backslash at the end of a line to a line break. This is needed for LaTeX formulas, since multiline LaTeX formulas have 2 backslashes at the end of their lines.
    // Without this '\\' would be converted to '\<br>' which breaks LaTeX formulas.
    br() {
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
    // Replaces the checkbox input elements with markdown checkboxes.
    // This is the easiest way to prevent the formatting of markdown checkboxes in lists.
    // This can modify the input string slightly, since the capitalization of the checkbox can be lost.
    // If a user types '- [X]' it will be replaced with '- [x]' => the capitalization is lost.
    checkbox({ checked }: Tokens.Checkbox) {
        return checked ? '[x]' : '[ ]';
    },
};

const postprocess = (html: string): string => {
    let tableIndex = 0;
    // Assigns ids to tables.
    const modifiedString = html.replace(/(<table>)/g, () => {
        const result = `<table id="${TABLE_ID_PREFIX}${tableIndex}">`;
        tableIndex++;
        return result;
    });

    return modifiedString;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
marked.use({ tokenizer, renderer, hooks: { postprocess } });

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

    tableTokens.forEach((tableToken, index) => {
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
            id: `${TABLE_ID_PREFIX}${index}`,
        });
    });

    return tables;
};
