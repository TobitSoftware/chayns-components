import React, { FC, useEffect, useRef } from 'react';
import { StyledMotionWaveForm, StyledWaveFormCanvas } from './WaveForm.styles';
import { WaveFormProps } from './WaveForm.types';
import { AUDIO_INPUT_ANIMATION } from '../AudioInput.constants';

const BAR_SIZE = 3;
const GAP = 2;
const RADIUS = 1.5;

const MIN_BAR_HEIGHT = 4;
const MAX_BAR_HEIGHT_FACTOR = 0.74;

const IDLE_LEVEL = 0.038;
const LEVEL_RISE_SMOOTHING = 0.32;
const LEVEL_FALL_SMOOTHING = 0.14;

const MIN_OPACITY = 0.3;
const AMPLITUDE_MULTIPLIER = 3.6;

const clampLevel = (value: number) => Math.min(1, Math.max(0, value));

const WaveForm: FC<WaveFormProps> = ({ analyser, color }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const animationFrameRef = useRef<number | null>(null);
    const valuesRef = useRef<number[]>([]);
    const renderedLevelRef = useRef<number>(IDLE_LEVEL);

    useEffect(() => {
        const canvas = canvasRef.current;
        const wrapper = wrapperRef.current;

        if (!canvas || !wrapper || !analyser) {
            return undefined;
        }

        const context = canvas.getContext('2d');

        if (!context) {
            return undefined;
        }

        const pixelRatio = window.devicePixelRatio || 1;

        const resizeCanvas = () => {
            const { width, height } = wrapper.getBoundingClientRect();

            canvas.width = Math.floor(width * pixelRatio);
            canvas.height = Math.floor(height * pixelRatio);

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

            const itemWidth = BAR_SIZE + GAP;
            const maxItemCount = Math.max(Math.floor(width / itemWidth), 1);

            valuesRef.current = new Array<number>(maxItemCount).fill(IDLE_LEVEL);
        };

        const getAmplitude = () => {
            const dataArray = new Uint8Array(analyser.frequencyBinCount);

            analyser.getByteTimeDomainData(dataArray);

            let sum = 0;

            for (let index = 0; index < dataArray.length; index += 1) {
                const value = dataArray[index] ?? 128;
                sum += Math.abs(value - 128) / 128;
            }

            return clampLevel(sum / dataArray.length);
        };

        const draw = () => {
            const { width, height } = wrapper.getBoundingClientRect();

            const amplitude = getAmplitude();
            const targetLevel = Math.max(amplitude, IDLE_LEVEL);

            const smoothing =
                targetLevel >= renderedLevelRef.current
                    ? LEVEL_RISE_SMOOTHING
                    : LEVEL_FALL_SMOOTHING;

            renderedLevelRef.current += (targetLevel - renderedLevelRef.current) * smoothing;

            valuesRef.current.shift();
            valuesRef.current.push(renderedLevelRef.current);

            context.clearRect(0, 0, width, height);

            const maxBarHeight = height * MAX_BAR_HEIGHT_FACTOR;
            const centerY = height / 2;

            valuesRef.current.forEach((value, index) => {
                const level = clampLevel(value);
                const x = index * (BAR_SIZE + GAP);

                const barHeight = Math.max(
                    Math.min(level * height * AMPLITUDE_MULTIPLIER, maxBarHeight),
                    MIN_BAR_HEIGHT,
                );

                const y = centerY - barHeight / 2;

                context.globalAlpha = MIN_OPACITY + level * (1 - MIN_OPACITY);
                context.fillStyle = color;

                context.beginPath();
                context.roundRect(x, y, BAR_SIZE, barHeight, RADIUS);
                context.fill();
            });

            context.globalAlpha = 1;

            animationFrameRef.current = requestAnimationFrame(draw);
        };

        resizeCanvas();

        const resizeObserver = new ResizeObserver(resizeCanvas);
        resizeObserver.observe(wrapper);

        draw();

        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }

            resizeObserver.disconnect();
            context.globalAlpha = 1;
        };
    }, [analyser, color]);

    return (
        <StyledMotionWaveForm
            ref={wrapperRef}
            initial={AUDIO_INPUT_ANIMATION.initial}
            animate={AUDIO_INPUT_ANIMATION.animate}
            exit={AUDIO_INPUT_ANIMATION.exit}
            transition={AUDIO_INPUT_ANIMATION.transition}
        >
            <StyledWaveFormCanvas ref={canvasRef} />
        </StyledMotionWaveForm>
    );
};

WaveForm.displayName = 'WaveForm';

export default WaveForm;
