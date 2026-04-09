export default {
    components: {
        slider: {
            tracktext: 'EINLÖSEN',
        },
        timer: {
            future: '##DISTANCE## (##TIME## Uhr)',
            devalued: 'Vor ##SECONDS## Sek. (##TIME## Uhr)',
            devaluedWithMinutes: 'Vor ##MINUTES## Min. ##SECONDS## Sek. (##TIME## Uhr)',
        },
    },
} as const;
