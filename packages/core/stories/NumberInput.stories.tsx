import { Meta, StoryFn } from '@storybook/react';
import NumberInput from '../src/components/number-input/NumberInput';

export default {
    title: 'Core/NumberInput',
    component: NumberInput,
    args: {},
} as Meta<typeof NumberInput>;

const Template: StoryFn<typeof NumberInput> = (args) => <NumberInput {...args} />;

export const General = Template.bind({});
