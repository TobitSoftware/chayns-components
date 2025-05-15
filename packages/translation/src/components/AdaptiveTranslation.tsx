import React from 'react';
import { useAdaptiveTranslation } from '../hooks/useAdaptiveTranslation';
import { TranslationProps } from '../types/translation';

const AdaptiveTranslation = ({
    children,
    to,
    from,
    tagName: TagName = 'span',
}: TranslationProps) => {
    const { text, isLoading, isFetching } = useAdaptiveTranslation(children, { from, to });

    return (
        <TagName
            className="notranslate"
            style={{
                // eslint-disable-next-line no-nested-ternary
                opacity: isLoading ? 0 : isFetching ? 0.5 : 1,
                transition: 'opacity 0.5s ease',
            }}
        >
            {text}
        </TagName>
    );
};
export default AdaptiveTranslation;
