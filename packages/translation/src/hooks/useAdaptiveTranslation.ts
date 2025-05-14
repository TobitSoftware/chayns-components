import { useEffect, useMemo, useState } from 'react';
import { Language, useLanguage } from 'chayns-api';
import { translateText } from '../api/translation';

export const useAdaptiveTranslation = (
    originalText: string,
    {
        to,
        from,
    }: {
        to?: Exclude<Language, Language.Unknown>;
        from?: Exclude<Language, Language.Unknown>;
    } = {},
): { text: string; isLoading: boolean; isFetching: boolean } => {
    const { active, site } = useLanguage();
    const toLanguage = to || active;
    const fromLanguage = from || site;
    const shouldTranslate = useMemo(() => toLanguage !== fromLanguage, [fromLanguage, toLanguage]);
    const [translatedText, setTranslatedText] = useState<string>(originalText);
    const [isLoading, setIsLoading] = useState(shouldTranslate);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const timeoutRef = setTimeout(() => {
            if (shouldTranslate) {
                setIsFetching(true);
                void translateText(originalText, toLanguage, fromLanguage)
                    .then((text) => {
                        setTranslatedText(text);
                        setIsLoading(false);
                        setIsFetching(false);
                    })
                    .catch(() => {
                        setIsFetching(false);
                    });
            }
        }, 200);

        return () => clearTimeout(timeoutRef);
    }, [originalText, shouldTranslate, toLanguage, fromLanguage]);

    return useMemo(
        () => ({
            text: shouldTranslate ? translatedText : originalText,
            isFetching: shouldTranslate ? isFetching : false,
            isLoading: shouldTranslate ? isLoading : false,
        }),
        [isFetching, isLoading, originalText, shouldTranslate, translatedText],
    );
};
