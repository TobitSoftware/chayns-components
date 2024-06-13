import { escapeHtmlInText, unescapeSquareBrackets } from '../escape';
import { parseBBCode, ParseBBCodesOptions } from './bb-code/formatBBCode';
import { parseMarkdown } from './markdown/formatMarkdown';
import { parseMarkdownTables, TableObject } from './markdown/formatMarkdownTable';

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

    // TODO Possibly include parseMarkdownTablesOption in the condition.

    // Escape BB-Code square brackets, to prevent conflicts between markdown and BB Code.
    /* Conflict example:
        When Sidekick detects a function call as an entity through NER, then the following text is returned.
        '[nerReplace <params>]function[/nerReplace](<params>)'
        Because '[/nerReplace](<params>)' is a valid Markdown link, the Markdown parser would interpret it as a link
        and thus prevent the BB-Code parser from recognizing the BB-Code. Parsing the BB-Code first would prevent this
        issue. Unfortunately the Markdown parser doesn't support this.
     */
    const shouldTemporarilyEscapeBBCodeBrackets = parseMarkdownOption && parseBBCodeOption;
    if (shouldTemporarilyEscapeBBCodeBrackets) {
        try {
            formattedString = parseBBCode(formattedString, {
                justEscapeSquareBrackets: true,
            });
        } catch (error) {
            console.warn(
                '[@chayns-components/format] Warning: Failed to escape bb-code brackets',
                error,
            );
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

    // TODO Check what happens when parse tables is true, but parse markdown is false. Specifically see what happens when table cells include markdown.
    // Parses markdown tables to HTML. Also returns the tables content as an array, to allow further processing.
    if (parseMarkdownTablesOption) {
        try {
            const result = parseMarkdownTables(formattedString);
            formattedString = result.html;
            tables.push(...result.tables);
        } catch (error) {
            console.warn(
                '[@chayns-components/format] Warning: Failed to parse markdown tables',
                error,
            );
        }
    }

    // Unescapes BB-Code square brackets, to allow parsing of BB-Code.
    if (shouldTemporarilyEscapeBBCodeBrackets) {
        formattedString = unescapeSquareBrackets(formattedString);
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

    return {
        html: formattedString,
        tables,
    };
};
