import { Deferred } from '../utils/deferred';

interface BaseTranslation {
    text: string;
    to: string;
    from: string;
    textType?: string;
}

export interface QueuedItem extends BaseTranslation {
    deferred: Deferred<string>;
}

export interface TranslationBatchItem extends TranslationRequest {
    deferred: Deferred<string>;
}

export interface TranslationRequest extends BaseTranslation {
    id: number;
}
