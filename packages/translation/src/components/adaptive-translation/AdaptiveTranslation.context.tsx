import React, { createContext, ReactNode, useMemo } from 'react';
import { Language } from 'chayns-api';

export const TranslationOptionsContext = createContext<{
    from: Exclude<Language, Language.Unknown>;
    to: Exclude<Language, Language.Unknown>;
}>({
    from: Language.German,
    to: Language.German,
});

interface TranslationOptionsProviderProps {
    /**
     * The content that should benefit from the options.
     */
    children: ReactNode;
    /**
     * The language from which the texts should be translated.
     */
    from: Exclude<Language, Language.Unknown>;
    /**
     * The language to which the texts should be translated.
     */
    to: Exclude<Language, Language.Unknown>;
}

export const TranslationOptionsProvider = ({
    from,
    to,
    children,
}: TranslationOptionsProviderProps) => {
    const value = useMemo(() => ({ from, to }), [from, to]);

    return (
        <TranslationOptionsContext.Provider value={value}>
            {children}
        </TranslationOptionsContext.Provider>
    );
};

TranslationOptionsProvider.displayName = 'TranslationOptionsProvider';

export default TranslationOptionsProvider;
