import { isTobitEmployee } from '@chayns-components/core';
import React, {
    CSSProperties,
    FC,
    MouseEvent,
    ReactHTML,
    useCallback,
    type ReactElement,
} from 'react';
import { useTextstringValue } from '../../hooks/useTextstringValue';
import { selectLanguageToChange } from '../../utils/textstring';
import type { ITextstring, TextstringReplacement } from './types';

export type TextstringProps = {
    /**
     * The element that the text should be displayed in.
     */
    children?: ReactElement;
    /**
     * The class name of the HTML element that the text should be displayed in. Only used if `children` is not set.
     */
    childrenClassName?: string;
    /**
     * The styles of the HTML element that the text should be displayed in. Only used if `children` is not set.
     */
    childrenStyles?: CSSProperties;
    /**
     * The tag of the HTML element that the text should be displayed in. Only used if `children` is not set.
     */
    childrenTagName?: keyof ReactHTML;
    /**
     * Whether the textstring contains HTML elements and should be displayed as HTML.
     */
    isTextstringHTML?: boolean;
    /**
     * Replacement values for the textstring.
     */
    replacements?: TextstringReplacement;
    /**
     * The text that should be displayed.
     */
    textstring: ITextstring;
};

const Textstring: FC<TextstringProps> = ({
    children,
    childrenClassName,
    childrenStyles,
    childrenTagName,
    isTextstringHTML,
    replacements,
    textstring,
}) => {
    const text = useTextstringValue({ textstring, replacements });

    const handleClick = useCallback(
        ({ ctrlKey }: MouseEvent<HTMLElement>) => {
            if (ctrlKey) {
                void isTobitEmployee().then((inGroup) => {
                    if (inGroup) {
                        selectLanguageToChange({
                            textstringName: textstring.name,
                        });
                    }
                });
            }
        },
        [textstring.name],
    );

    if (children) {
        return React.cloneElement(
            children,
            {
                dangerouslySetInnerHTML: isTextstringHTML ? { __html: text } : undefined,
                onClick: handleClick,
            },
            isTextstringHTML ? undefined : text,
        );
    }

    // eslint-disable-next-line react/no-danger-with-children
    return React.createElement(
        childrenTagName || 'span',
        {
            dangerouslySetInnerHTML: isTextstringHTML ? { __html: text } : undefined,
            className: `${childrenClassName || ''} notranslate`.trim(),
            onClick: handleClick,
            style: childrenStyles,
        },
        isTextstringHTML ? undefined : text,
    );
};

Textstring.displayName = 'Textstring';

export default Textstring;
