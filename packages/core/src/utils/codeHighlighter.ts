// JavaScript/TypeScript
import parserBabel from 'prettier/parser-babel';

// HTML
import parserHtml from 'prettier/parser-html';

// CSS
import parserPostcss from 'prettier/parser-postcss';

// Markdown
import parserMarkdown from 'prettier/parser-markdown';

// GraphQL
import parserGraphql from 'prettier/parser-graphql';

// YAML
import parserYaml from 'prettier/parser-yaml';

import type { Options } from 'prettier';
import {
    BABEL_LANGUAGES,
    CSS_LANGUAGES,
    GRAPHQL_LANGUAGES,
    HTML_LANGUAGES,
    MARKDOWN_LANGUAGES,
    YAML_LANGUAGES,
} from '../constants/codeHighlighter';
import type { CodeHighlighterLanguage } from '../types/codeHighlighter';

export const getParserForLanguage = (language: CodeHighlighterLanguage): Options | undefined => {
    let parser;
    let plugin;

    switch (true) {
        case BABEL_LANGUAGES.includes(language):
            parser = 'babel';
            plugin = parserBabel;
            break;
        case HTML_LANGUAGES.includes(language):
            parser = 'html';
            plugin = parserHtml;
            break;
        case CSS_LANGUAGES.includes(language):
            parser = 'css';
            plugin = parserPostcss;
            break;
        case MARKDOWN_LANGUAGES.includes(language):
            parser = 'markdown';
            plugin = parserMarkdown;
            break;
        case GRAPHQL_LANGUAGES.includes(language):
            parser = 'graphql';
            plugin = parserGraphql;
            break;
        case YAML_LANGUAGES.includes(language):
            parser = 'yaml';
            plugin = parserYaml;
            break;
        default:
            break;
    }

    if (parser && plugin) {
        return {
            parser,
            plugins: [plugin],
        };
    }

    return undefined;
};
