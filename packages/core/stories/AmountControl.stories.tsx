import { Meta, StoryFn } from '@storybook/react';
import AmountControl from '../src/components/amount-control/AmountControl';

export default {
    title: 'Core/AmountControl',
    component: AmountControl,
    args: {},
} as Meta<typeof AmountControl>;

const Template: StoryFn<typeof AmountControl> = (args) => <AmountControl {...args} />;

export const General = Template.bind({});

export const WithLabel = Template.bind({});

export const WithMaxAmount = Template.bind({});

WithLabel.args = {
    label: '1,43',
};

WithMaxAmount.args = {
    maxAmount: 1,
};
