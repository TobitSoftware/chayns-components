import React, { FC, useCallback, useMemo } from 'react';
import { CSSPropertiesWithVars } from 'styled-components/dist/types';
import { StyledTypewriterText } from './Typewriter.styles';

type AnimatedTypewriterTextProps = {
    shouldHideCursor: boolean;
    shownText: string;
    textStyle?: CSSPropertiesWithVars;
    shouldRemainSingleLine: boolean;
};

const AnimatedTypewriterText: FC<AnimatedTypewriterTextProps> = ({
    shouldHideCursor,
    shownText,
    shouldRemainSingleLine,
    textStyle,
}) => {
    const updateTypewriterCursor = useCallback(
        (ref: HTMLSpanElement | null) => {
            if (ref && !shouldHideCursor) {
                // Finds the last text node with content.
                const traverseNodes = (node: Node): HTMLElement | null => {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
                        return node.parentElement;
                    }

                    const childNodes = Array.from(node.childNodes);
                    for (let i = childNodes.length - 1; i >= 0; i--) {
                        const result = traverseNodes(childNodes[i] as Node);
                        if (result) {
                            return result;
                        }
                    }

                    return null;
                };

                const lastParentWithContent = traverseNodes(ref);

                // Removes the cursor marker from the previous render.
                ref.classList.remove('typewriter-lastWithContent');
                ref.querySelectorAll('.typewriter-lastWithContent').forEach((element) => {
                    element.classList.remove('typewriter-lastWithContent');
                });

                // Adds the cursor marker to the last element that still contains text.
                if (lastParentWithContent) {
                    lastParentWithContent.classList.add('typewriter-lastWithContent');
                } else {
                    ref.classList.add('typewriter-lastWithContent');
                }
            }
        },
        [shouldHideCursor],
    );

    return useMemo(
        () => (
            <StyledTypewriterText
                ref={(ref) => updateTypewriterCursor(ref)}
                dangerouslySetInnerHTML={{ __html: shownText }}
                $shouldRemainSingleLine={shouldRemainSingleLine}
                style={textStyle}
                $isAnimatingText
            />
        ),
        [shownText, shouldRemainSingleLine, textStyle, updateTypewriterCursor],
    );
};

export default AnimatedTypewriterText;
