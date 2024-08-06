import React, { useCallback, useEffect, useState } from 'react';
import Slider from './slider/Slider';
import Timer from './timer/Timer';

export type OnDevalueHandlerResult = { success: boolean };
export type OnDevalueHandler = () => Promise<OnDevalueHandlerResult>;

export type OnChangeHandler = (relativeValue: number) => void;
export type OnCompleteHandler = () => void;

export type DevalueSliderProps = {
    color?: string;
    devalueColor?: string;
    devalueTime?: Date;
    onDevalue?: OnDevalueHandler;
    onChange?: OnChangeHandler;
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
