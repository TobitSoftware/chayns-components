// eslint-disable-next-line import/extensions,import/no-unresolved
import { stringify } from 'csv-stringify/browser/esm/sync';
import { marked, RendererObject, TokenizerObject, Tokens } from 'marked';
import type { TableObject } from '../../../types/format';
import { escapeBBCodeSquareBrackets } from '../bb-code/formatBBCode';

const inlineCodeRule = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
const inlineTextRule = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<![`*_]|\b_|$)|[^ ](?= {2,}\n)))/;

const TABLE_ID_PREFIX = 'formatted-table-';

/*
   The marked Pipeline, including tokenizer, renderer and hooks, are explained here:
   https://marked.js.org/using_pro
*/

const tokenizer: TokenizerObject = {
    // Codespan Tokenizer is overwritten to prevent HTML escaping, since HTML has been already
    // escaped. The function is copied from marked.js and slightly modified:
    // https://github.com/markedjs/marked/blob/42954aaba960b6f815b24ec0d39da464960e4ec9/src/Tokenizer.ts#L749
    codespan(src: string): Tokens.Codespan | undefined {
        const cap = inlineCodeRule.exec(src);

        if (cap) {
            let text = (cap[2] as string).replace(/\n/g, ' ');

            const hasNonSpaceChars = /[^ ]/.test(text);
            const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);

            if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
                text = text.substring(1, text.length - 1);
            }

            return { raw: cap[0], text, type: 'codespan' };
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
    // Disables converting text with 4 leading spaces to the code block.
    code() {
        return undefined;
    },
    // inlineText is overwritten to prevent HTML escaping, specifically since quote characters are
    // escaped, which breaks the attributes of bb-code elements. The function is copied from
    // marked.js and slightly modified:
    // https://github.com/markedjs/marked/blob/42954aaba960b6f815b24ec0d39da464960e4ec9/src/Tokenizer.ts#L854
    inlineText(src: string) {
        const cap = inlineTextRule.exec(src);

        if (cap) {
            return { raw: cap[0], text: cap[0], type: 'text' };
        }

        return undefined;
    },
    // Disables escaping of characters via backslash. This is needed for LaTeX formulas, since
    // multiline LaTeX formulas have 2 backslashes at the end of their lines. Without this function,
    // the backslashes would be escaped and the LaTeX formula would be broken.
    escape() {
        return undefined;
    },
    // Disables the conversion of backslash at the end of a line to a line break. This is needed for
    // LaTeX formulas, since multiline LaTeX formulas have 2 backslashes at the end of their lines.
    // Without this '\\' would be converted to '\<br>' which breaks LaTeX formulas.
    br() {
        return undefined;
    },
    // Only recognizes ordered lists that start with the number 1. Also recognizes ordered lists
    // that contain a list item with the number 1, so those lists are
    list(src: string) {
        // The regex is copied from marked.js: https://github.com/markedjs/marked/blob/4fc639e053a605b25abf66dccaa70c1bf6562eb7/src/rules.ts#L115
        if (/^( {0,3}[*+-]|1[.)])/.test(src)) {
            return false;
        }

        // Prevents the text from being recognized as a list.
        return undefined;
    },
};

const renderer: RendererObject = {
    // Code Renderer is overwritten to prevent HTML escaping, since HTML has been already escaped.
    // The function is copied from marked.js and slightly modified: https://github.com/markedjs/marked/blob/42954aaba960b6f815b24ec0d39da464960e4ec9/src/Renderer.ts#L24
    code({ lang, text }: Tokens.Code): string {
        const langString = (lang || '').match(/^\S*/)?.[0];

        const code = `${text.replace(/\n$/, '')}`;

        if (!langString) {
            return `<pre><code>${code}</code></pre>\n`;
        }

        return `<pre><code class="language-${langString}">${code}</code></pre>\n`;
    },
    // Replaces the checkbox input elements with Markdown checkboxes. This is the easiest way to
    // prevent the formatting of Markdown checkboxes in lists. This can modify the input string
    // slightly, since the capitalization of the checkbox can be lost. If a user types '- [X]', it
    // will be replaced with '- [x]'.
    checkbox({ checked }: Tokens.Checkbox) {
        return checked ? '[x]' : '[ ]';
    },
    // Replaces the link renderer to prevent opening links in the same tab. Therefore, the target
    // attribute is set to "_blank".
    link({ href, text, title }: Tokens.Link): string {
        if (title) {
            return `<a href="${href}" rel="noopener noreferrer" target="_blank" title="${title}">${text}</a>`;
        }

        return `<a href="${href}" rel="noopener noreferrer" target="_blank">${text}</a>`;
    },
    // Ensures that the numbering of ordered lists is preserved.
    listitem(item: Tokens.ListItem) {
        if (item.task) {
            return false;
        }

        const match = item.raw.trim().match(/^\d{1,9}[.)]/);

        // Removes the trailing dot or parenthesis from the match.
        const value = match ? match[0].slice(0, match[0].length - 1) : '';

        if (value) {
            let itemBody = '';

            itemBody += this.parser.parse(item.tokens, item.loose);

            // Sets the value attribute of the list item to the number of the list item.
            return `<li value="${value}">${itemBody}</li>\n`;
        }

        // Ensures that the default listitem renderer from marked js is used.
        return false;
    },
};

const postprocess = (html: string): string => {
    let tableIndex = -1;

    // Assigns ids to tables.
    return html.replace(/(<table>)/g, () => {
        tableIndex++;

        return `<table id="${TABLE_ID_PREFIX}${tableIndex}">`;
    });
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
marked.use({ tokenizer, renderer, hooks: { postprocess } });

// Parses markdown following the GitHub flavored Markdown specification. The tokenizer and renderer
// are slightly modified to prevent HTML escaping in code block and inline code.
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

// It is important that, &amp; is replaced last to prevent double escaping.
const unescapeHtml = (text: string) =>
    text.replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');

export const getMarkdownTables = (text: string): TableObject[] => {
    const tableTokens: Tokens.Table[] = [];

    // Since walkTokens is not called with async functions and parseInline is not used, the result
    // of parse is synchronous. To match the type, it will be voided here.
    void marked.parse(text, {
        walkTokens: (token) => {
            if (token.type === 'table') {
                tableTokens.push(token as Tokens.Table);
            }
        },
    });

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
