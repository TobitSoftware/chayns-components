const DICTIONARY = {
    LOGGED_IN: {
        de: 'eingelogged',
        en: 'logged in',
    },
    DIVIDER_FRIEND: {
        de: 'Freunde',
        en: ' friends',
    },
    DIVIDER_PERSON: {
        de: 'Personen',
        en: ' persons',
    },
    DIVIDER_SITE: {
        de: 'Sites',
        en: 'sites',
    },
    DIVIDER_MORE_PERSON: {
        de: 'Weitere Personen',
        en: ' further persons',
    },
    DIVIDER_MORE_SITE: {
        de: 'Weitere Sites',
        en: 'further sites',
    },
    LOAD_MORE: {
        de: 'Mehr anzeigen',
        en: ' load more',
    },
    COMMON_SITE: {
        de: 'gemeinsame Site',
        en: 'common site',
    },
    COMMON_SITES: {
        de: 'gemeinsame Sites',
        en: 'common sites',
    },
};

const supportedLanguages = ['de', 'en'];

export default function getText(
    key,
    addText = false,
    lang = chayns.env.language || 'en'
) {
    const language = supportedLanguages.indexOf(lang) > -1 ? lang : 'en';
    return (DICTIONARY[key][language] || '') + (addText ? ` ${addText}` : '');
}
