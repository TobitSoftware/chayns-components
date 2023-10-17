import React, {
    createElement,
    CSSProperties,
    FC,
    MouseEventHandler,
    ReactHTML,
    ReactNode,
    useCallback,
    useMemo,
} from 'react';
import { StyledTextString } from './TextString.styles';
import type { ITextstring, TextstringReplacement } from './types';
import { isTobitEmployee } from '@chayns-components/core';
import { selectLanguageToChange } from '../../utils/textstring';
import { useTextstringValue } from '../../utils/getTextstringValue';

export type TextStringProps = {
    /**
     * The element that the text should be displayed in.
     */
    children?: ReactNode;
    /**
     * The styles of the HTML element that the text should be displayed in.
     */
    childrenStyles?: CSSProperties;
    /**
     * The tag of the HTML element that the text should be displayed in.
     */
    childrenTagName?: keyof ReactHTML;
    /**
     * A part of the text that should be replaced.
     */
    replacements?: TextstringReplacement[];
    /**
     * The text that should be displayed.
     */
    textString: ITextstring;
};

const TextString: FC<TextStringProps> = ({
    textString,
    replacements,
    childrenTagName,
    children,
    childrenStyles,
}) => {
    const text = useTextstringValue({ textString, replacements });

    const childElement = useMemo(() => {
        let element = createElement(
            '',
            childrenStyles ? { style: childrenStyles } : null,
            children
        );

        if (!children) {
            element = createElement(
                childrenTagName || 'span',
                childrenStyles ? { style: childrenStyles } : null,
                text
            );
        }

        return element;
    }, [children, childrenStyles, childrenTagName, text]);

    const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            if (event.ctrlKey) {
                void isTobitEmployee().then((inGroup) => {
                    if (inGroup) {
                        selectLanguageToChange({
                            textstringName: textString.name,
                        });
                    }
                });
            }
        },
        [textString.name]
    );

    return useMemo(
        () => <StyledTextString onClick={handleClick}>{childElement}</StyledTextString>,
        [childElement, handleClick]
    );
};

TextString.displayName = 'TextString';

export default TextString;
