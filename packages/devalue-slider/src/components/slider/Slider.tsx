import { SmallWaitCursor } from '@chayns-components/core';
import useSize from '@react-hook/size';
import { invokeCall, vibrate } from 'chayns-api';
import {
    useAnimation,
    useDragControls,
    useMotionValue,
    useTransform,
    type DragHandlers,
} from 'framer-motion';
import React, {
    forwardRef,
    PointerEvent,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useThumbIcon } from '../../hooks/design';
import { sleep } from '../../utils/common';
import type { DevalueSliderProps } from '../DevalueSlider';
import {
    Container,
    createThumbVariants,
    Thumb,
    ThumbIcon,
    ThumbIconContainer,
    THUMB_ICON_VARIANTS,
    Track,
    TrackBackground,
    TrackText,
} from './Slider.styles';

export type SliderProps = {
    color: NonNullable<DevalueSliderProps['backgroundColor']>;
    devalueColor: NonNullable<DevalueSliderProps['devalueBackgroundColor']>;
    thumbSize?: number;
    trackHeight?: number;
    trackText?: string;
    borderSize?: number;
    onChange: DevalueSliderProps['onChange'];
    onDevalue: DevalueSliderProps['onDevalue'];
    onComplete: DevalueSliderProps['onComplete'];
};

export type SliderRef = {
    disable: () => void;
    enable: () => void;
};

