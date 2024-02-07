import { Meta, StoryFn } from '@storybook/react';
import OpeningTimes from '../src/components/opening-times/OpeningTimes';

export default {
    title: 'Core/OpeningTimes',
    component: OpeningTimes,
    args: {
        weekdays: [
            { id: 0, name: 'Montag' },
            { id: 1, name: 'Dienstag' },
            { id: 2, name: 'Mittwoch' },
            { id: 3, name: 'Donnerstag' },
            { id: 4, name: 'Freitag' },
            { id: 5, name: 'Samstag' },
            { id: 6, name: 'Sonntag' },
        ],
        openingTimes: [
            {
                id: 'montag',
                weekdayId: 0,
                times: [{ start: '12:00', end: '12:00', id: '1' }],
                isDisabled: true,
            },
            {
                id: 'dienstag',
                weekdayId: 1,
                times: [
                    { start: '12:00', end: '12:00', id: '2' },
                    { start: '12:00', end: '12:00', id: '3' },
                ],
            },
            { id: 'mittwoch', weekdayId: 2, times: [{ start: '12:00', end: '12:00', id: '4' }] },
            { id: 'donnerstag', weekdayId: 3, times: [{ start: '12:00', end: '12:00', id: '5' }] },
            { id: 'freitag', weekdayId: 4, times: [{ start: '12:00', end: '12:00', id: '6' }] },
            { id: 'samstag', weekdayId: 5, times: [{ start: '12:00', end: '12:00', id: '7' }] },
            { id: 'sonntag', weekdayId: 6, times: [{ start: '12:00', end: '12:00', id: '8' }] },
        ],
    },
} as Meta<typeof OpeningTimes>;

const Template: StoryFn<typeof OpeningTimes> = (args) => {
    return <OpeningTimes {...args} />;
};

export const General = Template.bind({});
