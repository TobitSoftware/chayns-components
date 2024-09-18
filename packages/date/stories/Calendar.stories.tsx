import { Meta, StoryFn } from '@storybook/react';
import Calendar from '../src/components/calendar/Calendar';

export default {
    title: 'Date/Calendar',
    component: Calendar,
    args: {
        minDate: new Date('2023-02-01T00:00:00+00:00'),
        highlightedDates: [
            {
                dates: [
                    new Date('Sat Feb 03 2024 00:00:00 GMT+0000'),
                    new Date('Thu Feb 01 2024 00:00:00 GMT+0000'),
                    new Date('Thu Feb 22 2024 00:00:00 GMT+0000'),
                ],
                style: { textColor: 'white', backgroundColor: 'blue' },
            },
            {
                dates: [new Date('Wed Feb 21 2024 00:00:00 GMT+0000')],
                style: { textColor: 'white', backgroundColor: 'red' },
            },
            {
                dates: [new Date('Tue Feb 20 2024 00:00:00 GMT+0000')],
                style: { textColor: 'white', backgroundColor: 'green' },
            },
        ],
        categories: [
            {
                dates: [
                    new Date('Sun Feb 18 2024 00:00:00 GMT+0000'),
                    new Date('Thu Feb 13 2024 00:00:00 GMT+0000'),
                ],
                color: 'pink',
                id: 'meeting',
            },
            {
                dates: [
                    new Date('Wed Feb 14 2024 00:00:00 GMT+0000'),
                    new Date('Mon Mar 4 2024 00:00:00 GMT+0000'),
                ],
                color: 'yellow',
                id: 'holiday',
            },
            {
                dates: [new Date('Wed Feb 14 2024 00:00:00 GMT+0000')],
                color: 'grey',
                id: 'birthday',
            },
        ],
    },
} as Meta<typeof Calendar>;

const Template: StoryFn<typeof Calendar> = ({ ...args }) => <Calendar {...args} />;

export const General = Template.bind({});
