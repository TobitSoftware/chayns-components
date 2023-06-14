import { ComponentMeta, ComponentStory } from '@storybook/react';
import DateInfo from '../src/components/date-info/DateInfo';

export default {
    title: 'Core/DateInfo',
    component: DateInfo,
    args: {
        date: new Date('2023-06-14T08:29:02.461Z'),
    },
} as ComponentMeta<typeof DateInfo>;

const Template: ComponentStory<typeof DateInfo> = (args) => <DateInfo {...args} />;

export const General = Template.bind({});
