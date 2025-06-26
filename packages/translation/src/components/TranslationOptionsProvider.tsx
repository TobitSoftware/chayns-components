import { Language } from 'chayns-api';
import React, { ReactNode, useMemo } from 'react';
import { TranslationOptionsContext } from '../constants/translationOptionsContext';

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
