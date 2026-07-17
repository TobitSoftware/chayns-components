import {
    BB_LC_MENTION_REGEX,
    BB_NER_IGNORE_REGEX,
    BB_NER_REPLACE_REGEX,
    BB_IGNORE_EMOJI_REGEX,
    HTML_A_TAG_REGEX,
    HTML_BOLD_REGEX,
    HTML_LC_MENTION_REGEX,
    HTML_NER_IGNORE_REGEX,
    HTML_NER_REPLACE_REGEX,
    HTML_NO_EMOJI_REGEX,
} from '../constants/regex';
import { escapeHTML, unescapeHTML } from './emoji';

interface ConvertHTMLToTextOptions {
    preserveSpaces?: boolean;
    shouldSerializeNoEmojiToBBCode?: boolean;
}

const BLOCK_ELEMENT_TAG_NAMES = new Set(['DIV', 'P']);
const BLOCK_SEPARATOR = '<br>';

const isMeaningfulTextNode = (node: ChildNode) =>
    node.nodeType !== Node.TEXT_NODE || (node.textContent?.length ?? 0) > 0;

const isBreakElement = (node: ChildNode) =>
    node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName === 'BR';

const serializeBlockElementToText = (element: HTMLElement) => {
    const childNodes = Array.from(element.childNodes).filter(isMeaningfulTextNode);

    if (childNodes.length === 0) {
        return '';
    }

    if (childNodes.length === 1 && isBreakElement(childNodes[0]!)) {
        return '';
    }

    let serializedText = serializeHTMLToText(childNodes);

    if (
        childNodes.length > 1 &&
        isBreakElement(childNodes[0]!) &&
        serializedText.startsWith(BLOCK_SEPARATOR)
    ) {
        serializedText = serializedText.slice(BLOCK_SEPARATOR.length);
    }

    return serializedText;
};

const serializeHTMLNodeToText = (node: ChildNode): string => {
    if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent ?? '';
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
        return '';
    }

    const element = node as HTMLElement;

    if (element.tagName === 'BR') {
        return '<br>';
    }

    if (BLOCK_ELEMENT_TAG_NAMES.has(element.tagName)) {
        return serializeBlockElementToText(element);
    }

    return element.outerHTML;
};

export const serializeHTMLToText = (nodes: NodeListOf<ChildNode> | ChildNode[]) => {
    const serializedNodes = Array.from(nodes);

    let result = '';
    let didSerializeBlockElement = false;

    serializedNodes.forEach((node) => {
        const serializedNode = serializeHTMLNodeToText(node);

        const isBlockElement =
            node.nodeType === Node.ELEMENT_NODE &&
            BLOCK_ELEMENT_TAG_NAMES.has((node as HTMLElement).tagName);

        if (!serializedNode && !isBlockElement) {
            return;
        }

        if (result && (isBlockElement || didSerializeBlockElement)) {
            result += BLOCK_SEPARATOR;
        }

        result += serializedNode;
        didSerializeBlockElement = isBlockElement;
    });

    return result;
};

export const convertTextToHTML = (text: string) => {
    const element = document.createElement('div');

    element.style.position = 'absolute';
    element.style.opacity = '0';

    element.contentEditable = 'true';
    element.innerText = text;

    document.body.appendChild(element);

    let result = element.innerHTML;

    document.body.removeChild(element);

    result = unescapeHTML(result);

    result = result
        .replace(HTML_A_TAG_REGEX, '$1')
        .replace(
            BB_LC_MENTION_REGEX,
            '<lc_mention contenteditable="false" id="$1"><span>@</span>$2</lc_mention>\u200B',
        )
        .replace(BB_NER_IGNORE_REGEX, '<nerIgnore contenteditable="false">$1</nerIgnore>')
        .replace(
            BB_NER_REPLACE_REGEX,
            (_, prefix: string | undefined, type: string, value: string, entity: string) => {
                const prefixAttr = prefix ? `prefix="${prefix}" ` : '';

                return `<nerReplace contenteditable="false" ${prefixAttr}type="${type}" value="${value}">${entity}</nerReplace>`;
            },
        )
        .replace(BB_IGNORE_EMOJI_REGEX, '<span class="no-emoji-convert">$1</span>');

    return result;
};

export const convertHTMLToText = (
    text: string,
    {
        preserveSpaces = false,
        shouldSerializeNoEmojiToBBCode = true,
    }: ConvertHTMLToTextOptions = {},
) => {
    let result = text;

    result = result
        .replace(HTML_A_TAG_REGEX, '$1')
        .replace(HTML_BOLD_REGEX, '[b]$1[/b]')
        .replace(HTML_LC_MENTION_REGEX, '[lc_mention id="$1"]$2[/lc_mention]')
        .replace(HTML_NER_IGNORE_REGEX, '[nerIgnore]$1[/nerIgnore]')
        .replace(
            HTML_NER_REPLACE_REGEX,
            (_, prefix: string | undefined, type: string, value: string, entity: string) => {
                const prefixAttr = prefix ? `prefix="${prefix}" ` : '';

                return `[nerReplace ${prefixAttr}type="${type}" value="${value}"]${entity}[/nerReplace]`;
            },
        )
        .replace(
            HTML_NO_EMOJI_REGEX,
            shouldSerializeNoEmojiToBBCode ? '[ignoreEmoji]$1[/ignoreEmoji]' : '$1',
        );

    const container = document.createElement('div');

    container.innerHTML = result;

    result = serializeHTMLToText(container.childNodes);

    if (preserveSpaces) {
        return result
            .replace(/&nbsp;/g, '\u00A0') // non-breaking space
            .replace(/\u200B/g, '\u200B'); // zero-width space (sichtbar gemacht)
    }

    // eslint-disable-next-line no-irregular-whitespace
    result = result.replace(/\u200B/g, '');
    result = escapeHTML(result);

    const element = document.createElement('div');

    element.style.position = 'absolute';
    element.style.opacity = '0';

    element.contentEditable = 'true';
    element.innerHTML = result;

    document.body.appendChild(element);

    result = element.innerText;

    document.body.removeChild(element);

    return result;
};

export const getElementTextLength = (element: Element) => {
    let textLength = 0;

    try {
        textLength = convertHTMLToText(element.outerHTML, {
            shouldSerializeNoEmojiToBBCode: false,
        }).length;
    } catch (e) {
        // Do nothing
    }

    return textLength;
};

export const cleanupEmptyIgnoreEmojiSpans = (html: string) => {
    // Remove empty no-emoji-convert spans that have no text content
    return html.replace(/<span class="no-emoji-convert"><\/span>/g, '');
};
