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
    shouldShowBackground?: boolean;
    /**
     * Specifies whether the wait cursor should be displayed.
     */
    shouldShowWaitCursor?: boolean;
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
    shouldShowWaitCursor = true, // TODO: Revert prop to hide wait cursor
    shouldShowBackground = true, // TODO: Revert prop to hide background
    size = SmallWaitCursorSize.Medium,
    speed = SmallWaitCursorSpeed.Medium,
}) => (
    <StyledSmallWaitCursor shouldShowWaitCursor={shouldShowWaitCursor} size={size}>
        <StyledSmallWaitCursorWaitCursor
            color={color}
            shouldShowBackground={shouldShowBackground}
            size={size}
            speed={speed}
        />
        {shouldShowBackground && <StyledSmallWaitCursorBackground />}
    </StyledSmallWaitCursor>
);

SmallWaitCursor.displayName = 'SmallWaitCursor';

export default SmallWaitCursor;
