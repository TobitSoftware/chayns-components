import React, { FC, useEffect, useMemo, useState } from 'react';
import {
    StyledTypewriter,
    StyledTypewriterPseudoText,
    StyledTypewriterText,
} from './Typewriter.styles';
import { getSubTextFromHTML } from './utils';

export type TypewriterProps = {
    /**
     * The text to type
     */
    children: string;
};

const Typewriter: FC<TypewriterProps> = ({ children }) => {
    const [shownCharCount, setShownCharCount] = useState(0);

    const shownText = useMemo(
        () => getSubTextFromHTML(children, shownCharCount),
        [children, shownCharCount]
    );

    useEffect(() => {
        setShownCharCount(0);

        const interval = window.setInterval(() => {
            setShownCharCount((prevState) => {
                const nextState = prevState + 1;

                if (nextState === children.length) {
                    window.clearInterval(interval);
                }

                return nextState;
            });
        }, 35);

        return () => {
            window.clearInterval(interval);
        };
    }, [children.length]);

    const isAnimatingText = shownCharCount !== children.length;

    return (
        <StyledTypewriter>
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
