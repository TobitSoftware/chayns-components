import React, { FC, forwardRef, useCallback, useImperativeHandle } from 'react';
import { Icon } from '@chayns-components/core';
import { AnimatePresence } from 'motion/react';
import { AudioInputPosition, AudioInputProps, AudioInputRef } from './AudioInput.types';
import { StyledMotionAudioInput, StyledMotionAudioInputIconWrapper } from './AudioInput.styles';
import { useAudioInput } from './AudioInput.hooks';
import WaveForm from './wave-form/WaveForm';
import { AUDIO_INPUT_ANIMATION } from './AudioInput.constants';
import { useCommunicationAnimationContext } from '../communication-animation-wrapper/CommunicationAnimationWrapper.context';

const AudioInput: FC<AudioInputProps> = forwardRef<AudioInputRef, AudioInputProps>(
    (
        {
            onError,
            isMuted = false,
            onMuteChange,
            onStop,
            onStart,
            styleConfig,
            position = AudioInputPosition.RIGHT,
        },
        ref,
    ) => {
        const { backgroundColor = 'var(--chayns-color--primary)', color = 'white' } =
            styleConfig ?? {};

        const { getStream, stop, start, isActive, analyser } = useAudioInput({
            onError,
            onStart,
            onStop,
            isMuted,
        });

        const { transition } = useCommunicationAnimationContext();

        const isExpanded = isActive;

        useImperativeHandle(
            ref,
            () => ({
                start,
                stop,
                getStream,
            }),
            [start, stop, getStream],
        );

        const handleMainButtonClick = useCallback(() => {
            if (!isActive) {
                void start();

                return;
            }

            if (typeof onMuteChange === 'function') {
                onMuteChange(!isMuted);
            }
        }, [isActive, isMuted, onMuteChange, start]);

        return (
            <StyledMotionAudioInput
                $backgroundColor={backgroundColor}
                $position={position}
                animate={{
                    width: isExpanded ? '100%' : '52px',
                }}
                transition={
                    transition || { duration: 0.25, ease: [0.2, 0.8, 0.2, 1], type: 'tween' }
                }
            >
                <StyledMotionAudioInputIconWrapper onClick={handleMainButtonClick}>
                    <Icon
                        icons={isMuted ? ['fa fa-microphone', 'fa fa-slash'] : ['fa fa-microphone']}
                        size={18}
                        color={color}
                    />
                </StyledMotionAudioInputIconWrapper>

                <AnimatePresence initial={false}>
                    {isExpanded && <WaveForm key="waveform" analyser={analyser} color={color} />}

                    {isExpanded && (
                        <StyledMotionAudioInputIconWrapper
                            key="stop"
                            onClick={stop}
                            initial={AUDIO_INPUT_ANIMATION.initial}
                            animate={AUDIO_INPUT_ANIMATION.animate}
                            exit={AUDIO_INPUT_ANIMATION.exit}
                            transition={AUDIO_INPUT_ANIMATION.transition}
                        >
                            <Icon icons={['fa fa-xmark']} size={18} color={color} />
                        </StyledMotionAudioInputIconWrapper>
                    )}
                </AnimatePresence>
            </StyledMotionAudioInput>
        );
    },
);

AudioInput.displayName = 'AudioInput';

export default AudioInput;
