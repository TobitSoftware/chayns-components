import translationHandler from './utils/translationHandler';

export { useAdaptiveTranslation } from './hooks/useAdaptiveTranslation';
export { default as AdaptiveTranslation } from './components/AdaptiveTranslation';
export { default as TranslationOptionsProvider } from './components/TranslationOptionsProvider';
export const translateText = (text: string, from: string, to: string) =>
    translationHandler.translateText(text, from, to);
