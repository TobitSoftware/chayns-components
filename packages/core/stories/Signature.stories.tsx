import { Meta, StoryFn } from '@storybook/react';
import Signature from '../src/components/signature/Signature';

export default {
    title: 'Core/Signature',
    component: Signature,
    args: {
        buttonText: 'Unterschreiben',
    },
} as Meta<typeof Signature>;

const Template: StoryFn<typeof Signature> = (args) => <Signature {...args} />;

export const General = Template.bind({});
