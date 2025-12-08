import type { TableObject } from '../../types/format';
import { escapeHtmlInText } from '../escape';
import {
    parseBBCode,
    ParseBBCodesOptions,
    unescapeBBCodeSquareBrackets,
} from './bb-code/formatBBCode';
import { getMarkdownTables, parseMarkdown } from './markdown/formatMarkdown';

interface FormatStringOptions extends ParseBBCodesOptions {
    parseMarkdown?: boolean;
    parseBBCode?: boolean;
}

interface FormatStringResult {
    html: string;
    tables: TableObject[];
}

// This function takes a string and returns formatted HTML as a string.
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

    // Needs to get the tables before escaping HTML and parsing bb-code, so the original content can be extracted.
    const tables: TableObject[] = [];

    if (parseMarkdownOption) {
        try {
            tables.push(...getMarkdownTables(formattedString));
        } catch (error) {
            console.warn(
                '[@chayns-components/format] Warning: Failed to get markdown tables',
                error,
            );
        }
    }

    // Escape HTML entities.
    formattedString = escapeHtmlInText(formattedString);

    // Escape BB-Code to prevent conflicts between Markdown and BB-code. Specifically [b]test[/b]()
    // would be a problem, since Markdown interprets parts of this as a link.

    // Parses markdown to HTML.
    if (parseMarkdownOption) {
        try {
            if (parseBBCodeOption) {
                // Escapes BB-Code brackets.
                formattedString = parseBBCode(formattedString, {
                    customInlineLevelBBCodeTags,
                    customBlockLevelBBCodeTags,
                    justEscapeSquareBrackets: true,
                });
            }

            formattedString = parseMarkdown(formattedString, parseBBCodeOption);

            // Remove trailing \n
            formattedString = formattedString.replace(/\n$/, '');

            if (parseBBCodeOption) {
                // Unescapes BB-Code brackets.
                formattedString = unescapeBBCodeSquareBrackets(formattedString);
            }
        } catch (error) {
            console.warn('[@chayns-components/format] Warning: Failed to parse markdown', error);
        }
    }

    // Parses BB-Code to HTML.
    if (parseBBCodeOption) {
        try {
            formattedString = parseBBCode(formattedString, {
                customInlineLevelBBCodeTags,
                customBlockLevelBBCodeTags,
            });
            formattedString = unescapeBBCodeSquareBrackets(formattedString);
        } catch (error) {
            console.warn('[@chayns-components/format] Warning: Failed to parse bb-code', error);
        }
    }

    return {
        html: formattedString,
        tables,
    };
};
