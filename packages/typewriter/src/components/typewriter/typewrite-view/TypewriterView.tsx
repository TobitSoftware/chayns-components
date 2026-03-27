import React, { FC, ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { CSSPropertiesWithVars } from 'styled-components/dist/types';
import { CursorType } from '../../../types/cursor';
import AnimatedTypewriterText from './animated-typewriter-text/AnimatedTypewriterText';
import {
    StyledTypewriter,
    StyledTypewriterPseudoText,
    StyledTypewriterText,
} from './TypewriterView.styles';

export type TypewriterContent = ReactElement | string | Array<ReactElement | string>;

type TypewriterViewProps = {
    children: TypewriterContent;
    cursorType: CursorType;
    handleClick?: (event: React.MouseEvent) => void;
    hasRenderedChildrenOnce: boolean;
    isAnimatingText: boolean;
    pseudoTextHTML: string;
    shouldHideCursor: boolean;
    shouldPreventBlinkingCursor: boolean;
    shouldRemainSingleLine: boolean;
    shownText: string;
    textStyle?: CSSPropertiesWithVars;
};

const TypewriterView: FC<TypewriterViewProps> = ({
    children,
    cursorType,
    handleClick,
    hasRenderedChildrenOnce,
    isAnimatingText,
    pseudoTextHTML,
    shouldHideCursor,
    shouldPreventBlinkingCursor,
    shouldRemainSingleLine,
    shownText,
    textStyle,
}) => (
    <StyledTypewriter
        $cursorType={cursorType}
        onClick={handleClick}
        $isAnimatingText={isAnimatingText}
        $shouldHideCursor={shouldHideCursor}
        $shouldPreventBlinkAnimation={shouldPreventBlinkingCursor}
    >
        {isAnimatingText ? (
            <AnimatedTypewriterText
                shouldHideCursor={shouldHideCursor}
                shouldRemainSingleLine={shouldRemainSingleLine}
                shownText={shownText}
                textStyle={textStyle}
            />
        ) : (
            <StyledTypewriterText
                className="notranslate"
                $shouldRemainSingleLine={shouldRemainSingleLine}
                dangerouslySetInnerHTML={
                    typeof children === 'string' ? { __html: shownText } : undefined
                }
                style={textStyle}
            >
                {typeof children !== 'string' ? children : undefined}
            </StyledTypewriterText>
        )}
        {isAnimatingText && (
            <StyledTypewriterPseudoText
                $isAnimatingText={isAnimatingText}
                $shouldHideCursor={shouldHideCursor}
                dangerouslySetInnerHTML={{ __html: pseudoTextHTML }}
            />
        )}
        {/*
            The following is needed because some components like the CodeHighlighter will not render correct
            if the element is not rendered on a client before...
        */}
        {!hasRenderedChildrenOnce &&
            createPortal(
                <div style={{ position: 'absolute', visibility: 'hidden' }}>{children}</div>,
                document.body,
            )}
    </StyledTypewriter>
);

export default TypewriterView;
