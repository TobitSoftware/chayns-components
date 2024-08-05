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
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useThumbIcon } from '../hooks/design';
import { sleep } from '../utils/common';
import {
    Container,
    createThumbVariants,
    Thumb,
    ThumbIcon,
    ThumbIconContainer,
    ThumbWaitCursor,
    THUMB_ICON_VARIANTS,
    Track,
    TrackBackground,
    TrackText,
} from './Slider.components';

export type SliderProps = {
    className?: string;
    isOpen?: boolean;
    trackColor?: string;
    securityColor: string;
    thumbSize?: number;
    trackHeight?: number;
    trackText?: string;
    borderSize?: number;
    onSliderChange?: (relativeValue: number) => void;
    onRedeemed: () => Promise<void>;
    onCompleted?: () => void;
    onDragStart?: () => void | Promise<void>;
};

export type SliderRef = {
    disable: () => void;
    enable: () => void;
};

const Slider = forwardRef<SliderRef, SliderProps>(
    (
        {
            className,
            isOpen = false,
            trackColor = 'red',
            securityColor,
            trackHeight = 50,
            thumbSize = 40,
            borderSize = 2,
            trackText = 'EINLÖSEN',
            onSliderChange = () => {},
            onRedeemed,
            onCompleted,
            onDragStart,
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
            if (isCompleted) return securityColor;
            if (!value) return 'transparent';
            return `linear-gradient(to right, ${securityColor} ${value}%, transparent ${value}%)`;
        });

        const handlePointerDownCapture = useCallback(() => {
            void invokeCall({
                action: 19,
                value: {
                    pattern: [50],
                    iOSFeedbackVibration: 7,
                },
            });
        }, []);

        const handleRedeem = useCallback(async () => {
            try {
                setShowWaitCursor(true);
                setIsCompleted(true);
                isCompletedRef.current = true;

                const redeemPromise = onRedeemed();
                const sleepPromise = sleep(1000);
                await Promise.all([redeemPromise, sleepPromise]);

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
                onCompleted?.();
            } catch (e) {
                setShowWaitCursor(false);
                setIsCompleted(false);
                isCompletedRef.current = false;
                await containerAnimation.start('base');
            }
        }, [containerAnimation, onCompleted, onRedeemed]);

        const handleTrackRef = useCallback((node: HTMLDivElement | null) => {
            setTrackRef(node);
        }, []);

        const handleDragStart = useCallback<NonNullable<DragHandlers['onDragStart']>>(() => {
            void containerAnimation.start('dragging');
            void onDragStart?.();
        }, [containerAnimation, onDragStart]);

        const handleDragEnd = useCallback<NonNullable<DragHandlers['onDragEnd']>>(() => {
            if (relativeValue.get() > 98) {
                void handleRedeem();
                return;
            }

            void containerAnimation.start('base');
        }, [relativeValue, containerAnimation, handleRedeem]);

        useEffect(() => {
            if (!isOpen) return;
            void containerAnimation.start('base');
        }, [containerAnimation, isOpen]);

        useEffect(() => {
            if (isCompleted) return () => {};
            return relativeValue.on('change', onSliderChange);
        }, [isCompleted, onSliderChange, relativeValue]);

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
            <Container className={className} animate={containerAnimation}>
                <Track
                    $height={trackHeight}
                    $borderSize={borderSize}
                    $backgroundColor={trackColor}
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
                            {showWaitCursor && <ThumbWaitCursor shouldHideBackground />}
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
