import React, { FC } from 'react';
import {
    StyledWaitCursor,
    StyledWaitCursorBackground,
    StyledWaitCursorWaitCursor,
} from './WaitCursor.styles';

export type WaitCursorProps = {
    shouldHideBackground?: boolean;
    /**
     * Specifies whether the wait cursor should be displayed.
     */
    shouldHideWaitCursor?: boolean;
};

const WaitCursor: FC<WaitCursorProps> = ({
    shouldHideBackground = false,
    shouldHideWaitCursor = false,
}) => (
    <StyledWaitCursor $shouldShowWaitCursor={!shouldHideWaitCursor}>
        <StyledWaitCursorWaitCursor />
        {!shouldHideBackground && <StyledWaitCursorBackground />}
    </StyledWaitCursor>
);

WaitCursor.displayName = 'WaitCursor';

export default WaitCursor;
