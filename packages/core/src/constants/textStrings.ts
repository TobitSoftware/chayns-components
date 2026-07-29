export default {
    components: {
        filter: {
            filterContent: {
                input: {
                    placeholder: {
                        stringName:
                            'txt_chayns_components_core_components_filter_filterContent_input_placeholder',
                        fallback: 'Suche',
                    },
                },
                sort: {
                    stringName: 'txt_chayns_components_core_components_filter_filterContent_sort',
                    fallback: 'Sortierung',
                },
            },
        },
        filterButtons: {
            all: {
                stringName: 'txt_chayns_components_core_components_filterButtons_all',
                fallback: 'Alle',
            },
        },
        truncation: {
            less: {
                stringName: 'txt_chayns_components_core_components_truncation_less',
                fallback: 'Weniger',
            },
            more: {
                stringName: 'txt_chayns_components_core_components_truncation_more',
                fallback: 'Mehr',
            },
        },
        fileItem: {
            download: {
                stringName: 'txt_chayns_components_core_components_fileItem_download',
                fallback: 'Download',
            },
            remove: {
                stringName: 'txt_chayns_components_core_components_fileItem_remove',
                fallback: 'Entfernen',
            },
        },
        copyableContent: {
            copy: {
                stringName: 'txt_chayns_components_core_components_copyableContent_copy',
                fallback: 'Kopieren',
            },
            share: {
                stringName: 'txt_chayns_components_core_components_copyableContent_share',
                fallback: 'Teilen',
            },
            copyFailed: {
                stringName: 'txt_chayns_components_core_components_copyableContent_copyFailed',
                fallback: 'Kopieren fehlgeschlagen',
            },
        },
    },
} as const;
