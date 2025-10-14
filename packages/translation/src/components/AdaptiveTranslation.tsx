import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import { useAdaptiveTranslation } from '../hooks/useAdaptiveTranslation';
import { Language } from 'chayns-api';

type AdaptiveTranslationProps = {
    /**
     * The Text that should be translated.
     */
    children: string;
    /**
     * The className of the element.
     */
    className?: string;
    /**
     * The language from which the text should be translated.
     */
    from?: Exclude<Language, Language.Unknown>;
    /**
     * Optional styles of the HTML element.
     */
    style?: CSSProperties;
    /**
     * The HTML tag of the children.
     */
    tagName?: keyof HTMLElementTagNameMap;
    /**
     * The type of the text.
     */
    textType?: string;
    /**
     * The language to which the text should be translated.
     */
    to?: Exclude<Language, Language.Unknown>;
};

const AdaptiveTranslation = ({
    children,
    to,
    from,
    tagName: TagName = 'span',
    style,
    className,
    textType,
}: AdaptiveTranslationProps) => {
    const { text, isLoading, isFetching } = useAdaptiveTranslation(children, {
        from,
        to,
        textType,
    });

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
