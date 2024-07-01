import { findFirstBBCode } from './findBBCode';

const BB_CODE_HTML_TAG_PREFIX = 'bb-code-';

const BLOCK_LEVEL_TAGS = ['center', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];
const INLINE_LEVEL_TAGS = ['b', 'strong', 'i', 'em', 'u', 's', 'span', 'img'];

export interface ParseBBCodesOptions {
    customBlockLevelBBCodeTags?: string[];
    customInlineLevelBBCodeTags?: string[];
    justEscapeSquareBrackets?: boolean;
}

// Parses BB-Code to HTML recursively.
// When justEscapeSquareBrackets is true, square brackets are escaped to prevent conflicts between markdown and BB Code.
// In that case the function only escapes square brackets and doesn't remove line breaks.
export const parseBBCode = (text: string, options?: ParseBBCodesOptions) => {
    const {
        customBlockLevelBBCodeTags: customBlockLevelTags = [],
        customInlineLevelBBCodeTags: customInlineLevelTags = [],
        justEscapeSquareBrackets = false,
    } = options || {};

    let html = text;

    // This index is used to keep track of the position in the html string that is being parsed.
    let parseBehindIndex = 0;

    while (parseBehindIndex < html.length) {
        const htmlToParse = html.slice(parseBehindIndex);

        const firstBBCodeMatch = findFirstBBCode(htmlToParse);

        // Stops parsing if no BB-Code is found.
        if (!firstBBCodeMatch) {
            return html;
        }

        const { content, fullMatch, parameters, index, openingTag, closingTag } = firstBBCodeMatch;

        const Tag = firstBBCodeMatch.tag.toLowerCase();
        const isValidTag = [
            ...BLOCK_LEVEL_TAGS,
            ...customBlockLevelTags,
            ...INLINE_LEVEL_TAGS,
            ...customInlineLevelTags,
        ].includes(Tag);
        const isBlockLevelTag = [...BLOCK_LEVEL_TAGS, ...customBlockLevelTags].includes(Tag);

        // Ignores tags that are not supported.
        if (!isValidTag) {
            // The parsing continues behind the first square bracket of the BB-Code tag.
            parseBehindIndex += index + 1;
            // eslint-disable-next-line no-continue
            continue;
        }

        // Converts BB-Code tag's content before converting itself, because it may contain other BB-Codes.
        let parsedContent = parseBBCode(content, options);

        if (justEscapeSquareBrackets) {
            const indexOfFullMatch = html.indexOf(fullMatch);
            const escapedOpeningTag = escapeBBCodeSquareBrackets(openingTag);
            const escapedClosingTag = escapeBBCodeSquareBrackets(closingTag);

            // Simply escapes the square brackets of the BB-Code opening and closing tag.
            html =
                html.slice(0, indexOfFullMatch) +
                escapedOpeningTag +
                parsedContent +
                escapedClosingTag +
                html.slice(indexOfFullMatch + fullMatch.length);

            // Continues parsing behind the parsed bb-code.
            parseBehindIndex =
                indexOfFullMatch +
                escapedOpeningTag.length +
                parsedContent.length +
                escapedClosingTag.length;
        } else {
            // Removes leading and trailing line-breaks from within bb code elements, to prevent unwanted spacing.
            parsedContent = parsedContent.replace(/^\n+|\n+$/g, '');

            const indexOfFullMatch = html.indexOf(fullMatch);

            let htmlAfterTag = html.slice(indexOfFullMatch + fullMatch.length);

            // Removes leading line-break (ONE, NOT ALL) after block level elements, to prevent unwanted spacing.
            if (isBlockLevelTag) {
                htmlAfterTag = htmlAfterTag.replace(/^\n/, '');
            }

            const isCustomTag = [...customBlockLevelTags, ...customInlineLevelTags].includes(Tag);
            const htmlTag = isCustomTag ? `${BB_CODE_HTML_TAG_PREFIX}${Tag}` : Tag;
            const openingHtmlTag = `<${htmlTag}${Object.entries(parameters).length > 0 ? ' ' : ''}${Object.entries(
                parameters,
            )
                .map(([key, value]) => `${key}="${value}"`)
                .join(' ')}>`;
            const closingHtmlTag = `</${htmlTag}>`;

            const element =
                Tag === 'img' ? openingHtmlTag : openingHtmlTag + parsedContent + closingHtmlTag;

            html = `${html.slice(0, indexOfFullMatch)}${element}${htmlAfterTag}`;

            // Continues parsing behind the parsed bb-code.
            parseBehindIndex = indexOfFullMatch + element.length;
        }
    }

    return html;
};

export const escapeBBCodeSquareBrackets = (text: string) =>
    text.replaceAll('[', '&zwj;[&zwj;').replaceAll(']', '&zwj;]&zwj;');

export const unescapeBBCodeSquareBrackets = (text: string) =>
    text.replaceAll('&zwj;[&zwj;', '[').replaceAll('&zwj;]&zwj;', ']');
