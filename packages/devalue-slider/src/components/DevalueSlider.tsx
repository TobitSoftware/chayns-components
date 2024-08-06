import React, { useCallback, useEffect, useRef, useState } from 'react';
import Slider, { type SliderRef } from './slider/Slider';
import Timer from './timer/Timer';

export type DevalueSliderOnDevalueHandlerResult = { success: boolean };
export type DevalueSliderOnDevalueHandler = () => Promise<DevalueSliderOnDevalueHandlerResult>;

export type DevalueSliderOnChangeHandler = (relativeValue: number) => void;
export type DevalueSliderOnCompleteHandler = () => void;

export type DevalueSliderProps = {
    /**
     * The basic color of the slider.
     * This color is the background of the track before the slider is devalued.
     */
    color?: string;
    /**
     * The devalue color of the slider.
     * This color fills the track from the left on user movement.
     * This color is the background of the timer after the slider is devalued.
     */
    devalueColor?: string;
    /**
     * If this slider was devalued, provide the time when it was devalued.
     * This will show a timer.
     */
    devalueTime?: Date;
    /**
     * Disables the slider and cancels any active drags.
     */
    isDisabled?: boolean;
    /**
     * This function is called when the slider is devalued.
     */
    onDevalue?: DevalueSliderOnDevalueHandler;
    /**
     * This function is called when the slider value changes.
     * With this function you can keep track of the movement of the slider.
     */
    onChange?: DevalueSliderOnChangeHandler;
    /**
     * This function is called when the slider is completed.
     * The slider is completed when the user devalues the slider
     * and the animation is completed.
     */
    onComplete?: DevalueSliderOnCompleteHandler;
};

const DevalueSlider: React.FC<DevalueSliderProps> = ({
    color = 'red',
    devalueColor = 'green',
    devalueTime,
    isDisabled,
    onDevalue,
    onChange,
    onComplete,
}) => {
    const sliderRef = useRef<SliderRef>(null);
    const [timerTime, setTimerTime] = useState(devalueTime);

    useEffect(() => {
        if (!devalueTime) return;
        setTimerTime(devalueTime);
    }, [devalueTime]);

    const handleCompleted = useCallback(() => {
        setTimerTime(new Date());
        onComplete?.();
    }, [onComplete]);

    useEffect(() => {
        if (isDisabled) {
            sliderRef.current?.disable();
            return;
        }
        sliderRef.current?.enable();
    }, [isDisabled]);

    if (timerTime) {
        return <Timer color={devalueColor} devalueTime={timerTime} />;
    }

    return (
        <Slider
            ref={sliderRef}
            onDevalue={onDevalue}
            color={color}
            devalueColor={devalueColor}
            onComplete={handleCompleted}
            onChange={onChange}
        />
    );
};

export default DevalueSlider;
