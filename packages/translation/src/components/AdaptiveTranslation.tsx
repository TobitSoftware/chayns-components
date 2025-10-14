import React, { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import { useAdaptiveTranslation } from '../hooks/useAdaptiveTranslation';
import { Language } from 'chayns-api';

type TranslationChildren = ((text: string) => ReactNode) | string;

type AdaptiveTranslationProps = {
    /**
     * The Text that should be translated.
     */
    children: TranslationChildren;
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
     * The text that should be translated. Only active if the children is type of function.
     */
    text?: string;
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
    text = '',
}: AdaptiveTranslationProps) => {
    const {
        text: translated,
        isLoading,
        isFetching,
    } = useAdaptiveTranslation(typeof children === 'function' ? text : children, {
        from,
        to,
        textType,
    });

    // eslint-disable-next-line no-nested-ternary
    const opacity = isLoading ? 0 : isFetching ? 0.5 : 1;

    return (
        <TagName
            className={clsx('notranslate', className)}
            style={{
                opacity,
                transition: 'opacity 0.5s ease',
                ...style,
            }}
        >
            {typeof children === 'function' ? children(translated) : translated}
        </TagName>
    );
};
export default AdaptiveTranslation;
