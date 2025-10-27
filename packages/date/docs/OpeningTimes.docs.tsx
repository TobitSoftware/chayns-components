import React, { FC } from 'react';
import { OpeningTimes, Weekday, OpeningTime } from '@chayns-components/date';

const WEEKDAYS: Weekday[] = [
    { id: 0, name: 'Montag' },
    { id: 1, name: 'Dienstag' },
    { id: 2, name: 'Mittwoch' },
    { id: 3, name: 'Donnerstag' },
    { id: 4, name: 'Freitag' },
    { id: 5, name: 'Samstag' },
    { id: 6, name: 'Sonntag' },
];

const OPENING_TIMES: OpeningTime[] = [
    {
        id: 'montag',
        weekdayId: 0,
        times: [{ start: '08:00', end: '18:00', id: '1' }],
        isDisabled: true,
    },
    {
        id: 'dienstag',
        weekdayId: 1,
        times: [
            { start: '08:00', end: '12:00', id: '2' },
            { start: '11:00', end: '18:00', id: '3' },
        ],
    },
    { id: 'mittwoch', weekdayId: 2, times: [{ start: '08:00', end: '18:00', id: '4' }] },
    { id: 'donnerstag', weekdayId: 3, times: [{ start: '08:00', end: '18:00', id: '5' }] },
    { id: 'freitag', weekdayId: 4, times: [{ start: '08:00', end: '18:00', id: '6' }] },
    { id: 'samstag', weekdayId: 5, times: [{ start: '08:00', end: '18:00', id: '7' }] },
    { id: 'sonntag', weekdayId: 6, times: [{ start: '18:00', end: '08:00', id: '8' }] },
];

const Component: FC = () => {
    return <OpeningTimes openingTimes={OPENING_TIMES} weekdays={WEEKDAYS} />;
};

Component.displayName = 'Component';

export default Component;
