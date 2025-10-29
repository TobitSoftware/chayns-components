import { TranslationRequest } from '../components/adaptive-translation/AdaptiveTranslation.types';
import { TRANSLATION_API_URL } from '../components/adaptive-translation/AdaptiveTranslation.constants';

export const fetchTranslations = async (textList: TranslationRequest[]): Promise<string[]> => {
    const response = await fetch(TRANSLATION_API_URL, {
        method: 'POST',
        body: JSON.stringify(textList, (key, value: string | number) =>
            key === 'deferred' ? undefined : value,
        ),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return (await response.json()) as string[];
};
