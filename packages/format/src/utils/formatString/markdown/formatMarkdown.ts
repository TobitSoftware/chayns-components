import { marked, Tokens } from 'marked';

// TODO Implement all markdown parsing this way.
// This parses tables, that follow the Github-Flavored-Markdown specification.
export const parseMarkdown = (text: string) => {
    const tokens: Tokens.Table[] = [];

    // marked.parse parses all markdown in the provided text and returns the result.
    // The parsed result isn't needed. Instead, the parsed table tokens are collected.
    const result = marked.parse(text, {
        walkTokens: (token) => {
            tokens.push(token as Tokens.Table);
        },
    }) as string;

    console.log('');

    return result;
};
