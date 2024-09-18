import { Meta, StoryFn } from '@storybook/react';
import Calendar from '../src/components/calendar/Calendar';
import { CalendarType } from '../src/types/calendar';

const getDayOfCurrentMonth = (day: number) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    return date;
};

export default {
    title: 'Date/Calendar',
    component: Calendar,
    args: {
        type: CalendarType.Interval,
        minDate: new Date('2024-02-01T00:00:00+00:00'),
        highlightedDates: [
            {
                dates: [
                    getDayOfCurrentMonth(-3),
                    getDayOfCurrentMonth(1),
                    getDayOfCurrentMonth(22),
                ],
                style: { textColor: 'white', backgroundColor: 'blue' },
            },
            {
                dates: [getDayOfCurrentMonth(21)],
                style: { textColor: 'white', backgroundColor: 'red' },
            },
            {
                dates: [getDayOfCurrentMonth(20), getDayOfCurrentMonth(28)],
                style: { textColor: 'white', backgroundColor: 'green' },
            },
        ],
        categories: [
            {
                dates: [getDayOfCurrentMonth(35), getDayOfCurrentMonth(13)],
                color: 'green',
                id: 'meeting',
            },
            {
                dates: [getDayOfCurrentMonth(3), getDayOfCurrentMonth(14)],
                color: 'black',
                id: 'holiday',
            },
            {
                dates: [getDayOfCurrentMonth(14)],
                color: 'purple',
                id: 'birthday',
            },
        ],
    },
} as Meta<typeof Calendar>;

const Template: StoryFn<typeof Calendar> = ({ ...args }) => <Calendar {...args} />;

export const General = Template.bind({});
