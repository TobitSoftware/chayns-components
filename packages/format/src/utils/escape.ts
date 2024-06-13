export const escapeHtmlInText = (text: string): string =>
    text.replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const unescapeSquareBrackets = (text: string): string =>
    text.replaceAll('&#91;', '[').replaceAll('&#93;', ']');
