import throttle from 'lodash.throttle';
import { BATCH_SIZE_LIMIT, MAX_ITEMS_PER_BATCH, TRANSLATION_API_URL } from '../constants/constants';
import { Deferred } from '../utils/deferred';
import { QueuedItem, TranslationRequest } from '../types/translation';

let translationQueue: QueuedItem[] = [];
const translatedTexts: { translated: string; original: string; to: string; from: string }[] = [];

export const fetchTranslations = async (textList: TranslationRequest[]): Promise<void> => {
    const response = await fetch(TRANSLATION_API_URL, {
        method: 'POST',
        body: JSON.stringify(textList, (key, value: string | number) =>
            key === 'deferred' ? undefined : value,
        ),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let json: string[];
    try {
        json = (await response.json()) as string[];
    } catch (error) {
        textList.forEach(({ deferred }) => {
            deferred.reject(error);
        });
        return;
    }
    const translatedItems = json.map((item, index) => ({
        translated: item,
        original: textList[index]!.text,
        to: textList[index]!.to,
        from: textList[index]!.from,
    }));
    translatedItems.forEach(({ translated, original, to, from }) => {
        translatedTexts.push({ translated, original, to, from });
        const queuedItem = textList.find(
            (item) => item.text === original && item.to === to && item.from === from,
        );
        if (queuedItem) {
            queuedItem.deferred.resolve(translated);
        }
    });
};

export const processTranslationQueue = throttle(
    async () => {
        let totalLength = 0;
        let batch: TranslationRequest[] = [];

        translationQueue = translationQueue.filter((item) => !item.ready);
        for (; translationQueue.length > 0; ) {
            const { text, deferred, to, from } = translationQueue.shift()!;

            totalLength += text.length;
            batch.push({
                text,
                to,
                from,
                id: batch.length,
                deferred,
            });

            if (totalLength > BATCH_SIZE_LIMIT || batch.length >= MAX_ITEMS_PER_BATCH) {
                // eslint-disable-next-line no-await-in-loop
                await fetchTranslations(batch);
                batch = [];
                totalLength = 0;
            }
        }

        if (batch.length > 0) {
            await fetchTranslations(batch);
        }
    },
    1000,
    { leading: false },
);

export const translateText = (text: string, to: string, from: string): Promise<string> => {
    const cachedTranslation = translatedTexts.find(
        (item) => item.original === text && item.to === to && item.from === from,
    );
    if (cachedTranslation) return Promise.resolve(cachedTranslation.translated);
    const existingItem = translationQueue.find(
        (item) => item.text === text && item.to === to && item.from,
    );
    if (existingItem) return existingItem.deferred.promise;

    const deferred = new Deferred<string>();
    translationQueue.push({ text, deferred, ready: false, to, from });
    void processTranslationQueue();
    return deferred.promise;
};
