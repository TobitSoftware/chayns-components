export const escapeHtmlInText = (text: string): string =>
    text.replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const unescapeSquareBrackets = (text: string): string =>
    text.replaceAll('&#91;', '[').replaceAll('&#93;', ']');

export const MESSAGE_CONVERSION_LINE_BREAK = '<br is-replaced-linebreak>';
export const MESSAGE_CONVERSION_LINE_BREAK_ESCAPED = escapeHtmlInText(
    MESSAGE_CONVERSION_LINE_BREAK,
);
