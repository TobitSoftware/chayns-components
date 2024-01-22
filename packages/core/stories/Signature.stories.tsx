import { Meta, StoryFn } from '@storybook/react';
import Signature from '../src/components/signature/Signature';

export default {
    title: 'Core/Signature',
    component: Signature,
    args: {
        buttonText: 'Pizza auswählen',
        list: [
            { text: 'Salami', id: 1 },
            { text: 'Thunfisch', id: 2 },
            { text: 'Döner', id: 3 },
        ],
        selectedItemIds: [1],
    },
} as Meta<typeof Signature>;

const Template: StoryFn<typeof Signature> = (args) => <Signature {...args} />;

export const General = Template.bind({});
