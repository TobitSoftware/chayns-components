interface TimeTypeString {
    singular: string;
    plural: string;
}

export interface TimeTypeStringCollection {
    seconds: TimeTypeString;
    minutes: TimeTypeString;
    hours: TimeTypeString;
    days: TimeTypeString;
    weeks: TimeTypeString;
    months: TimeTypeString;
    years: TimeTypeString;
}

export interface TimeTypeStringsRecord {
    past: TimeTypeStringCollection;
    future: TimeTypeStringCollection;
    and: string;
}

interface TimeTypeStrings {
    [key: string]: TimeTypeStringsRecord;
}

export const TIME_TYPE_STRINGS: TimeTypeStrings = {
    de: {
        and: 'und',
        past: {
            seconds: {
                singular: 'Sekunde',
                plural: 'Sekunden',
            },
            minutes: {
                singular: 'Minute',
                plural: 'Minuten',
            },
            hours: {
                singular: 'Stunde',
                plural: 'Stunden',
            },
            days: {
                singular: 'Tag',
                plural: 'Tagen',
            },
            weeks: {
                singular: 'Woche',
                plural: 'Wochen',
            },
            months: {
                singular: 'Monat',
                plural: 'Monaten',
            },
            years: {
                singular: 'Jahr',
                plural: 'Jahren',
            },
        },
        future: {
            seconds: {
                singular: 'Sekunde',
                plural: 'Sekunden',
            },
            minutes: {
                singular: 'Minute',
                plural: 'Minuten',
            },
            hours: {
                singular: 'Stunde',
                plural: 'Stunden',
            },
            days: {
                singular: 'Tag',
                plural: 'Tagen',
            },
            weeks: {
                singular: 'Woche',
                plural: 'Wochen',
            },
            months: {
                singular: 'Monat',
                plural: 'Monaten',
            },
            years: {
                singular: 'Jahr',
                plural: 'Jahren',
            },
        },
    },
    en: {
        and: 'and',
        past: {
            seconds: {
                singular: 'second',
                plural: 'seconds',
            },
            minutes: {
                singular: 'minute',
                plural: 'minutes',
            },
            hours: {
                singular: 'hour',
                plural: 'hours',
            },
            days: {
                singular: 'day',
                plural: 'days',
            },
            weeks: {
                singular: 'week',
                plural: 'weeks',
            },
            months: {
                singular: 'month',
                plural: 'months',
            },
            years: {
                singular: 'year',
                plural: 'years',
            },
        },
        future: {
            seconds: {
                singular: 'second',
                plural: 'seconds',
            },
            minutes: {
                singular: 'minute',
                plural: 'minutes',
            },
            hours: {
                singular: 'hour',
                plural: 'hours',
            },
            days: {
                singular: 'day',
                plural: 'days',
            },
            weeks: {
                singular: 'week',
                plural: 'weeks',
            },
            months: {
                singular: 'month',
                plural: 'months',
            },
            years: {
                singular: 'year',
                plural: 'years',
            },
        },
    },
    nl: {
        and: 'en',
        past: {
            seconds: {
                singular: 'seconde',
                plural: 'seconden',
            },
            minutes: {
                singular: 'minuut',
                plural: 'minuten',
            },
            hours: {
                singular: 'uur',
                plural: 'uren',
            },
            days: {
                singular: 'dag',
                plural: 'dagen',
            },
            weeks: {
                singular: 'week',
                plural: 'weken',
            },
            months: {
                singular: 'maand',
                plural: 'maanden',
            },
            years: {
                singular: 'jaar',
                plural: 'jaren',
            },
        },
        future: {
            seconds: {
                singular: 'seconde',
                plural: 'seconden',
            },
            minutes: {
                singular: 'minuut',
                plural: 'minuten',
            },
            hours: {
                singular: 'uur',
                plural: 'uren',
            },
            days: {
                singular: 'dag',
                plural: 'dagen',
            },
            weeks: {
                singular: 'week',
                plural: 'weken',
            },
            months: {
                singular: 'maand',
                plural: 'maanden',
            },
            years: {
                singular: 'jaar',
                plural: 'jaren',
            },
        },
    },
    fr: {
        and: 'et',
        past: {
            seconds: {
                singular: 'seconde',
                plural: 'secondes',
            },
            minutes: {
                singular: 'minute',
                plural: 'minutes',
            },
            hours: {
                singular: 'heure',
                plural: 'heures',
            },
            days: {
                singular: 'jour',
                plural: 'jours',
            },
            weeks: {
                singular: 'semaine',
                plural: 'semaines',
            },
            months: {
                singular: 'mois',
                plural: 'mois',
            },
            years: {
                singular: 'an',
                plural: 'ans',
            },
        },
        future: {
            seconds: {
                singular: 'seconde',
                plural: 'secondes',
            },
            minutes: {
                singular: 'minute',
                plural: 'minutes',
            },
            hours: {
                singular: 'heure',
                plural: 'heures',
            },
            days: {
                singular: 'jour',
                plural: 'jours',
            },
            weeks: {
                singular: 'semaine',
                plural: 'semaines',
            },
            months: {
                singular: 'mois',
                plural: 'mois',
            },
            years: {
                singular: 'an',
                plural: 'ans',
            },
        },
    },
    it: {
        and: 'e',
        past: {
            seconds: {
                singular: 'secondo',
                plural: 'secondi',
            },
            minutes: {
                singular: 'minuto',
                plural: 'minuti',
            },
            hours: {
                singular: 'ora',
                plural: 'ore',
            },
            days: {
                singular: 'giorno',
                plural: 'giorni',
            },
            weeks: {
                singular: 'settimana',
                plural: 'settimane',
            },
            months: {
                singular: 'mese',
                plural: 'mesi',
            },
            years: {
                singular: 'anno',
                plural: 'anni',
            },
        },
        future: {
            seconds: {
                singular: 'secondo',
                plural: 'secondi',
            },
            minutes: {
                singular: 'minuto',
                plural: 'minuti',
            },
            hours: {
                singular: 'ora',
                plural: 'ore',
            },
            days: {
                singular: 'giorno',
                plural: 'giorni',
            },
            weeks: {
                singular: 'settimana',
                plural: 'settimane',
            },
            months: {
                singular: 'mese',
                plural: 'mesi',
            },
            years: {
                singular: 'anno',
                plural: 'anni',
            },
        },
    },
    pl: {
        and: 'oraz',
        past: {
            seconds: {
                singular: 'sekunda',
                plural: 'sekundy',
            },
            minutes: {
                singular: 'minuta',
                plural: 'minuty',
            },
            hours: {
                singular: 'godzina',
                plural: 'godziny',
            },
            days: {
                singular: 'dzień',
                plural: 'dni',
            },
            weeks: {
                singular: 'tydzień',
                plural: 'tygodnie',
            },
            months: {
                singular: 'miesiąc',
                plural: 'miesiące',
            },
            years: {
                singular: 'rok',
                plural: 'lata',
            },
        },
        future: {
            seconds: {
                singular: 'sekunda',
                plural: 'sekundy',
            },
            minutes: {
                singular: 'minuta',
                plural: 'minuty',
            },
            hours: {
                singular: 'godzina',
                plural: 'godziny',
            },
            days: {
                singular: 'dzień',
                plural: 'dni',
            },
            weeks: {
                singular: 'tydzień',
                plural: 'tygodnie',
            },
            months: {
                singular: 'miesiąc',
                plural: 'miesiące',
            },
            years: {
                singular: 'rok',
                plural: 'lata',
            },
        },
    },
    pt: {
        and: 'e',
        past: {
            seconds: {
                singular: 'segundo',
                plural: 'segundos',
            },
            minutes: {
                singular: 'minuto',
                plural: 'minutos',
            },
            hours: {
                singular: 'hora',
                plural: 'horas',
            },
            days: {
                singular: 'dia',
                plural: 'dias',
            },
            weeks: {
                singular: 'semana',
                plural: 'semanas',
            },
            months: {
                singular: 'mês',
                plural: 'meses',
            },
            years: {
                singular: 'ano',
                plural: 'anos',
            },
        },
        future: {
            seconds: {
                singular: 'segundo',
                plural: 'segundos',
            },
            minutes: {
                singular: 'minuto',
                plural: 'minutos',
            },
            hours: {
                singular: 'hora',
                plural: 'horas',
            },
            days: {
                singular: 'dia',
                plural: 'dias',
            },
            weeks: {
                singular: 'semana',
                plural: 'semanas',
            },
            months: {
                singular: 'mês',
                plural: 'meses',
            },
            years: {
                singular: 'ano',
                plural: 'anos',
            },
        },
    },
    es: {
        and: 'y',
        past: {
            seconds: {
                singular: 'segundo',
                plural: 'segundos',
            },
            minutes: {
                singular: 'minuto',
                plural: 'minutos',
            },
            hours: {
                singular: 'hora',
                plural: 'horas',
            },
            days: {
                singular: 'día',
                plural: 'días',
            },
            weeks: {
                singular: 'semana',
                plural: 'semanas',
            },
            months: {
                singular: 'mes',
                plural: 'meses',
            },
            years: {
                singular: 'año',
                plural: 'años',
            },
        },
        future: {
            seconds: {
                singular: 'segundo',
                plural: 'segundos',
            },
            minutes: {
                singular: 'minuto',
                plural: 'minutos',
            },
            hours: {
                singular: 'hora',
                plural: 'horas',
            },
            days: {
                singular: 'día',
                plural: 'días',
            },
            weeks: {
                singular: 'semana',
                plural: 'semanas',
            },
            months: {
                singular: 'mes',
                plural: 'meses',
            },
            years: {
                singular: 'año',
                plural: 'años',
            },
        },
    },
    tr: {
        and: 've',
        past: {
            seconds: {
                singular: 'saniye',
                plural: 'saniye',
            },
            minutes: {
                singular: 'dakika',
                plural: 'dakika',
            },
            hours: {
                singular: 'saat',
                plural: 'saat',
            },
            days: {
                singular: 'gün',
                plural: 'gün',
            },
            weeks: {
                singular: 'hafta',
                plural: 'hafta',
            },
            months: {
                singular: 'ay',
                plural: 'ay',
            },
            years: {
                singular: 'yıl',
                plural: 'yıl',
            },
        },
        future: {
            seconds: {
                singular: 'saniye',
                plural: 'saniye',
            },
            minutes: {
                singular: 'dakika',
                plural: 'dakika',
            },
            hours: {
                singular: 'saat',
                plural: 'saat',
            },
            days: {
                singular: 'gün',
                plural: 'gün',
            },
            weeks: {
                singular: 'hafta',
                plural: 'hafta',
            },
            months: {
                singular: 'ay',
                plural: 'ay',
            },
            years: {
                singular: 'yıl',
                plural: 'yıl',
            },
        },
    },
    uk: {
        and: 'i',
        past: {
            seconds: {
                singular: 'секунда',
                plural: 'секунди',
            },
            minutes: {
                singular: 'хвилина',
                plural: 'хвилини',
            },
            hours: {
                singular: 'година',
                plural: 'години',
            },
            days: {
                singular: 'день',
                plural: 'дні',
            },
            weeks: {
                singular: 'тиждень',
                plural: 'тижні',
            },
            months: {
                singular: 'місяць',
                plural: 'місяці',
            },
            years: {
                singular: 'рік',
                plural: 'роки',
            },
        },
        future: {
            seconds: {
                singular: 'секунда',
                plural: 'секунди',
            },
            minutes: {
                singular: 'хвилина',
                plural: 'хвилини',
            },
            hours: {
                singular: 'година',
                plural: 'години',
            },
            days: {
                singular: 'день',
                plural: 'дні',
            },
            weeks: {
                singular: 'тиждень',
                plural: 'тижні',
            },
            months: {
                singular: 'місяць',
                plural: 'місяці',
            },
            years: {
                singular: 'рік',
                plural: 'роки',
            },
        },
    },
};
