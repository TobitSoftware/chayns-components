import { AnimationState } from './CommunicationAnimationWrapper.types';
import { createContext, useContext } from 'react';
import { Transition } from 'motion/react';

export interface ICommunicationAnimationContext {
    state: AnimationState;

    open?: VoidFunction;
    close?: VoidFunction;

    transition: Transition;
}

export const CommunicationAnimationContext = createContext<ICommunicationAnimationContext>({
    state: AnimationState.IDLE,

    open: undefined,
    close: undefined,

    transition: { duration: 0.25, ease: [0.2, 0.8, 0.2, 1], type: 'tween' },
});

CommunicationAnimationContext.displayName = 'CommunicationAnimationContext';

export const useCommunicationAnimationContext = () => useContext(CommunicationAnimationContext);
