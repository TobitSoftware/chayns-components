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
            more: 'Mehr',
            less: 'Weniger',
        },
    },
} as const;
