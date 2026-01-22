// noinspection JSUnusedGlobalSymbols

import React, { FC } from 'react';
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
    /**
     * @description The color of the inner circle of the wait cursor.
     * @optional
     * @default undefined
     * @example <SmallWaitCursor color="#FF0000" />
     */
    color?: string;
    /**
     * @description Specifies whether the wait cursor should be displayed with a background.
     * @optional
     * @default false
     * @example <SmallWaitCursor shouldHideBackground />
     */
    shouldHideBackground?: boolean;
    /**
     * @description Specifies whether the wait cursor should be displayed.
     * @optional
     * @default false
     * @example <SmallWaitCursor shouldHideWaitCursor />
     */
    shouldHideWaitCursor?: boolean;
    /**
     * @description The size of the wait cursor in pixels. Use the SmallWaitCursorSize enum for this prop or a custom value in pixels.
     * @optional
     * @default SmallWaitCursorSize.Medium
     * @example <SmallWaitCursor size={SmallWaitCursorSize.Small} />
     */
    size?: SmallWaitCursorSize | number;
    /**
     * @description The speed of the animation in seconds. Use the SmallWaitCursorSpeed enum for this prop.
     * @optional
     * @default SmallWaitCursorSpeed.Medium
     * @example <SmallWaitCursor speed={SmallWaitCursorSpeed.Fast} />
     */
    speed?: SmallWaitCursorSpeed;
};

const SmallWaitCursor: FC<SmallWaitCursorProps> = ({
    shouldHideBackground = false,
    shouldHideWaitCursor = false,
    size = SmallWaitCursorSize.Medium,
    speed = SmallWaitCursorSpeed.Medium,
    color,
}) => (
    <StyledSmallWaitCursor $shouldShowWaitCursor={!shouldHideWaitCursor} $size={size}>
        <StyledSmallWaitCursorWaitCursor
            $shouldHideBackground={shouldHideBackground}
            $size={size}
            $speed={speed}
            $color={color}
        />
        {!shouldHideBackground && <StyledSmallWaitCursorBackground />}
    </StyledSmallWaitCursor>
);

SmallWaitCursor.displayName = 'SmallWaitCursor';

export default SmallWaitCursor;
