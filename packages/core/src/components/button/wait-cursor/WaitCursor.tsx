import React, { FC } from 'react';
import {
    StyledWaitCursor,
    StyledWaitCursorBackground,
    StyledWaitCursorWaitCursor,
} from './WaitCursor.styles';

export type WaitCursorProps = {
    color: string;
    shouldHideBackground?: boolean;
    shouldHideWaitCursor?: boolean;
};

const WaitCursor: FC<WaitCursorProps> = ({
    color,
    shouldHideBackground = false,
    shouldHideWaitCursor = false,
}) => (
    <StyledWaitCursor $shouldShowWaitCursor={!shouldHideWaitCursor}>
        <StyledWaitCursorWaitCursor $color={color} />
        {!shouldHideBackground && <StyledWaitCursorBackground />}
    </StyledWaitCursor>
);

WaitCursor.displayName = 'WaitCursor';

export default WaitCursor;
