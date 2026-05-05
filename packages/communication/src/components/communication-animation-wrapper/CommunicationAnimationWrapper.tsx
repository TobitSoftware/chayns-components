import React, { FC, useCallback, useMemo, useState } from 'react';
import {
    AnimationState,
    CommunicationAnimationWrapperProps,
} from './CommunicationAnimationWrapper.types';
import {
    CommunicationAnimationContext,
    ICommunicationAnimationContext,
} from './CommunicationAnimationWrapper.context';
import { StyledCommunicationAnimationWrapper } from './CommunicationAnimationWrapper.styles';

const CommunicationAnimationWrapper: FC<CommunicationAnimationWrapperProps> = ({
    children,
    transition = { duration: 0.25, ease: [0.2, 0.8, 0.2, 1], type: 'tween' },
}) => {
    const [animationState, setAnimationState] = useState<AnimationState>(AnimationState.IDLE);

    const handleOpen = useCallback(() => {
        setAnimationState(AnimationState.OPENING);

        window.setTimeout(() => {
            setAnimationState(AnimationState.OPEN);
        }, transition.duration);
    }, [transition.duration]);

    const handleClose = useCallback(() => {
        setAnimationState(AnimationState.CLOSING);

        window.setTimeout(() => {
            setAnimationState(AnimationState.IDLE);
        }, transition.duration);
    }, [transition.duration]);

    console.log('TEST', animationState);

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
            <StyledCommunicationAnimationWrapper>{children}</StyledCommunicationAnimationWrapper>
        </CommunicationAnimationContext.Provider>
    );
};

CommunicationAnimationWrapper.displayName = 'CommunicationAnimationWrapper';

export default CommunicationAnimationWrapper;
