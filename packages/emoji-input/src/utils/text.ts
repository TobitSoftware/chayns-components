import {
    BB_BOLD_REGEX,
    BB_LC_MENTION_REGEX,
    BB_NER_IGNORE_REGEX,
    BB_NER_REPLACE_REGEX,
    HTML_BOLD_REGEX,
    HTML_LC_MENTION_REGEX,
    HTML_NER_IGNORE_REGEX,
    HTML_NER_REPLACE_REGEX,
} from '../constants/regex';
import { escapeHTML, unescapeHTML } from './emoji';

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
        .replace(BB_BOLD_REGEX, '<b>$1</b>')
        .replace(
            BB_LC_MENTION_REGEX,
            '<lc_mention contenteditable="false" id="$1"><span>@</span>$2</lc_mention>',
        )
        .replace(BB_NER_IGNORE_REGEX, '<nerIgnore contenteditable="false">$1</nerIgnore>')
        .replace(
            BB_NER_REPLACE_REGEX,
            (_, prefix: string | undefined, type: string, value: string, entity: string) => {
                const prefixAttr = prefix ? `prefix="${prefix}" ` : '';

                return `<nerReplace contenteditable="false" ${prefixAttr}type="${type}" value="${value}">${entity}</nerReplace>`;
            },
        );

    return result;
};

export const convertHTMLToText = (text: string) => {
    let result = text;

    result = result
        .replace(HTML_BOLD_REGEX, '[b]$1[/b]')
        .replace(HTML_LC_MENTION_REGEX, '[lc_mention id="$1"]$2[/lc_mention]')
        .replace(HTML_NER_IGNORE_REGEX, '[nerIgnore]$1[/nerIgnore]')
        .replace(
            HTML_NER_REPLACE_REGEX,
            (_, prefix: string | undefined, type: string, value: string, entity: string) => {
                const prefixAttr = prefix ? `prefix="${prefix}" ` : '';

                return `[nerReplace ${prefixAttr}type="${type}" value="${value}"]${entity}[/nerReplace]`;
            },
        );

    // eslint-disable-next-line no-irregular-whitespace
    result = result.replace(/​/g, '');

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
        textLength = convertHTMLToText(element.outerHTML).length;
    } catch (e) {
        // Do nothing
    }

    return textLength;
};
