import React, { FC } from 'react';
import {
    StyledSmallWaitCursor,
    StyledSmallWaitCursorBackground,
    StyledSmallWaitCursorWaitCursor,
} from './SmallWaitCursor.styles';

export type SmallWaitCursorProps = {
    shouldHideBackground?: boolean;
    /**
     * Specifies whether the wait cursor should be displayed.
     */
    shouldHideWaitCursor?: boolean;
};

const SmallWaitCursor: FC<SmallWaitCursorProps> = ({
    shouldHideBackground = false,
    shouldHideWaitCursor = false,
}) => (
    <StyledSmallWaitCursor $shouldShowWaitCursor={!shouldHideWaitCursor}>
        <StyledSmallWaitCursorWaitCursor />
        {!shouldHideBackground && <StyledSmallWaitCursorBackground />}
    </StyledSmallWaitCursor>
);

SmallWaitCursor.displayName = 'SmallWaitCursor';

export default SmallWaitCursor;
