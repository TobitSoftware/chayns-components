import { ComponentMeta, ComponentStory } from '@storybook/react';
import ComboBox from '../src/components/combobox/ComboBox';

export default {
    title: 'Core/ComboBox',
    component: ComboBox,
    args: {
        list: [
            {
                text: 'Margherita',
                value: 1,
            },
            {
                text: 'Thunfisch',
                value: 2,
            },
            {
                text: 'Salami',
                value: 3,
            },
            {
                text: 'Schinken',
                value: 4,
            },
            {
                text: 'Champignons',
                value: 5,
            },
            {
                text: 'Paprika',
                value: 6,
            },
            {
                text: 'Oliven',
                value: 7,
            },
            {
                text: 'Zwiebeln',
                value: 8,
            },
            {
                text: 'Peperoni',
                value: 9,
            },
            {
                text: 'Ananas',
                value: 10,
            },
            {
                text: 'Spinat',
                value: 11,
            },
            {
                text: 'Feta',
                value: 12,
            },
            {
                text: 'Mais',
                value: 13,
            },
            {
                text: 'Rucola',
                value: 14,
            },
            {
                text: 'Parmesan',
                value: 15,
            },
        ],
        placeholder: 'Select Pizza',
    },
} as ComponentMeta<typeof ComboBox>;

const Template: ComponentStory<typeof ComboBox> = (args) => (
    <>
        <h1>Pizza auswählen</h1>
        <ComboBox {...args} />
        <p>Pizza ist sehr lecker</p>
    </>
);

export const General = Template.bind({});
