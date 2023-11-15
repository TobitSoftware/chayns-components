import { MotionValue, useSpring, useTransform } from 'framer-motion';
import React, { FC, useEffect } from 'react';
import type { SwipeableActionItem } from '../SwipeableWrapper';
import { StyledMotionSwipeableAction, StyledSwipeableActionButton } from './SwipeableAction.styles';

export const SWIPEABLE_ACTION_WIDTH = 72;

export type SwipeableActionProps = {
    activationThreshold: number;
    close: VoidFunction;
    index: number;
    item: SwipeableActionItem;
    listItemXOffset: MotionValue<number>;
    position: 'left' | 'right';
    totalActionCount: number;
};

const SwipeableAction: FC<SwipeableActionProps> = ({
    activationThreshold,
    close,
    index,
    item,
    listItemXOffset,
    position,
    totalActionCount,
}) => {
    const handleButtonClick = () => {
        item.action();
        close();
    };

    /**
     * By default, the action sticks to the content of the swipeable item. This
     * makes it move outwards to reveal the inner items.
     */
    const actionOffset = useTransform(listItemXOffset, (newValue) => {
        const maxOffset = SWIPEABLE_ACTION_WIDTH * index;
        const fractionalOffset = (-newValue / totalActionCount) * index;

        switch (position) {
            case 'left':
                return Math.max(-maxOffset, fractionalOffset);
            case 'right':
                return Math.min(maxOffset, fractionalOffset);
            default:
                return 0;
        }
    });

    /**
     * Brings the item in again if past the threshold. Only relevant for
     * outermost items.
     */
    const actionOverlayOffset = useSpring(0, {
        bounce: 0,
    }) as MotionValue<number>;

    /**
     * Combines the two values above to create the correct X transform that has
     * to be applied to the action.
     */
    const actionX = useTransform<number, number>([actionOffset, actionOverlayOffset], ([x, y]) => {
        if (position === 'left') {
            return Math.min((x ?? 0) + (y ?? 0), 0);
        }

        return Math.max((x ?? 0) + (y ?? 0), 0);
    });

    // Animate to the middle after passing threshold if outermost item
    useEffect(() => {
        const isOuterMost = index === totalActionCount - 1;

        if (!isOuterMost) return undefined;

        return listItemXOffset.onChange((newValue) => {
            const lastValue = listItemXOffset.getPrevious();

            // eslint-disable-next-line default-case
            switch (position) {
                case 'left':
                    if (newValue > activationThreshold && lastValue <= activationThreshold) {
                        actionOverlayOffset.set(SWIPEABLE_ACTION_WIDTH * index);
                    } else if (newValue < activationThreshold && lastValue >= activationThreshold) {
                        actionOverlayOffset.set(0);
                    }
                    break;
                case 'right':
                    if (newValue < activationThreshold && lastValue >= activationThreshold) {
                        actionOverlayOffset.set(SWIPEABLE_ACTION_WIDTH * -1 * index);
                    } else if (newValue > activationThreshold && lastValue <= activationThreshold) {
                        actionOverlayOffset.set(0);
                    }
            }
        });
    }, [
        actionOverlayOffset,
        activationThreshold,
        index,
        listItemXOffset,
        position,
        totalActionCount,
    ]);

    return (
        <StyledMotionSwipeableAction
            backgroundColor={item.backgroundColor}
            position={position}
            style={{ x: actionX }}
        >
            <StyledSwipeableActionButton
                color={item.color}
                onClick={handleButtonClick}
                width={`${SWIPEABLE_ACTION_WIDTH}px`}
            >
                {item.icon}
                {item.text}
            </StyledSwipeableActionButton>
        </StyledMotionSwipeableAction>
    );
};

SwipeableAction.displayName = 'SwipeableAction';

export default SwipeableAction;
