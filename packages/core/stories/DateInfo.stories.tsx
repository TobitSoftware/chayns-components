import { ComponentMeta, ComponentStory } from '@storybook/react';
import DateInfo from '../src/components/date-info/DateInfo';

export default {
    title: 'Core/DateInfo',
    component: DateInfo,
    args: {
        date: new Date(),
    },
} as ComponentMeta<typeof DateInfo>;

const Template: ComponentStory<typeof DateInfo> = (args) => <DateInfo {...args} />;

export const General = Template.bind({});
