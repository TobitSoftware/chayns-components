// noinspection JSUnusedGlobalSymbols

import React, { CSSProperties, FC } from 'react';
import {
    StyledSmallWaitCursor,
    StyledSmallWaitCursorBackground,
    StyledSmallWaitCursorWaitCursor,
} from './SmallWaitCursor.styles';

export enum SmallWaitCursorSize {
    Small = 16,
    Medium = 30,
}

export enum SmallWaitCursorSpeed {
    Slow = 1.5,
    Medium = 1,
    Fast = 0.5,
}

export type SmallWaitCursorProps = {
    color?: CSSProperties['color'];
    /**
     * Specifies whether the wait cursor should be displayed with a background.
     */
    shouldHideBackground?: boolean;
    /**
     * Specifies whether the wait cursor should be displayed.
     */
    shouldHideWaitCursor?: boolean;
    /**
     * The size of the wait cursor in pixels. Use the SmallWaitCursorSize enum for this prop.
     */
    size?: SmallWaitCursorSize;
    /**
     * The speed of the animation in seconds. Use the SmallWaitCursorSpeed enum for this prop.
     */
    speed?: SmallWaitCursorSpeed;
};

const SmallWaitCursor: FC<SmallWaitCursorProps> = ({
    color,
    shouldHideBackground = false,
    shouldHideWaitCursor = false,
    size = SmallWaitCursorSize.Medium,
    speed = SmallWaitCursorSpeed.Medium,
}) => (
    <StyledSmallWaitCursor shouldShowWaitCursor={!shouldHideBackground} size={size}>
        <StyledSmallWaitCursorWaitCursor
            color={color}
            shouldShowBackground={!shouldHideWaitCursor}
            size={size}
            speed={speed}
        />
        {!shouldHideWaitCursor && <StyledSmallWaitCursorBackground />}
    </StyledSmallWaitCursor>
);

SmallWaitCursor.displayName = 'SmallWaitCursor';

export default SmallWaitCursor;
