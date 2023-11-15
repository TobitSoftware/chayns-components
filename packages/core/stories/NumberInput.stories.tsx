import { ComponentMeta, ComponentStory } from '@storybook/react';
import NumberInput from '../src/components/number-input/NumberInput';

export default {
    title: 'Core/NumberInput',
    component: NumberInput,
    args: {},
} as ComponentMeta<typeof NumberInput>;

const Template: ComponentStory<typeof NumberInput> = (args) => (
    <NumberInput
        {...args}
    />
);

export const General = Template.bind({});
