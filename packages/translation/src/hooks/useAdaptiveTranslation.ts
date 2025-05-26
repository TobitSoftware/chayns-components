import { useEffect, useMemo, useState } from 'react';
import { Language, useLanguage } from 'chayns-api';
import translationHandler from '../utils/translationHandler';

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
                void translationHandler
                    .translateText(originalText, fromLanguage, toLanguage)
                    .then((text) => {
                        setTranslatedText(text);
                    })
                    .finally(() => {
                        setIsLoading(false);
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
