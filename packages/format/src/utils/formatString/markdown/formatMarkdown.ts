import { marked, Tokens } from 'marked';

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
};

const renderer = {
    // Code Renderer is overwritten to prevent html escaping, since html is already escaped.
    // The function is copied from marked.js and slightly modified: https://github.com/markedjs/marked/blob/42954aaba960b6f815b24ec0d39da464960e4ec9/src/Renderer.ts#L24
    code(text: string, lang: string): string {
        const langString = (lang || '').match(/^\S*/)?.[0];

        const code = `${text.replace(/\n$/, '')}\n`;

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
export const parseMarkdown = (text: string) => marked.parse(text) as string;
