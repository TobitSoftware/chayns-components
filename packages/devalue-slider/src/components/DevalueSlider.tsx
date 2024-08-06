import React, { useCallback, useEffect, useState } from 'react';
import Slider from './slider/Slider';
import Timer from './timer/Timer';

export type OnDevalueHandlerResult = { success: boolean };
export type OnDevalueHandler = () => Promise<OnDevalueHandlerResult>;

export type OnChangeHandler = (relativeValue: number) => void;
export type OnCompleteHandler = () => void;

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
     * This function is called when the slider is devalued.
     */
    onDevalue?: OnDevalueHandler;
    /**
     * This function is called when the slider value changes.
     * With this function you can keep track of the movement of the slider.
     */
    onChange?: OnChangeHandler;
    /**
     * This function is called when the slider is completed.
     * The slider is completed when the user devalues the slider
     * and the animation is completed.
     */
    onComplete?: OnCompleteHandler;
};

const DevalueSlider: React.FC<DevalueSliderProps> = ({
    color = 'red',
    devalueColor = 'green',
    devalueTime,
    onDevalue,
    onChange,
    onComplete,
}) => {
    const [timerTime, setTimerTime] = useState(devalueTime);

    useEffect(() => {
        if (!devalueTime) return;
        setTimerTime(devalueTime);
    }, [devalueTime]);

    const handleCompleted = useCallback(() => {
        setTimerTime(new Date());
        onComplete?.();
    }, [onComplete]);

    if (timerTime) {
        return <Timer color={devalueColor} devalueTime={timerTime} />;
    }

    return (
        <Slider
            onDevalue={onDevalue}
            color={color}
            devalueColor={devalueColor}
            onComplete={handleCompleted}
            onChange={onChange}
        />
    );
};

export default DevalueSlider;
