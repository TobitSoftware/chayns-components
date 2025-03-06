import React, { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
    const { active: language } = getLanguage();

    const refDate = useRef(new Date());
    const [distance, setDistance] = useState(
        intervalToDuration({
            start: devalueTime,
            end: new Date(),
        }),
    );
    const minutesShowValue = useMemo(
        () => Math.max(distance.minutes ?? 0, 0).toString(),
        [distance.minutes],
    );
    const secondsShowValue = useMemo(
        () => Math.max(distance.seconds ?? 0, 0).toString(),
        [distance.seconds],
    );

    useEffect(() => {
        refDate.current = new Date();
        const interval = setInterval(() => {
            refDate.current = new Date();
            setDistance(
                intervalToDuration({
                    start: devalueTime,
                    end: refDate.current,
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
        if (differenceInHours(refDate.current, devalueTime) > 0) {
            const distanceLabel = getTimeTillNow({
                date: new Date(),
                currentDate: devalueTime,
                language,
            });
            text = `${distanceLabel} (##TIME## Uhr)`;
        } else if (differenceInMinutes(refDate.current, devalueTime) > 0) {
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
    }, [devalueTime, minutesShowValue, secondsShowValue, language]);

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
