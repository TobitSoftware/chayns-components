import { Language } from 'chayns-api';
import React, { useMemo } from 'react';
import { TranslationOptionsContext } from '../constants/translationOptionsContext';

type TranslationOptionsProviderProps = {
    from: Exclude<Language, Language.Unknown>;
    to: Exclude<Language, Language.Unknown>;
    children: React.ReactNode;
};

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