const Slider = forwardRef<SliderRef, SliderProps>(
    (
        {
            color,
            devalueColor,
            trackHeight = 50,
            thumbSize = 40,
            borderSize = 2,
            trackText = 'EINLÖSEN',
            onChange = () => {},
            onDevalue = () => Promise.resolve({ success: true }),
            onComplete,
        },
        ref,
    ) => {
        const [trackRef, setTrackRef] = useState<HTMLDivElement | null>(null);
        const [trackWidth] = useSize(trackRef, { initialWidth: 300, initialHeight: 50 });
        const [iconColor, setIconColor] = useState('black');
        const [isCompleted, setIsCompleted] = useState(false);
        const [isDisabled, setIsDisabled] = useState(false);
        const isCompletedRef = useRef(isCompleted);
        const [showWaitCursor, setShowWaitCursor] = useState(false);
        const scaleFactor = useMemo(() => trackHeight / thumbSize, [thumbSize, trackHeight]);

        const x = useMotionValue(0);
        const { icon, styles: iconStyles } = useThumbIcon(x, iconColor);
        const dragControls = useDragControls();

        const vibrationTrigger = useTransform(
            x,
            // round to 10 to avoid unnecessary vibrate calls
            (value) => Math.round(value / 10) * 10,
        );
        const lastVibrationValue = useRef(0);
        useEffect(() => {
            vibrationTrigger.on('change', (value) => {
                if (!isCompletedRef.current && value !== lastVibrationValue.current) {
                    lastVibrationValue.current = value;
                    void vibrate({ pattern: [10] });
                }
            });
        }, [vibrationTrigger]);

        const containerAnimation = useAnimation();
        const thumbVariants = useMemo(
            () =>
                createThumbVariants({
                    thumbSize,
                    trackWidth,
                    scaleFactor,
                }),
            [scaleFactor, thumbSize, trackWidth],
        );

        const textOpacity = useTransform(x, [0, 120], [1, 0]);

        // this is the relative value of the right edge of the thumb
        const relativeValue = useTransform(x, (value) => {
            if (!value) return 0;
            const thumbRadius = thumbSize * scaleFactor;
            return parseFloat((((value + thumbRadius) / trackWidth) * 100).toPrecision(2));
        });

        // this is the relative value of the center of the thumb, it is used for the background gradient
        const relativeBackgroundValue = useTransform(x, (value) => {
            if (!value) return 0;
            const thumbRadius = (thumbSize * scaleFactor) / 2;
            return parseFloat((((value + thumbRadius) / trackWidth) * 100).toPrecision(2));
        });

        const trackBackground = useTransform(relativeBackgroundValue, (value) => {
            if (isCompleted) return devalueColor;
            if (!value) return 'transparent';
            return `linear-gradient(to right, ${devalueColor} ${value}%, transparent ${value}%)`;
        });

        const handlePointerDownCapture = useCallback(
            (event: PointerEvent) => {
                const currentValue = relativeValue.get();

                if (currentValue > 5) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                void invokeCall({
                    action: 19,
                    value: {
                        pattern: [50],
                        iOSFeedbackVibration: 7,
                    },
                });
            },
            [relativeValue],
        );

        const handleRedeem = useCallback(async () => {
            setShowWaitCursor(true);
            setIsCompleted(true);
            isCompletedRef.current = true;

            const devaluePromise = onDevalue();
            const sleepPromise = sleep(1000);
            const [devalued] = await Promise.all([devaluePromise, sleepPromise]);

            if (!devalued.success) {
                setShowWaitCursor(false);
                setIsCompleted(false);
                isCompletedRef.current = false;
                await containerAnimation.start('base');
                return;
            }

            setShowWaitCursor(false);
            setIconColor('white');
            void invokeCall({
                action: 19,
                value: {
                    iOSFeedbackVibration: 3,
                    pattern: [100, 200, 100],
                },
            });

            await containerAnimation.start('completed');
            await containerAnimation.start('leaving');
            onComplete?.();
        }, [containerAnimation, onComplete, onDevalue]);

        const handleTrackRef = useCallback((node: HTMLDivElement | null) => {
            setTrackRef(node);
        }, []);

        const handleDragStart = useCallback<NonNullable<DragHandlers['onDragStart']>>(() => {
            void containerAnimation.start('dragging');
        }, [containerAnimation]);

        const handleDragEnd = useCallback<NonNullable<DragHandlers['onDragEnd']>>(() => {
            if (relativeValue.get() > 98) {
                void handleRedeem();
                return;
            }

            void containerAnimation.start('base');
        }, [relativeValue, containerAnimation, handleRedeem]);

        useEffect(() => {
            void containerAnimation.start('base');
        }, [containerAnimation]);

        useEffect(() => {
            if (isCompleted) return () => {};
            return relativeValue.on('change', onChange);
        }, [isCompleted, onChange, relativeValue]);

        useImperativeHandle(
            ref,
            () => ({
                disable: () => {
                    setIsDisabled(true);
                    setShowWaitCursor(false);
                    setIsCompleted(false);
                    isCompletedRef.current = false;
                    void containerAnimation.start('base');
                },
                enable: () => {
                    setIsDisabled(false);
                },
            }),
            [containerAnimation],
        );

        const baseFontSize = useMemo(() => 22, []);

        return (
            <Container animate={containerAnimation}>
                <Track
                    $height={trackHeight}
                    $borderSize={borderSize}
                    $backgroundColor={color}
                    ref={handleTrackRef}
                >
                    <TrackBackground
                        $height={trackHeight}
                        style={{ background: trackBackground }}
                    />
                    <Thumb
                        variants={thumbVariants}
                        $size={thumbSize}
                        $trackHeight={trackHeight}
                        style={{ x }}
                        drag={isCompleted || isDisabled ? false : 'x'}
                        dragElastic={0}
                        onPointerDownCapture={handlePointerDownCapture}
                        whileTap={{ scale: 1.4, cursor: 'grabbing' }}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        dragControls={dragControls}
                        dragConstraints={{
                            right: trackWidth - thumbSize * scaleFactor,
                            left: 0,
                        }}
                    >
                        <ThumbIconContainer>
                            {!showWaitCursor && (
                                <ThumbIcon
                                    key="thumb-icon"
                                    icon={icon}
                                    variants={THUMB_ICON_VARIANTS}
                                    style={iconStyles}
                                />
                            )}
                            {showWaitCursor && (
                                <SmallWaitCursor shouldHideBackground color="black" />
                            )}
                        </ThumbIconContainer>
                    </Thumb>
                    <TrackText
                        style={{ opacity: textOpacity }}
                        $color="white"
                        $baseFontSize={baseFontSize}
                    >
                        {trackText}
                    </TrackText>
                </Track>
            </Container>
        );
    },
);

export default Slider;
