import { Meta, StoryFn } from '@storybook/react';
import DateInfo from '../src/components/date-info/DateInfo';

export default {
    title: 'Core/DateInfo',
    component: DateInfo,
    args: {
        date: new Date(),
    },
} as Meta<typeof DateInfo>;

const Template: StoryFn<typeof DateInfo> = (args) => <DateInfo {...args} />;

export const General = Template.bind({});
