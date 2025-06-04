import React from 'react';
import clsx from 'clsx';
import { useAdaptiveTranslation } from '../hooks/useAdaptiveTranslation';
import { TranslationProps } from '../types/translation';

const AdaptiveTranslation = ({
    children,
    to,
    from,
    tagName: TagName = 'span',
    style,
    className,
}: TranslationProps) => {
    const { text, isLoading, isFetching } = useAdaptiveTranslation(children, { from, to });

    return (
        <TagName
            className={clsx('notranslate', className)}
            style={{
                // eslint-disable-next-line no-nested-ternary
                opacity: isLoading ? 0 : isFetching ? 0.5 : 1,
                transition: 'opacity 0.5s ease',
                ...style,
            }}
        >
            {text}
        </TagName>
    );
};
export default AdaptiveTranslation;
