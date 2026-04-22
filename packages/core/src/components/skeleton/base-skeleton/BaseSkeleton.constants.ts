import { Transition } from 'motion';

export const PULSE_ANIMATION = {
    opacity: [0.06, 0.18, 0.06],
};

export const PULSE_TRANSITION: Transition = {
    duration: 2.4,
    repeat: Infinity,
    repeatType: 'loop',
    ease: 'linear',
};

export const SHIMMER_ANIMATION = {
    x: ['-100%', '100%'],
};

export const SHIMMER_TRANSITION: Transition = {
    duration: 2.4,
    repeat: Infinity,
    repeatType: 'loop',
    ease: 'linear',
};
