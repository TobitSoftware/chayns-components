import { BB_LC_MENTION_REGEX, HTML_LC_MENTION_REGEX, QUOTE_REGEX } from '../constants/regex';

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
    console.log(text);

    const regexForQuoteStart = /„(\s|$)/g;

    const formattedQuotes = text.replace(QUOTE_REGEX, (match) => {
        console.log('match', match);
        if (match.startsWith(' ') || text.startsWith(match)) {
            return match.startsWith(' ')
                ? ` ${String.fromCharCode(8222)}`
                : String.fromCharCode(8222);
        }
        return String.fromCharCode(8220);
    });

    return formattedQuotes;
    // return formattedQuotes.replace(regexForQuoteStart, '"');
};
