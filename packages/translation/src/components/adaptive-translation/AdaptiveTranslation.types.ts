export class Deferred<T> {
    public promise: Promise<T>;

    public resolve!: (value: T) => void;

    public reject!: (reason?: unknown) => void;

    constructor() {
        this.promise = new Promise<T>((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

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
