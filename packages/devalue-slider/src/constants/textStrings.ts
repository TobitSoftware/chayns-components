export default {
    components: {
        slider: {
            tracktext: {
                stringName: 'txt_chayns_components_devalue_slider_components_slider_tracktext',
                fallback: 'EINLÖSEN',
            },
        },
        timer: {
            devalued: {
                stringName: 'txt_chayns_components_devalue_slider_components_timer_devalued',
                fallback: 'Vor ##SECONDS## Sek. (##TIME## Uhr)',
            },
            devaluedWithMinutes: {
                stringName:
                    'txt_chayns_components_devalue_slider_components_timer_devaluedWithMinutes',
                fallback: 'Vor ##MINUTES## Min. ##SECONDS## Sek. (##TIME## Uhr)',
            },
            future: {
                stringName: 'txt_chayns_components_devalue_slider_components_timer_future',
                fallback: '##DISTANCE## (##TIME## Uhr)',
            },
        },
    },
} as const;
