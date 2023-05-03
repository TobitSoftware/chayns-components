import { BB_LC_MENTION_REGEX, HTML_LC_MENTION_REGEX } from '../constants/regex';

export const convertBBCodesToHTML = (text: string) => {
    let result = text;

    result = result.replace(
        BB_LC_MENTION_REGEX,
        '<lc_mention contenteditable="false" id="$1"><span>@</span>$2</lc_mention>'
    );

    return result;
};

export const convertHTMLToBBCodes = (text: string) => {
    let result = text;

    result = result.replace(HTML_LC_MENTION_REGEX, '[lc_mention id="$1"]$2[/lc_mention]');

    return result;
};

export const convertQuotes = (text: string) => {
    let result = '';
    let inBrackets = false;
    let inTags = false;

    for (let i = 0; i < text.length; i++) {
        const char = text.charAt(i);
        const prevChar = i > 0 ? text.charAt(i - 1) : '';
        const htmlEntity = text.substr(i, 4);

        if (char === '[') {
            inBrackets = true;
            result += char;
        } else if (char === ']') {
            inBrackets = false;
            result += char;
        } else if (char === '<') {
            inTags = false;
            result += char;
        } else if (char === '>') {
            inTags = false;
            result += char;
        } else if (htmlEntity === '&lt;') {
            inTags = true;
            result += '&lt;';
            i += 3;
        } else if (htmlEntity === '&gt;') {
            inTags = false;
            result += '&gt;';
            i += 3;
        } else if (char === '"' && !inBrackets && !inTags) {
            if (prevChar === ' ' || i === 0) {
                result += String.fromCharCode(8222);
            } else if (/[\w.,:;!?"'-]/.test(prevChar)) {
                result += String.fromCharCode(8220);
            } else {
                result += char;
            }
        } else {
            result += char;
        }
    }

    return result;
};
