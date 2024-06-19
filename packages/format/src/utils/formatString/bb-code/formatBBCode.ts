import { findFirstBBCode } from './findBBCode';

const BB_CODE_HTML_TAG_PREFIX = 'bb-code-';

const BLOCK_LEVEL_TAGS = ['center', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];
const INLINE_LEVEL_TAGS = ['b', 'strong', 'i', 'em', 'u', 's', 'span', 'img'];

const HTML_CODE_PATTERN = /(?:<code>|<code class="inline-code">)[\s\S]*?<\/code>/;

export interface ParseBBCodesOptions {
    customBlockLevelBBCodeTags?: string[];
    customInlineLevelBBCodeTags?: string[];
}

interface PrivateParseBBCodesOptions extends ParseBBCodesOptions {
    // When justEscapeSquareBrackets is true, this function is simply used to escape square brackets of bb-code tags and nothing else!
    justEscapeSquareBrackets?: boolean;
}

// Parses BB-Code to HTML recursively.
// When justEscapeSquareBrackets is true, square brackets are escaped to prevent conflicts between markdown and BB Code.
// In that case the function only escapes square brackets and doesn't remove line breaks.
export const parseBBCode = (text: string, options?: PrivateParseBBCodesOptions) => {
    const {
        justEscapeSquareBrackets = false,
        customBlockLevelBBCodeTags: customBlockLevelTags = [],
        customInlineLevelBBCodeTags: customInlineLevelTags = [],
    } = options || {};

    let html = text;

    // This index is used to keep track of the position in the html string that is being parsed.
    let parseBehindIndex = 0;

    while (parseBehindIndex < html.length) {
        const htmlToParse = html.slice(parseBehindIndex);

        const firstCodeElementMatch = HTML_CODE_PATTERN.exec(htmlToParse);
        const firstBBCodeMatch = findFirstBBCode(htmlToParse);

        // Stops parsing if no BB-Code is found.
        if (!firstBBCodeMatch) {
            return html;
        }

        // Prevents bb-code parsing within code block.
        if (
            firstCodeElementMatch &&
            firstBBCodeMatch &&
            firstCodeElementMatch.index < firstBBCodeMatch.index
        ) {
            // If a code block is found before a BB-Code tag, BB-Code parsing continues behind the code block.
            parseBehindIndex += firstCodeElementMatch.index + firstCodeElementMatch[0].length;
            // eslint-disable-next-line no-continue
            continue;
        }

        const { content, fullMatch, parameters, index } = firstBBCodeMatch;

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
        let parsedContent = parseBBCode(content);

        // Removes leading and trailing line-breaks from within bb code elements, to prevent unwanted spacing.
        if (!justEscapeSquareBrackets) {
            parsedContent = parsedContent.replace(/^\n+|\n+$/g, '');
        }

        const indexOfFullMatch = html.indexOf(fullMatch);

        let htmlAfterTag = html.slice(indexOfFullMatch + fullMatch.length);

        // Removes leading line-break (ONE, NOT ALL) after block level elements, to prevent unwanted spacing.
        if (!justEscapeSquareBrackets && isBlockLevelTag) {
            htmlAfterTag = htmlAfterTag.replace(/^\n/, '');
        }

        // Use escaped square brackets to prevent conflicts between markdown and BB Code.
        const openTag = justEscapeSquareBrackets ? '&#91;' : '<';
        const closeTag = justEscapeSquareBrackets ? '&#93;' : '>';

        // TODO Don't alter content of bb-code tags when justEscapeSquareBrackets is true.
        //  This is necessary to preserve whitespaces in bb-code tags within code blocks.

        const isCustomTag = [...customBlockLevelTags, ...customInlineLevelTags].includes(Tag);
        const htmlTag =
            !justEscapeSquareBrackets && isCustomTag ? `${BB_CODE_HTML_TAG_PREFIX}${Tag}` : Tag;
        const openingTag = `${openTag}${htmlTag}${Object.entries(parameters).length > 0 ? ' ' : ''}${Object.entries(
            parameters,
        )
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ')}${closeTag}`;
        const closingTag = `${openTag}/${htmlTag}${closeTag}`;
        html =
            html.slice(0, indexOfFullMatch) +
            openingTag +
            parsedContent +
            closingTag +
            htmlAfterTag;

        // Continues parsing behind the parsed bb-code.
        parseBehindIndex =
            indexOfFullMatch + openingTag.length + parsedContent.length + closingTag.length;
    }

    return html;
};