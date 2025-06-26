import { Language } from 'chayns-api';
import { createContext } from 'react';

export const TranslationOptionsContext = createContext<{
    from: Exclude<Language, Language.Unknown>;
    to: Exclude<Language, Language.Unknown>;
}>({
    from: Language.German,
    to: Language.German,
});
