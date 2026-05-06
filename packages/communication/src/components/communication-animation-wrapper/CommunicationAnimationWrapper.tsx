import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import {
    AnimationState,
    CommunicationAnimationWrapperProps,
} from './CommunicationAnimationWrapper.types';
import {
    CommunicationAnimationContext,
    ICommunicationAnimationContext,
} from './CommunicationAnimationWrapper.context';
import { StyledMotionCommunicationAnimationWrapper } from './CommunicationAnimationWrapper.styles';

const CommunicationAnimationWrapper: FC<CommunicationAnimationWrapperProps> = ({
    children,
    gap = 16,
    transition = { duration: 0.25, ease: [0.2, 0.8, 0.2, 1], type: 'tween' },
}) => {
    const timeoutRef = useRef<number | undefined>(undefined);
    const [animationState, setAnimationState] = useState<AnimationState>(AnimationState.IDLE);

    const clearAnimationTimeout = useCallback(() => {
        if (timeoutRef.current !== undefined) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = undefined;
        }
    }, []);

    const finishAfterTransition = useCallback(
        (state: AnimationState) => {
            clearAnimationTimeout();

            timeoutRef.current = window.setTimeout(
                () => {
                    setAnimationState(state);
                    timeoutRef.current = undefined;
                },
                (transition.duration ?? 0) * 1000,
            );
        },
        [clearAnimationTimeout, transition.duration],
    );

    const handleOpen = useCallback(() => {
        setAnimationState(AnimationState.OPENING);
        finishAfterTransition(AnimationState.OPEN);
    }, [finishAfterTransition]);

    const handleClose = useCallback(() => {
        setAnimationState(AnimationState.CLOSING);
        finishAfterTransition(AnimationState.IDLE);
    }, [finishAfterTransition]);

    const isOpen =
        animationState === AnimationState.OPENING || animationState === AnimationState.OPEN;

    const value: ICommunicationAnimationContext = useMemo(
        () => ({
            transition,
            open: handleOpen,
            close: handleClose,
            state: animationState,
        }),
        [animationState, handleClose, handleOpen, transition],
    );

    return (
        <CommunicationAnimationContext.Provider value={value}>
            <StyledMotionCommunicationAnimationWrapper
                animate={{
                    gridTemplateColumns: isOpen ? '0px minmax(0, 1fr)' : `minmax(0, 1fr) ${52}px`,
                    columnGap: isOpen ? 0 : gap,
                }}
                initial={false}
                transition={transition}
            >
                {children}
            </StyledMotionCommunicationAnimationWrapper>
        </CommunicationAnimationContext.Provider>
    );
};

CommunicationAnimationWrapper.displayName = 'CommunicationAnimationWrapper';

export default CommunicationAnimationWrapper;
