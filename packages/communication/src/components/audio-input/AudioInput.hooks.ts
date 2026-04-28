import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

export interface UseAudioInputOptions {
    isMuted?: boolean;
    autoStart?: boolean;
    shouldVisualize?: boolean;

    onMuteChange?: (isMuted: boolean) => void;

    onStart?: (stream: MediaStream) => void;
    onStop?: () => void;
    onError?: (error: unknown) => void;
}

export interface UseAudioInputReturn {
    isActive: boolean;

    canvasRef: RefObject<HTMLCanvasElement | null>;

    start: () => Promise<MediaStream | null>;
    stop: () => void;
    getStream: () => MediaStream | null;
}

export const useAudioInput = ({
    isMuted = false,
    autoStart = false,
    shouldVisualize = true,
    onStart,
    onStop,
    onError,
}: UseAudioInputOptions): UseAudioInputReturn => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const [isActive, setIsActive] = useState(false);

    const getStream = useCallback(() => streamRef.current, []);

    const stopVisualization = useCallback(() => {
        if (animationFrameRef.current === null) {
            return;
        }

        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
    }, []);

    const startVisualization = useCallback(() => {
        const canvas = canvasRef.current;
        const analyser = analyserRef.current;

        if (!canvas || !analyser || !shouldVisualize) {
            return;
        }

        const context = canvas.getContext('2d');

        if (!context) {
            return;
        }

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const render = () => {
            analyser.getByteTimeDomainData(dataArray);

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();

            const sliceWidth = canvas.width / dataArray.length;
            let x = 0;

            dataArray.forEach((value, index) => {
                const y = (value / 255) * canvas.height;

                if (index === 0) {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }

                x += sliceWidth;
            });

            context.stroke();

            animationFrameRef.current = requestAnimationFrame(render);
        };

        stopVisualization();
        render();
    }, [shouldVisualize, stopVisualization]);

    const applyMutedState = useCallback(
        (stream: MediaStream | null) => {
            stream?.getAudioTracks().forEach((track) => {
                track.enabled = !isMuted;
            });
        },
        [isMuted],
    );

    const stop = useCallback(() => {
        stopVisualization();

        streamRef.current?.getTracks().forEach((track) => {
            track.stop();
        });

        streamRef.current = null;
        analyserRef.current = null;

        void audioContextRef.current?.close();
        audioContextRef.current = null;

        setIsActive(false);
        onStop?.();
    }, [onStop, stopVisualization]);

    const start = useCallback(async () => {
        try {
            if (streamRef.current) {
                return streamRef.current;
            }

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });

            const audioContext = new AudioContext();
            const source = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();

            analyser.fftSize = 2048;
            source.connect(analyser);

            streamRef.current = stream;
            audioContextRef.current = audioContext;
            analyserRef.current = analyser;

            applyMutedState(stream);
            setIsActive(true);
            onStart?.(stream);

            startVisualization();

            return stream;
        } catch (error) {
            onError?.(error);
            return null;
        }
    }, [applyMutedState, onError, onStart, startVisualization]);

    useEffect(() => {
        applyMutedState(streamRef.current);
    }, [applyMutedState]);

    useEffect(() => {
        if (!autoStart) {
            return;
        }

        void start();
    }, [autoStart, start]);

    useEffect(() => {
        if (shouldVisualize) {
            startVisualization();
            return;
        }

        stopVisualization();
    }, [shouldVisualize, startVisualization, stopVisualization]);

    useEffect(
        () => () => {
            stop();
        },
        [stop],
    );

    return {
        isActive,
        canvasRef,
        start,
        stop,
        getStream,
    };
};
