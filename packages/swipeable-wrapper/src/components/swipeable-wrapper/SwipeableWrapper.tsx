import React, { FC, ReactNode } from 'react';
import {
    StyledMotionSwipeableWrapper,
    StyledSwipeableWrapperContent,
} from './SwipeableWrapper.styles';

export type SwipeableAction = {
    action: VoidFunction;
    color: string;
    text?: ReactNode;
    icon: ReactNode;
};

export type SwipeableWrapperProps = {
    /**
     * The content of the Swipeable item.
     */
    children: ReactNode;
    /**
     * The left-side actions, ordered from the left to the right.
     */
    leftActions?: SwipeableAction[];

    /**
     * The right-side actions, ordered from left to the right.
     */
    rightActions?: SwipeableAction[];
};

export const SwipeableWrapper: FC<SwipeableWrapperProps> = ({
    children,
    leftActions = [],
    rightActions = [],
}) => (
    <StyledMotionSwipeableWrapper>
        <StyledSwipeableWrapperContent>{children}</StyledSwipeableWrapperContent>
    </StyledMotionSwipeableWrapper>
);

SwipeableWrapper.displayName = 'SwipeableWrapper';

export default SwipeableWrapper;
