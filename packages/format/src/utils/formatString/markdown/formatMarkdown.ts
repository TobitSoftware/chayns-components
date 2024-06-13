import { Parser } from 'commonmark';
// @ts-expect-error: Not typed
import { escapeHtmlInText } from '../../escape';
import InternalHTMLRenderer from './InternalHTMLRenderer';

export const MESSAGE_CONVERSION_LINE_BREAK = '<br is-replaced-linebreak>';
export const MESSAGE_CONVERSION_LINE_BREAK_ESCAPED = escapeHtmlInText(
    MESSAGE_CONVERSION_LINE_BREAK,
);

export const parseMarkdown = (text: string) => {
    let newText = text;

    // Markdown has its own line break handling. For that reason, we need to replace line breaks with a custom element.
    // In this case I chose a custom <br> Tag.
    // Since commonmark doesn't parse markdown in lines with html, the custom <br> Tag needs to be in its own line.
    // Since there are issues, when the <br> Tag + \n is followed by text, there needs to be a second line break.
    // Thus, we replace \n with \n<br>\n\n.
    newText = newText.replaceAll(/\n/gm, `\n${MESSAGE_CONVERSION_LINE_BREAK}\n\n`);

    const commonmarkParser = new Parser();
    // TODO Check if esc needs to be passed to InternalHTMLRenderer.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
    const internalHTMLRenderer = new InternalHTMLRenderer({ esc: escapeHtmlInText });

    // Converts markdown to HTML.
    const parsedText = commonmarkParser.parse(newText);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    newText = internalHTMLRenderer.render(parsedText) as string;

    // The Linebreak handling of markdown is ignored, by removing \n. Then the custom <br> Tags are converted back to \n.
    newText = newText.replaceAll(/\n/gm, '');
    newText = newText
        .replaceAll(MESSAGE_CONVERSION_LINE_BREAK, '\n')
        .replaceAll(MESSAGE_CONVERSION_LINE_BREAK_ESCAPED, '\n');

    return newText;
};
