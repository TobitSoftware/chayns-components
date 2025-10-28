import { TRANSLATION_API_URL } from '../../lib/types/constants/constants';
import { TranslationRequest } from '../../lib/types/types/translation';

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
