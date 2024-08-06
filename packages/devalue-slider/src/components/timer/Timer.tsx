import { format, intervalToDuration } from 'date-fns';
import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';

import { vibrate } from 'chayns-api';

import { Container } from './Timer.styles';

export type TimerProps = {
    color: string;
    devalueTime: Date;
    textColor?: string;
};

const Timer: FunctionComponent<TimerProps> = ({ devalueTime, color, textColor = 'white' }) => {
    const [distance, setDistance] = useState(
        intervalToDuration({
            start: devalueTime,
            end: new Date(),
        }),
    );
    const minutesShowValue = useMemo(() => (distance.minutes || 0).toString(), [distance.minutes]);
    const secondsShowValue = useMemo(() => (distance.seconds || 0).toString(), [distance.seconds]);

    useEffect(() => {
        const interval = setInterval(() => {
            setDistance(
                intervalToDuration({
                    start: devalueTime,
                    end: new Date(),
                }),
            );
        }, 500);
        return () => clearInterval(interval);
    }, [devalueTime]);

    const handlePointerDownCapture = useCallback(() => {
        void vibrate({ pattern: [50], iOSFeedbackVibration: 7 });
    }, []);

    const label = useMemo(() => {
        let text = 'Vor ##SECONDS## Sek. (##TIME## Uhr)';
        if (distance.minutes) {
            text = 'Vor ##MINUTES## Min. ##SECONDS## Sek. (##TIME## Uhr)';
        }

        return text
            .replace('##MINUTES##', minutesShowValue)
            .replace('##SECONDS##', secondsShowValue)
            .replace('##TIME##', format(devalueTime, 'HH:mm'));
    }, [distance.minutes, minutesShowValue, secondsShowValue, devalueTime]);

    return (
        <Container
            $baseFontSize={17}
            $borderSize={2}
            $height={50}
            $color={color}
            $textColor={textColor}
            $backgroundColor={color}
            onPointerDownCapture={handlePointerDownCapture}
        >
            {label}
        </Container>
    );
};

export default Timer;
