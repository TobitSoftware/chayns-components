export default {
    components: {
        codeHighlighter: {
            copyToClipboard: {
                copy: {
                    stringName:
                        'txt_chayns_components_code_highlighter_components_codeHighlighter_copyToClipboard_copy',
                    fallback: 'Kopieren',
                },
                copied: {
                    stringName:
                        'txt_chayns_components_code_highlighter_components_codeHighlighter_copyToClipboard_copied',
                    fallback: 'Kopiert!',
                },
                copyFailed: {
                    stringName:
                        'txt_chayns_components_code_highlighter_components_codeHighlighter_copyToClipboard_copyFailed',
                    fallback: 'Kopieren fehlgeschlagen',
                },
                share: {
                    stringName:
                        'txt_chayns_components_code_highlighter_components_codeHighlighter_copyToClipboard_share',
                    fallback: 'Teilen',
                },
            },
        },
    },
} as const;
