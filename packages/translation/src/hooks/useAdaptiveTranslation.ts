import { useContext, useEffect, useMemo, useState } from 'react';
import { Language } from 'chayns-api';
import { TranslationOptionsContext } from '../constants/translationOptionsContext';
import translationHandler from '../utils/translationHandler';

interface UseAdaptiveTranslationOptions {
    /**
     * The language from which the text should be translated.
     */
    from?: Exclude<Language, Language.Unknown>;
    /**
     * The type of the text.
     */
    textType?: string;
    /**
     * The language to which the text should be translated.
     */
    to?: Exclude<Language, Language.Unknown>;
}

export const useAdaptiveTranslation = (
    originalText: string,
    { to, from, textType }: UseAdaptiveTranslationOptions = {},
): { text: string; isLoading: boolean; isFetching: boolean } => {
    const options = useContext(TranslationOptionsContext);
    const toLanguage = to || options.to;
    const fromLanguage = from || options.from;
    const shouldTranslate = useMemo(
        () => toLanguage !== fromLanguage && originalText.length !== 0,
        [fromLanguage, originalText.length, toLanguage],
    );
    const [translatedText, setTranslatedText] = useState<string>(originalText);
    const [isLoading, setIsLoading] = useState(shouldTranslate);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const timeoutRef = setTimeout(() => {
            if (shouldTranslate) {
                setIsFetching(true);
                void translationHandler
                    .translateText(originalText, fromLanguage, toLanguage, textType)
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
    }, [originalText, shouldTranslate, toLanguage, fromLanguage, textType]);

    return useMemo(
        () => ({
            text: shouldTranslate ? translatedText : originalText,
            isFetching: shouldTranslate ? isFetching : false,
            isLoading: shouldTranslate ? isLoading : false,
        }),
        [isFetching, isLoading, originalText, shouldTranslate, translatedText],
    );
};
