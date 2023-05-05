import React, { FC, useMemo } from 'react';
import {
    StyledSmallWaitCursor,
    StyledSmallWaitCursorBackground,
    StyledSmallWaitCursorWaitCursor,
} from './SmallWaitCursor.styles';

export type SmallWaitCursorProps = {
    /**
     * Specifies whether the wait cursor should be displayed with a background
     */
    shouldShowBackground: boolean;
    /**
     * Specifies whether the wait cursor should be displayed
     */
    shouldShowWaitCursor: boolean;
};

const SmallWaitCursor: FC<SmallWaitCursorProps> = ({
    shouldShowWaitCursor,
    shouldShowBackground,
}) =>
    useMemo(
        () => (
            <StyledSmallWaitCursor shouldShowWaitCursor={shouldShowWaitCursor}>
                <StyledSmallWaitCursorWaitCursor />
                {shouldShowBackground && <StyledSmallWaitCursorBackground />}
            </StyledSmallWaitCursor>
        ),
        [shouldShowBackground, shouldShowWaitCursor]
    );

SmallWaitCursor.displayName = 'SmallWaitCursor';

export default SmallWaitCursor;
