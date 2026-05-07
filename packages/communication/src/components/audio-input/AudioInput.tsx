import React, { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';
import { Icon } from '@chayns-components/core';
import { AnimatePresence } from 'motion/react';
import { AudioInputPosition, AudioInputProps, AudioInputRef } from './AudioInput.types';
import { StyledMotionAudioInput, StyledMotionAudioInputIconWrapper } from './AudioInput.styles';
import { useAudioInput } from './AudioInput.hooks';
import WaveForm from './wave-form/WaveForm';
import { AUDIO_INPUT_ANIMATION } from './AudioInput.constants';
import { CommunicationInputSize } from '../communication-input/CommunicationInput.types';

const AudioInput = forwardRef<AudioInputRef, AudioInputProps>(
    (
        {
            onError,
            isMuted = false,
            onMuteChange,
            onStop,
            onStart,
            styleConfig,
            position = AudioInputPosition.RIGHT,
            size = CommunicationInputSize.MEDIUM,
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

        const sizes = useMemo(
            () => ({
                iconSize: size === CommunicationInputSize.MEDIUM ? 18 : 16,
                size: size === CommunicationInputSize.MEDIUM ? 52 : 42,
            }),
            [size],
        );

        return (
            <StyledMotionAudioInput
                $backgroundColor={backgroundColor}
                $position={position}
                $size={size}
                animate={{
                    width: isExpanded ? '100%' : sizes.size,
                }}
                transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1], type: 'tween' }}
            >
                <StyledMotionAudioInputIconWrapper onClick={handleMainButtonClick}>
                    <Icon
                        icons={isMuted ? ['fa fa-microphone', 'fa fa-slash'] : ['fa fa-microphone']}
                        size={sizes.iconSize}
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
                            <Icon icons={['fa fa-xmark']} size={sizes.iconSize} color={color} />
                        </StyledMotionAudioInputIconWrapper>
                    )}
                </AnimatePresence>
            </StyledMotionAudioInput>
        );
    },
);

AudioInput.displayName = 'AudioInput';

export default AudioInput;
