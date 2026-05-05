import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useCommunicationAnimationContext } from '../communication-animation-wrapper/CommunicationAnimationWrapper.context';

const DEFAULT_AUDIO_CONSTRAINTS: MediaTrackConstraints = {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
};

export interface UseAudioInputOptions {
    isMuted?: boolean;
    autoStart?: boolean;
    audioConstraints?: MediaTrackConstraints;

    onStart?: (stream: MediaStream) => void;
    onStop?: () => void;
    onError?: (error: unknown) => void;
}

export interface UseAudioInputReturn {
    isActive: boolean;
    analyser: AnalyserNode | null;

    start: () => Promise<MediaStream | null>;
    stop: () => void;
    getStream: () => MediaStream | null;
}

export const useAudioInput = ({
    isMuted = false,
    autoStart = false,
    audioConstraints,
    onStart,
    onStop,
    onError,
}: UseAudioInputOptions): UseAudioInputReturn => {
    const streamRef = useRef<MediaStream | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);

    const [isActive, setIsActive] = useState(false);
    const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

    const { open, close } = useCommunicationAnimationContext();

    const getStream = useCallback(() => streamRef.current, []);

    const applyMutedState = useCallback(
        (stream: MediaStream | null) => {
            stream?.getAudioTracks().forEach((track) => {
                track.enabled = !isMuted;
            });
        },
        [isMuted],
    );

    const cleanupAudioNodes = useCallback(() => {
        sourceRef.current?.disconnect();
        sourceRef.current = null;

        analyserRef.current?.disconnect();
        analyserRef.current = null;

        setAnalyser(null);
    }, []);

    const stop = useCallback(() => {
        cleanupAudioNodes();

        streamRef.current?.getTracks().forEach((track) => {
            track.stop();
        });

        streamRef.current = null;

        void audioContextRef.current?.close();
        audioContextRef.current = null;

        setIsActive(false);

        if (typeof close === 'function') {
            close();
        }

        if (typeof onStop === 'function') {
            onStop();
        }
    }, [cleanupAudioNodes, close, onStop]);

    const start = useCallback(async () => {
        try {
            if (streamRef.current) {
                return streamRef.current;
            }

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    ...DEFAULT_AUDIO_CONSTRAINTS,
                    ...audioConstraints,
                },
                video: false,
            });

            const audioContext = new AudioContext();
            const source = audioContext.createMediaStreamSource(stream);
            const analyserNode = audioContext.createAnalyser();

            analyserNode.fftSize = 2048;
            analyserNode.smoothingTimeConstant = 0.85;

            source.connect(analyserNode);

            streamRef.current = stream;
            audioContextRef.current = audioContext;
            sourceRef.current = source;
            analyserRef.current = analyserNode;

            applyMutedState(stream);

            setAnalyser(analyserNode);
            setIsActive(true);

            if (typeof onStart === 'function') {
                onStart(stream);
            }

            if (typeof open === 'function') {
                open();
            }

            return stream;
        } catch (error) {
            onError?.(error);
            return null;
        }
    }, [applyMutedState, audioConstraints, onError, onStart, open]);

    useEffect(() => {
        applyMutedState(streamRef.current);
    }, [applyMutedState]);

    useEffect(() => {
        if (!autoStart) {
            return;
        }

        void start();
    }, [autoStart, start]);

    useEffect(
        () => () => {
            stop();
        },
        [stop],
    );

    return {
        isActive,
        analyser,
        start,
        stop,
        getStream,
    };
};
