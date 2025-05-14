import { Language } from 'chayns-api';
import { Deferred } from '../utils/deferred';

export interface TranslationProps {
    children: string;
    to?: Exclude<Language, Language.Unknown>;
    from?: Exclude<Language, Language.Unknown>;
}

export interface QueuedItem {
    text: string;
    to: string;
    from: string;
    deferred: Deferred<string>;
    ready: boolean;
}

export interface TranslationRequest {
    text: string;
    to: string;
    from: string;
    id: number;
    deferred: Deferred<string>;
}