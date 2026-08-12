import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { Icon, useFocusRingPortal, useKeyboardFocusHighlighting } from '@chayns-components/core';
import { AnimatePresence } from 'motion/react';
import { AudioInputPosition, AudioInputProps, AudioInputRef } from './AudioInput.types';
import { StyledMotionAudioInput, StyledMotionAudioInputIconWrapper } from './AudioInput.styles';
import { useAudioInput } from './AudioInput.hooks';
import WaveForm from './wave-form/WaveForm';
import { AUDIO_INPUT_ANIMATION } from './AudioInput.constants';
import { CommunicationInputSize } from '../communication-input/CommunicationInput.types';
import { TextStringProviderSSR, useTranslation } from '@chayns/textstrings';
import textStrings from '../../constants/textStrings';

const AudioInputContent = forwardRef<AudioInputRef, AudioInputProps>(
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
            shouldEnableKeyboardHighlighting,
        },
        ref,
    ) => {
        const { t } = useTranslation();
        const { backgroundColor = 'var(--chayns-color--primary)', color = 'white' } =
            styleConfig ?? {};

        const { getStream, stop, start, isActive, analyser } = useAudioInput({
            onError,
            onStart,
            onStop,
            isMuted,
        });

        const isExpanded = isActive;
        const canMute = isActive && typeof onMuteChange === 'function';
        const mainButtonRef = useRef<HTMLButtonElement>(null);
        const stopButtonRef = useRef<HTMLButtonElement>(null);
        const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
            shouldEnableKeyboardHighlighting,
        );

        useFocusRingPortal(mainButtonRef, {
            isEnabled: shouldShowKeyboardHighlighting && (!isActive || canMute),
            shape: 'circle',
            padding: 4,
        });
        useFocusRingPortal(stopButtonRef, {
            isEnabled: shouldShowKeyboardHighlighting && isExpanded,
            shape: 'circle',
            padding: 4,
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
                <StyledMotionAudioInputIconWrapper
                    aria-label={
                        isActive
                            ? t(textStrings.audioInput.accessibility.mute)
                            : t(textStrings.audioInput.accessibility.start)
                    }
                    onClick={handleMainButtonClick}
                    ref={mainButtonRef}
                    tabIndex={isActive && !canMute ? -1 : undefined}
                    type="button"
                >
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
                            aria-label={t(textStrings.audioInput.accessibility.stop)}
                            key="stop"
                            onClick={stop}
                            ref={stopButtonRef}
                            initial={AUDIO_INPUT_ANIMATION.initial}
                            animate={AUDIO_INPUT_ANIMATION.animate}
                            exit={AUDIO_INPUT_ANIMATION.exit}
                            transition={AUDIO_INPUT_ANIMATION.transition}
                            type="button"
                        >
                            <Icon icons={['fa fa-xmark']} size={sizes.iconSize} color={color} />
                        </StyledMotionAudioInputIconWrapper>
                    )}
                </AnimatePresence>
            </StyledMotionAudioInput>
        );
    },
);

const AudioInput = forwardRef<AudioInputRef, AudioInputProps>((props, ref) => (
    <TextStringProviderSSR libraries="chayns-components-v5-communication" id="audio-input">
        <AudioInputContent {...props} ref={ref} />
    </TextStringProviderSSR>
));

AudioInput.displayName = 'AudioInput';

export default AudioInput;
