import { escapeHtmlInText } from '../escape';
import { parseBBCode, ParseBBCodesOptions } from './bb-code/formatBBCode';
import { parseMarkdown } from './markdown/formatMarkdown';
import { TableObject } from './markdown/formatMarkdownTable';

interface FormatStringOptions extends ParseBBCodesOptions {
    escapeHtml?: boolean;
    parseMarkdown?: boolean;
    parseMarkdownTables?: boolean;
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
        escapeHtml: escapeHtmlOption = false,
        parseMarkdown: parseMarkdownOption = true,
        parseMarkdownTables: parseMarkdownTablesOption = false,
        parseBBCode: parseBBCodeOption = false,
        customInlineLevelBBCodeTags = [],
        customBlockLevelBBCodeTags = [],
    } = options || {};

    let formattedString = string;

    // Escapes HTML.
    if (escapeHtmlOption) {
        formattedString = escapeHtmlInText(formattedString);
    }

    if (parseBBCodeOption) {
        try {
            formattedString = parseBBCode(formattedString, {
                customInlineLevelBBCodeTags,
                customBlockLevelBBCodeTags,
                justEscapeSquareBrackets: false,
            });
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
