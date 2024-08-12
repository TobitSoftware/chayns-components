import React, { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
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
    backgroundColor?: CSSProperties['backgroundColor'];
    /**
     * The devalue color of the slider.
     * This color fills the track from the left on user movement.
     * This color is the background of the timer after the slider is devalued.
     */
    devalueBackgroundColor?: CSSProperties['backgroundColor'];
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
    backgroundColor = 'red',
    devalueBackgroundColor = 'green',
    devalueTime,
    isDisabled,
    onDevalue,
    onChange,
    onComplete,
}) => {
    const [timerDevalueTime, setTimerDevalueTime] = useState(devalueTime);

    const sliderRef = useRef<SliderRef>(null);

    useEffect(() => {
        setTimerDevalueTime(devalueTime);
    }, [devalueTime]);

    const handleCompleted = useCallback(() => {
        setTimerDevalueTime(new Date());

        onComplete?.();
    }, [onComplete]);

    useEffect(() => {
        if (isDisabled) {
            sliderRef.current?.disable();

            return;
        }

        sliderRef.current?.enable();
    }, [isDisabled]);

    if (timerDevalueTime) {
        return <Timer color={devalueBackgroundColor} devalueTime={timerDevalueTime} />;
    }

    return (
        <Slider
            ref={sliderRef}
            onDevalue={onDevalue}
            color={backgroundColor}
            devalueColor={devalueBackgroundColor}
            onComplete={handleCompleted}
            onChange={onChange}
        />
    );
};

export default DevalueSlider;
