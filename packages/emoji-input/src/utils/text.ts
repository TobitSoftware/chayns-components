import { BB_LC_MENTION_REGEX, HTML_LC_MENTION_REGEX } from '../constants/regex';
import { unescapeHTML } from './emoji';

export const convertTextToHTML = (text: string) => {
    let result = text;

    result = result.replace(/\n/g, '<br>');

    result = result.replace(
        BB_LC_MENTION_REGEX,
        '<lc_mention contenteditable="false" id="$1"><span>@</span>$2</lc_mention>'
    );

    return result;
};

export const convertHTMLToText = (text: string) => {
    let result = text;

    result = result.replace(HTML_LC_MENTION_REGEX, '[lc_mention id="$1"]$2[/lc_mention]');

    result = result.replace(/\u200B/, '');

    result = unescapeHTML(result);

    const element = document.createElement('div');

    element.innerHTML = result;

    return element.innerText;
};
