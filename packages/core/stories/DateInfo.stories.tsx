import { ComponentMeta, ComponentStory } from '@storybook/react';

import DateInfo from '../src/components/date-info/DateInfo';
import { DateFormat } from '../src/components/date-info/types/props';

export default {
    title: 'Core/DateInfo',
    component: DateInfo,
    args: {
        date: new Date('2023-06-09T10:58:26.530Z'),
        secondDate: new Date('2023-08-03T16:40:26.530Z'),
        format: DateFormat.DayWithTimePeriod,
    },
} as ComponentMeta<typeof DateInfo>;

const Template: ComponentStory<typeof DateInfo> = ({ ...args }) => <DateInfo {...args} />;

export const General = Template.bind({});
