import { Meta, StoryFn } from '@storybook/react';
import { ComboBoxDirection } from '../src';
import ComboBox from '../src/components/combobox/ComboBox';
import Icon from '../src/components/icon/Icon';

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
        ],
        placeholder: 'Select Pizza',
    },
} as Meta<typeof ComboBox>;

const Template: StoryFn<typeof ComboBox> = (args) => (
    <>
        <h1>Pizza auswählen</h1>
        <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
            rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
            amet. Sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
            kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
        <ComboBox {...args} />
    </>
);

export const General = Template.bind({});

export const WithImages = Template.bind({});

export const WithSuffixElements = Template.bind({});

WithImages.args = {
    direction: ComboBoxDirection.TOP,
    list: [
        {
            imageUrl: 'https://picsum.photos/200',
            text: 'Schnellstart',
            value: 0,
        },
        {
            imageUrl: 'https://picsum.photos/200',
            text: 'Flexibles Design',
            value: 1,
        },
        {
            imageUrl: 'https://picsum.photos/200',
            text: 'Intuitive Bedienung',
            value: 2,
        },
        {
            imageUrl: 'https://picsum.photos/200',
            text: 'Integration',
            value: 3,
        },
        {
            imageUrl: 'https://picsum.photos/200',
            text: 'Navigation',
            value: 4,
        },
    ],
    selectedItem: {
        imageUrl: 'https://picsum.photos/200',
        text: 'Flexibles Design',
        value: 1,
    },
};

WithSuffixElements.args = {
    direction: ComboBoxDirection.TOP,
    list: [
        {
            imageUrl: 'https://picsum.photos/200',
            suffixElement: <Icon icons={['fal fa-image']} />,
            text: 'Schnellstart',
            value: 0,
        },
        {
            imageUrl: 'https://picsum.photos/200',
            text: 'Flexibles Design',
            value: 1,
        },
        {
            imageUrl: 'https://picsum.photos/200',
            text: 'Intuitive Bedienung',
            suffixElement: <Icon icons={['fa fa-user']} />,
            value: 2,
        },
        {
            imageUrl: 'https://picsum.photos/200',
            text: 'Integration',
            value: 3,
        },
        {
            imageUrl: 'https://picsum.photos/200',
            text: 'Navigation',
            value: 4,
        },
    ],
    selectedItem: {
        imageUrl: 'https://picsum.photos/200',
        text: 'Intuitive Bedienung',
        suffixElement: <Icon icons={['far fa-user']} />,
        value: 2,
    },
};
