import { Language } from 'chayns-api';
import React from 'react';
import { Deferred } from '../utils/deferred';

export interface TranslationProps {
    children: string;
    to?: Exclude<Language, Language.Unknown>;
    from?: Exclude<Language, Language.Unknown>;
    tagName?: keyof HTMLElementTagNameMap;
    style?: React.CSSProperties;
    className?: string;
}

interface BaseTranslation {
    text: string;
    to: string;
    from: string;
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
