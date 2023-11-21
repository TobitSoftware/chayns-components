import { getLanguage as getChaynsLanguage } from 'chayns-api';
import { de, enGB, es, fr, it, nl, pl, pt, tr, uk } from 'date-fns/locale';

export const getLanguage = (): Locale => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    switch (getChaynsLanguage().translation || getChaynsLanguage().site) {
        case 'en':
            return enGB;
        case 'nl':
            return nl;
        case 'fr':
            return fr;
        case 'it':
            return it;
        case 'pl':
            return pl;
        case 'pt':
            return pt;
        case 'es':
            return es;
        case 'tr':
            return tr;
        case 'uk':
            return uk;
        default:
            return de;
    }
};
