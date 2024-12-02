import { Meta, StoryFn } from '@storybook/react';
import NumberInput from '../src/components/number-input/NumberInput';
import { useState } from 'react';

export default {
    title: 'Core/NumberInput',
    component: NumberInput,
    args: {},
} as Meta<typeof NumberInput>;

const Template: StoryFn<typeof NumberInput> = (args) => {
    const [value, setValue] = useState('');

    return <NumberInput {...args} value={value} onChange={(newValue) => setValue(newValue)} />;
};

export const General = Template.bind({});
