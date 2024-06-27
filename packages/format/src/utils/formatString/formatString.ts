import { escapeHtmlInText } from '../escape';
import { escapeBBCode, parseBBCode, ParseBBCodesOptions } from './bb-code/formatBBCode';
import { parseMarkdown } from './markdown/formatMarkdown';
import { TableObject } from './markdown/formatMarkdownTable';

interface FormatStringOptions extends ParseBBCodesOptions {
    parseMarkdown?: boolean;
    parseBBCode?: boolean;
}

interface FormatStringResult {
    html: string;
    tables: TableObject[];
}

// TODO Add linkify option.
// This function takes a string and returns formatted html as a string.
export const formatStringToHtml = (
    string: string,
    options?: FormatStringOptions,
): FormatStringResult => {
    if (!string) {
        return {
            html: '',
            tables: [],
        };
    }

    const {
        parseMarkdown: parseMarkdownOption = true,
        parseBBCode: parseBBCodeOption = false,
        customInlineLevelBBCodeTags = [],
        customBlockLevelBBCodeTags = [],
    } = options || {};

    let formattedString = string;

    // // Escape HTML entities.
    formattedString = escapeHtmlInText(formattedString);

    if (parseBBCodeOption) {
        try {
            // Escapes square brackets within Markdown code blocks and inline code to prevent bb-code formatting within them.
            if (parseMarkdownOption) {
                formattedString = escapeBBCode(formattedString);
            }

            formattedString = parseBBCode(formattedString, {
                customInlineLevelBBCodeTags,
                customBlockLevelBBCodeTags,
                parseMarkdown: parseMarkdownOption,
            });

            // Unescapes square brackets after bb-code formatting to display them correctly.
            if (parseMarkdownOption) {
                formattedString = formattedString.replaceAll('&#91;', '[').replaceAll('&#93;', ']');
            }
        } catch (error) {
            console.warn('[@chayns-components/format] Warning: Failed to parse bb-code', error);
        }
    }

    // Parses markdown to HTML. Markdown tables are parsed separately.
    if (parseMarkdownOption) {
        try {
            formattedString = parseMarkdown(formattedString);
        } catch (error) {
            console.warn('[@chayns-components/format] Warning: Failed to parse markdown', error);
        }
    }

    const tables: TableObject[] = [];

    return {
        html: formattedString,
        tables,
    };
};

// TODO Handle following changes:
// tables dont have id to assign them to table objects. Use the index instead.
// Inline Code doesn't have class inline-code anymore. Styles have to be applied differently.
// Code block language is on language attribute of code tag instead of pre tag.
