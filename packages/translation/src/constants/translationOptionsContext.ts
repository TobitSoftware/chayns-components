import { Language } from 'chayns-api';
import React from 'react';

export const TranslationOptionsContext = React.createContext<{
    from: Exclude<Language, Language.Unknown>;
    to: Exclude<Language, Language.Unknown>;
}>({
    from: Language.German,
    to: Language.German,
});
