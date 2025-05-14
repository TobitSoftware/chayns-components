import React from 'react';
import { useAdaptiveTranslation } from '../hooks/useAdaptiveTranslation';
import { TranslationProps } from '../types/translation';

const Translation = ({ children, to, from }: TranslationProps) => {
    const { text, isLoading, isFetching } = useAdaptiveTranslation(children, { from, to });

    return (
        <span
            className="notranslate"
            style={{
                opacity: isLoading ? 0 : isFetching ? 0.5 : 1,
                transition: 'opacity 0.5s ease',
            }}
        >
            {text}
        </span>
    );
};
export default Translation;
