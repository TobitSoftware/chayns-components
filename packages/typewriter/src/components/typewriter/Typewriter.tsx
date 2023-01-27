import React, { FC, useEffect, useMemo, useState } from 'react';
import {
    StyledTypewriter,
    StyledTypewriterPseudoText,
    StyledTypewriterText,
} from './Typewriter.styles';
import { getTextByCharCount } from './utils';

export type TypewriterProps = {
    /**
     * The text to type
     */
    children: string;
};

const Typewriter: FC<TypewriterProps> = ({ children }) => {
    const [shownCharCount, setShownCharCount] = useState(0);

    const shownText = useMemo(
        () => getTextByCharCount({ charCount: shownCharCount, fullText: children }),
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
        }, 25);

        return () => {
            window.clearInterval(interval);
        };
    }, [children.length]);

    const isAnimatingText = shownCharCount !== children.length;

    return (
        <StyledTypewriter>
            <StyledTypewriterText shouldUseAbsolutePosition={isAnimatingText}>
                {shownText}
            </StyledTypewriterText>
            {isAnimatingText && <StyledTypewriterPseudoText>{children}</StyledTypewriterPseudoText>}
        </StyledTypewriter>
    );
};

Typewriter.displayName = 'Typewriter';

export default Typewriter;
