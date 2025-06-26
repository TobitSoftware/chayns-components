import { Meta, StoryFn } from '@storybook/react';
import DateInfo from '../src/components/date-info/DateInfo';
import React from 'react';

export default {
    title: 'Date/DateInfo',
    component: DateInfo,
    args: {
        date: new Date(),
    },
} as Meta<typeof DateInfo>;

const Template: StoryFn<typeof DateInfo> = (args) => <DateInfo {...args} />;

export const General = Template.bind({});
