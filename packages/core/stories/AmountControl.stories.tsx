import { ComponentMeta, ComponentStory } from '@storybook/react';
import AmountControl from '../src/components/amount-control/AmountControl';

export default {
    title: 'Core/AmountControl',
    component: AmountControl,
    args: {},
} as ComponentMeta<typeof AmountControl>;

const Template: ComponentStory<typeof AmountControl> = (args) => <AmountControl {...args} />;

export const General = Template.bind({});
