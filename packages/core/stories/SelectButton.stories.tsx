import { Meta, StoryFn } from '@storybook/react';
import SelectButton from '../src/components/select-button/SelectButton';

export default {
    title: 'Core/SelectButton',
    component: SelectButton,
    args: {
        buttonText: 'Pizza auswählen',
        list: [
            { text: 'Salami', id: '1' },
            { text: 'Thunfisch', id: '2' },
            { text: 'Döner', id: '3' },
        ],
    },
} as Meta<typeof SelectButton>;

const Template: StoryFn<typeof SelectButton> = (args) => <SelectButton {...args} />;

export const General = Template.bind({});
