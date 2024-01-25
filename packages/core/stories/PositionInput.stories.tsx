import { Meta, StoryFn } from '@storybook/react';
import PositionInput from '../src/components/position-input/PositionInput';

export default {
    title: 'Core/PositionInput',
    component: PositionInput,
    args: {},
} as Meta<typeof PositionInput>;

const Template: StoryFn<typeof PositionInput> = ({ ...args }) => <PositionInput {...args} />;

export const General = Template.bind({});
