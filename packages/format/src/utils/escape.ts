export const escapeHtmlInText = (text: string): string =>
    text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
