import { animate, PanInfo, useMotionValue } from 'framer-motion';
import React, {
    CSSProperties,
    FC,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { calcThreshold } from '../../utils/threshold';
import SwipeableAction, { SWIPEABLE_ACTION_WIDTH } from './swipeable-action/SwipeableAction';
import {
    StyledMotionSwipeableWrapper,
    StyledSwipeableWrapperContent,
} from './SwipeableWrapper.styles';

export type SwipeableActionItem = {
    action: VoidFunction;
    backgroundColor: CSSProperties['backgroundColor'];
    color: CSSProperties['color'];
    text?: ReactNode;
    icon: ReactNode;
    key: string;
};

export type SwipeableWrapperProps = {
    /**
     * The content of the Swipeable item.
     */
    children: ReactNode;
    /**
     * The left-side actions, ordered from the left to the right.
     */
    leftActions?: SwipeableActionItem[];
    /**
     * The right-side actions, ordered from left to the right.
     */
    rightActions?: SwipeableActionItem[];
};

const SwipeableWrapper: FC<SwipeableWrapperProps> = ({
    children,
    leftActions = [],
    rightActions = [],
}) => {
    const [leftThreshold, setLeftThreshold] = useState(
        calcThreshold({
            actionCount: leftActions.length,
            direction: 'left',
            width: window.innerWidth,
        })
    );

    const [rightThreshold, setRightThreshold] = useState(
        calcThreshold({
            actionCount: rightActions.length,
            direction: 'right',
            width: window.innerWidth,
        })
    );

    const swipeableWrapperRef = useRef<HTMLDivElement | null>(null);

    const listItemXOffset = useMotionValue(0);

    const close = useCallback(() => {
        animate(listItemXOffset, 0);
    }, [listItemXOffset]);

    const open = useCallback(
        (direction: 'left' | 'right') => {
            switch (direction) {
                case 'left':
                    animate(listItemXOffset, SWIPEABLE_ACTION_WIDTH * leftActions.length);
                    break;
                case 'right':
                    animate(listItemXOffset, -SWIPEABLE_ACTION_WIDTH * rightActions.length);
                    break;
                default:
                    break;
            }
        },
        [leftActions.length, listItemXOffset, rightActions.length]
    );

    useEffect(() => {
        const width = swipeableWrapperRef.current?.parentElement?.offsetWidth;

        // This check was deliberately chosen because a width of 0 is also not permitted.
        if (width) {
            setLeftThreshold(
                calcThreshold({
                    actionCount: leftActions.length,
                    direction: 'left',
                    width,
                })
            );

            setRightThreshold(
                calcThreshold({
                    actionCount: rightActions.length,
                    direction: 'right',
                    width,
                })
            );
        }
    }, [leftActions.length, rightActions.length]);

    // Close an opened menu when anything outside it is tapped
    useEffect(() => {
        function closeCallback(event: MouseEvent | TouchEvent) {
            const eventTarget = event.target;

            // @ts-expect-error: Pretty sure that the event target is always a Node.
            if (eventTarget && !swipeableWrapperRef.current?.contains(eventTarget)) {
                close();
            }
        }

        document.addEventListener('mousedown', closeCallback);
        document.addEventListener('touchstart', closeCallback);

        return () => {
            document.removeEventListener('mousedown', closeCallback);
            document.removeEventListener('touchstart', closeCallback);
        };
    }, [close]);

    // Vibrate when the threshold is passed
    useEffect(
        () =>
            listItemXOffset.onChange((newValue: number) => {
                const previous = listItemXOffset.getPrevious();

                const hasCrossedLeftThreshold =
                    (previous < leftThreshold && newValue >= leftThreshold) ||
                    (previous > leftThreshold && newValue <= leftThreshold);

                const hasCrossedRightThreshold =
                    (previous < rightThreshold && newValue >= rightThreshold) ||
                    (previous > rightThreshold && newValue <= rightThreshold);

                if (hasCrossedLeftThreshold || hasCrossedRightThreshold) {
                    // @ts-expect-error: No chayns typings given.
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                    chayns?.vibrate([150], 6);
                }
            }),
        [leftThreshold, listItemXOffset, rightThreshold]
    );

    const handlePan = useCallback(
        (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
            const currentXOffset = listItemXOffset.get();

            const dampingFactor =
                (info.offset.x > 0 && leftActions.length > 0) ||
                (info.offset.x < 0 && rightActions.length > 0) ||
                (currentXOffset > 0 && info.delta.x < 0) ||
                (currentXOffset < 0 && info.delta.x > 0)
                    ? 1
                    : 0.75 / (Math.abs(info.offset.x) / 9);

            if (Math.abs(info.offset.x) > 30 || currentXOffset > 0) {
                listItemXOffset.set(currentXOffset + info.delta.x * dampingFactor);
            }
        },
        [leftActions.length, listItemXOffset, rightActions.length]
    );

    const handlePanEnd = useCallback(() => {
        const offset = listItemXOffset.get();

        if (offset > leftThreshold) {
            leftActions[0]?.action();
            close();
        } else if (offset < rightThreshold) {
            rightActions[rightActions.length - 1]?.action();
            close();
        } else {
            let state: 'left-open' | 'right-open' | 'closed';

            if (offset > 2) {
                state = 'left-open';
            } else if (offset < -2) {
                state = 'right-open';
            } else {
                state = 'closed';
            }

            // eslint-disable-next-line default-case
            switch (state) {
                case 'left-open':
                    if (offset < SWIPEABLE_ACTION_WIDTH) {
                        close();
                    } else {
                        open('left');
                    }
                    break;
                case 'right-open':
                    if (offset > -SWIPEABLE_ACTION_WIDTH) {
                        close();
                    } else {
                        open('right');
                    }
                    break;
                case 'closed':
                    if (offset > SWIPEABLE_ACTION_WIDTH) {
                        open('left');
                    } else if (offset < -SWIPEABLE_ACTION_WIDTH) {
                        open('right');
                    } else {
                        close();
                    }
            }
        }
    }, [close, leftActions, leftThreshold, listItemXOffset, open, rightActions, rightThreshold]);

    const leftActionElements = useMemo(
        () =>
            Array.from(leftActions)
                .reverse()
                .map((item, index) => (
                    <SwipeableAction
                        activationThreshold={leftThreshold}
                        close={close}
                        index={index}
                        item={item}
                        key={item.key}
                        listItemXOffset={listItemXOffset}
                        position="left"
                        totalActionCount={leftActions.length}
                    />
                )),
        [close, leftActions, leftThreshold, listItemXOffset]
    );

    const rightActionElements = useMemo(
        () =>
            rightActions.map((item, index) => (
                <SwipeableAction
                    activationThreshold={rightThreshold}
                    close={close}
                    index={index}
                    item={item}
                    key={item.key}
                    listItemXOffset={listItemXOffset}
                    position="right"
                    totalActionCount={rightActions.length}
                />
            )),
        [close, rightActions, rightThreshold, listItemXOffset]
    );

    return (
        <StyledMotionSwipeableWrapper
            onPan={handlePan}
            onPanEnd={handlePanEnd}
            ref={swipeableWrapperRef}
            style={{ x: listItemXOffset }}
        >
            {leftActionElements}
            <StyledSwipeableWrapperContent>{children}</StyledSwipeableWrapperContent>
            {rightActionElements}
        </StyledMotionSwipeableWrapper>
    );
};

SwipeableWrapper.displayName = 'SwipeableWrapper';

export default SwipeableWrapper;
