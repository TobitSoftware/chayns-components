import React, { FC, forwardRef, useImperativeHandle } from 'react';
import { AudioInputProps, AudioInputRef } from './AudioInput.types';
import { StyledMotionAudioInput } from './AudioInput.styles';
import { useAudioInput } from './AudioInput.hooks';
import { Icon } from '@chayns-components/core';

const AudioInput: FC<AudioInputProps> = forwardRef<AudioInputRef, AudioInputProps>(
    ({ onError, isMuted, onMuteChange, onStop, onStart }, ref) => {
        const { getStream, stop, start, isActive, canvasRef } = useAudioInput({
            isMuted,
            onMuteChange,
            onStop,
            onStart,
            onError,
        });

        useImperativeHandle(
            ref,
            () => ({
                start,
                stop,
                getStream,
            }),
            [start, stop, getStream],
        );

        return (
            <StyledMotionAudioInput>
                <Icon
                    icons={isMuted ? ['fa fa-microphone'] : ['fa fa-microphone', 'fa fa-slash']}
                    size={18}
                />
            </StyledMotionAudioInput>
        );
    },
);

AudioInput.displayName = 'AudioInput';

export default AudioInput;
