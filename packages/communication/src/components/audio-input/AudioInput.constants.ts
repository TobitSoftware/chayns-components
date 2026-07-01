import { Transition, TargetAndTransition } from 'motion/react';

export const AUDIO_INPUT_ANIMATION_DELAY = 0.32;
export const AUDIO_INPUT_ANIMATION_DURATION = 0.25;

interface AudioInputAnimation {
    animate: TargetAndTransition;
    initial: TargetAndTransition;
    exit: TargetAndTransition;
    transition: Transition;
}

export const AUDIO_INPUT_ANIMATION: AudioInputAnimation = {
    animate: { opacity: 1 },
    initial: { opacity: 0 },
    exit: { opacity: 0, transition: { duration: 0 } },
    transition: {
        delay: AUDIO_INPUT_ANIMATION_DELAY,
        duration: AUDIO_INPUT_ANIMATION_DURATION,
        ease: [0.2, 0.8, 0.2, 1],
        type: 'tween',
    },
};
