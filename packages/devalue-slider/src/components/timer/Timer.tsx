import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';

import { getLanguage, vibrate } from 'chayns-api';

import { Container, Time } from './Timer.styles';
import {
    differenceInHours,
    differenceInMinutes,
    getTimeTillNow,
    intervalToDuration,
} from '../../utils/date';

export type TimerProps = {
    color: string;
    devalueTime: Date;
    textColor?: string;
};

const Timer: FunctionComponent<TimerProps> = ({ devalueTime, color, textColor = 'white' }) => {
    'use memo';

    const { active: language } = getLanguage();

    const [currentTime, setCurrentTime] = useState(new Date());

    const distance = intervalToDuration({
        start: devalueTime,
        end: currentTime,
    });

    const minutesShowValue = useMemo(
        () => Math.max(distance.minutes ?? 0, 0).toString(),
        [distance.minutes],
    );
    const secondsShowValue = useMemo(
        () => Math.max(distance.seconds ?? 0, 0).toString(),
        [distance.seconds],
    );

    useEffect(() => {
        let latestAnimationFrame: number;
        let lastUpdate: number | undefined;

        const loop = (time: number) => {
            const UPDATE_INTERVAL = 1000;
            if (lastUpdate === undefined) lastUpdate = time;
            if (time - lastUpdate >= UPDATE_INTERVAL) {
                lastUpdate += UPDATE_INTERVAL;
                setCurrentTime(new Date());
            }

            latestAnimationFrame = requestAnimationFrame(loop);
        };

        latestAnimationFrame = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(latestAnimationFrame);
    }, [devalueTime]);

    const handlePointerDownCapture = useCallback(() => {
        void vibrate({ pattern: [50], iOSFeedbackVibration: 7 });
    }, []);

    const label = useMemo(() => {
        let text = 'Vor ##SECONDS## Sek. (##TIME## Uhr)';
        if (differenceInHours(currentTime, devalueTime) > 0) {
            const distanceLabel = getTimeTillNow({
                date: new Date(),
                currentDate: devalueTime,
                language,
            });
            text = `${distanceLabel} (##TIME## Uhr)`;
        } else if (differenceInMinutes(currentTime, devalueTime) > 0) {
            text = 'Vor ##MINUTES## Min. ##SECONDS## Sek. (##TIME## Uhr)';
        }

        const formatTime = (date: Date, formatString: string): string => {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            if (formatString === 'HH:mm') {
                return `${hours}:${minutes}`;
            }
            return '';
        };

        return text
            .replace('##MINUTES##', minutesShowValue)
            .replace('##SECONDS##', secondsShowValue)
            .replace('##TIME##', formatTime(devalueTime, 'HH:mm'));
    }, [currentTime, devalueTime, minutesShowValue, secondsShowValue, language]);

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
            <Time>{label}</Time>
        </Container>
    );
};

export default Timer;
