export default {
    components: {
        codeHighlighter: {
            copyToClipboard: {
                copy: {
                    stringName:
                        'txt_chayns_components_v5_code_highlighter_components_codeHighlighter_copyToClipboard_copy',
                    fallback: 'Kopieren',
                },
                copyFailed: {
                    stringName:
                        'txt_chayns_components_v5_code_highlighter_components_codeHighlighter_copyToClipboard_copyFailed',
                    fallback: 'Kopieren fehlgeschlagen',
                },
                insertCode: {
                    stringName:
                        'txt_chayns_components_v5_code_highlighter_components_codeHighlighter_copyToClipboard_insertCode',
                    fallback: 'Code einfügen',
                },
                share: {
                    stringName:
                        'txt_chayns_components_v5_code_highlighter_components_codeHighlighter_copyToClipboard_share',
                    fallback: 'Teilen',
                },
            },
        },
    },
} as const;
