import React, { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { renderToString } from 'react-dom/server';
import {
    StyledTypewriter,
    StyledTypewriterPseudoText,
    StyledTypewriterText,
} from './Typewriter.styles';
import { getCharactersCount, getSubTextFromHTML } from './utils';

export enum TypewriterSpeed {
    Slow = 40,
    Medium = 30,
    Fast = 20,
}

export type TypewriterProps = {
    /**
     * The text to type
     */
    children: ReactElement | string;
    speed?: TypewriterSpeed;
};

const Typewriter: FC<TypewriterProps> = ({ children, speed = TypewriterSpeed.Medium }) => {
    const [shownCharCount, setShownCharCount] = useState(0);
    const [shouldStopAnimation, setShouldStopAnimation] = useState(false);

    const textContent = React.isValidElement(children) ? renderToString(children) : children;

    const charactersCount = useMemo(() => getCharactersCount(textContent), [textContent]);

    const isAnimatingText = shownCharCount !== textContent.length;

    const handleClick = useCallback(() => {
        setShouldStopAnimation(true);
    }, []);

    useEffect(() => {
        let interval: number | undefined;

        if (shouldStopAnimation) {
            setShownCharCount(textContent.length);
        } else {
            setShownCharCount(0);

            interval = window.setInterval(() => {
                setShownCharCount((prevState) => {
                    let nextState = prevState + 1;

                    if (nextState === charactersCount) {
                        window.clearInterval(interval);

                        /**
                         * At this point, the next value for "shownCharCount" is deliberately set to
                         * the length of the textContent in order to correctly display HTML elements
                         * after the last letter.
                         */
                        nextState = textContent.length;
                    }

                    return nextState;
                });
            }, speed);
        }

        return () => {
            window.clearInterval(interval);
        };
    }, [shouldStopAnimation, speed, textContent.length, charactersCount]);

    const shownText = useMemo(
        () => getSubTextFromHTML(textContent, shownCharCount),
        [shownCharCount, textContent]
    );

    return (
        <StyledTypewriter onClick={handleClick}>
            <StyledTypewriterText
                dangerouslySetInnerHTML={{ __html: shownText }}
                isAnimatingText={isAnimatingText}
            />
            {isAnimatingText && <StyledTypewriterPseudoText>{children}</StyledTypewriterPseudoText>}
        </StyledTypewriter>
    );
};

Typewriter.displayName = 'Typewriter';

export default Typewriter;
