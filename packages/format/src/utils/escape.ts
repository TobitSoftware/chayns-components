export const escapeHtmlInText = (text: string): string =>
    text.replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const MESSAGE_CONVERSION_LINE_BREAK = '<br is-replaced-linebreak>';
export const MESSAGE_CONVERSION_LINE_BREAK_ESCAPED = escapeHtmlInText(
    MESSAGE_CONVERSION_LINE_BREAK,
);
