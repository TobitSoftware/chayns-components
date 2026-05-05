import { ReactElement } from 'react';
import CommunicationInput from '../communication-input/CommunicationInput';
import AudioInput from '../audio-input/AudioInput';
import { Transition } from 'motion/react';

export interface CommunicationAnimationWrapperProps {
    children: CommunicationAnimationWrapperChild | CommunicationAnimationWrapperChild[];
    transition?: Transition;
}

export type CommunicationAnimationWrapperChild =
    | ReactElement<typeof CommunicationInput>
    | ReactElement<typeof AudioInput>;

export enum AnimationState {
    IDLE = 'IDLE',
    OPENING = 'OPENING',
    OPEN = 'OPEN',
    CLOSING = 'CLOSING',
}
