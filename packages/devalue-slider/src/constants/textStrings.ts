export default {
    slider: {
        trackText: {
            stringName: '',
            fallback: 'EINLÖSEN',
        },
    },
    timer: {
        devalued: {
            stringName: '',
            fallback: 'Vor ##SECONDS## Sek. (##TIME## Uhr)',
        },
        devaluedWithMinutes: {
            stringName: '',
            fallback: 'Vor ##MINUTES## Min. ##SECONDS## Sek. (##TIME## Uhr)',
        },
        future: {
            stringName: '',
            fallback: '##DISTANCE## (##TIME## Uhr)',
        },
    },
} as const;
