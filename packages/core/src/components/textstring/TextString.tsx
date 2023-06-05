import React, {
    createElement,
    FC,
    MouseEventHandler,
    ReactHTML,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
} from 'react';
import { selectLanguageToChange } from '../textstring-provider/library';
import { TextStringContext } from '../textstring-provider/TextStringProvider';
import { StyledTextString } from './TextString.styles';
import type { ITextstring, TextstringReplacement } from './types';

export type TextStringProps = {
    /**
     * The element that the text should be displayed in.
     */
    children?: ReactNode;
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
}) => {
    const textStrings = useContext(TextStringContext);

    const text = useMemo(() => {
        const value = textStrings[textString.name] ?? textString.fallback;

        if (!replacements) {
            return value;
        }

        let newValue = value;

        replacements.forEach(({ replacement, key }) => {
            newValue = newValue.replace(key, replacement);
        });

        return newValue;
    }, [replacements, textString, textStrings]);

    const childElement = useMemo(() => {
        let element = createElement('', null, children);

        if (!children) {
            element = createElement(childrenTagName || 'span', null, text);
        }

        return element;
    }, [children, childrenTagName, text]);

    const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            if (event.ctrlKey)
                selectLanguageToChange({
                    textstringName: textString.name,
                });
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
