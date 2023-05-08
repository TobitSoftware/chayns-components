import React, { FC, useMemo } from 'react';
import {
    StyledSmallWaitCursor,
    StyledSmallWaitCursorBackground,
    StyledSmallWaitCursorWaitCursor,
} from './SmallWaitCursor.styles';

// noinspection JSUnusedGlobalSymbols
export enum SmallWaitCursorSpeed {
    Slow = 1.5,
    Medium = 1,
    Fast = 0.5,
}

export type SmallWaitCursorProps = {
    /**
     * Specifies whether the wait cursor should be displayed with a background.
     */
    shouldShowBackground?: boolean;
    /**
     * Specifies whether the wait cursor should be displayed.
     */
    shouldShowWaitCursor: boolean;
    /**
     * The speed of the animation in seconds. Use the SmallWaitCursorSpeed enum for this prop.
     */
    speed?: SmallWaitCursorSpeed;
};

const SmallWaitCursor: FC<SmallWaitCursorProps> = ({
    shouldShowWaitCursor,
    shouldShowBackground = true,
    speed = SmallWaitCursorSpeed.Medium,
}) =>
    useMemo(
        () => (
            <StyledSmallWaitCursor shouldShowWaitCursor={shouldShowWaitCursor}>
                <StyledSmallWaitCursorWaitCursor speed={speed} />
                {shouldShowBackground && <StyledSmallWaitCursorBackground />}
            </StyledSmallWaitCursor>
        ),
        [shouldShowBackground, shouldShowWaitCursor, speed]
    );

SmallWaitCursor.displayName = 'SmallWaitCursor';

export default SmallWaitCursor;
