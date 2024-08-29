import { Meta, StoryFn } from '@storybook/react';
import { ComboBoxDirection } from '../src';
import ComboBox from '../src/components/combobox/ComboBox';
import Icon from '../src/components/icon/Icon';

export default {
    title: 'Core/ComboBox',
    component: ComboBox,
    args: {
        lists: [
            {
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
            },
        ],
        placeholder: 'Select Pizza',
    },
} as Meta<typeof ComboBox>;

const Template: StoryFn<typeof ComboBox> = (args) => (
    <>
        <p>
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
            gubergren, no sea takimata sanctus est.
        </p>
        <ComboBox {...args} />
    </>
);

export const General = Template.bind({});

export const WithImages = Template.bind({});

export const WithSuffixElements = Template.bind({});

export const WithIcons = Template.bind({});

export const WithGroups = Template.bind({});

export const WithSubtextAndRightElement = Template.bind({});

WithGroups.args = {
    direction: ComboBoxDirection.TOP,
    lists: [
        {
            groupName: 'Autos',
            list: [
                {
                    text: 'Audi',
                    value: 0,
                },
                {
                    text: 'BMW',
                    value: 1,
                },
                {
                    text: 'Toyota',
                    value: 2,
                },
                {
                    text: 'Volkswagen',
                    value: 3,
                },
                {
                    text: 'Nissan',
                    value: 4,
                },
            ],
        },
        {
            groupName: 'Fußballvereine',
            list: [
                {
                    text: 'Bayern München',
                    value: 0,
                },
                {
                    text: 'Dortmund',
                    value: 1,
                },
                {
                    text: 'Real Madrid',
                    value: 2,
                },
                {
                    text: 'Man City',
                    value: 3,
                },
                {
                    text: 'Barcelona',
                    value: 4,
                },
            ],
        },
    ],
};

WithImages.args = {
    direction: ComboBoxDirection.TOP,
    lists: [
        {
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
        },
    ],
    selectedItem: {
        imageUrl: 'https://picsum.photos/200',
        text: 'Flexibles Design',
        value: 1,
    },
};

WithIcons.args = {
    direction: ComboBoxDirection.TOP,
    lists: [
        {
            list: [
                {
                    icons: ['ts-calling-code'],
                    text: 'Schnellstart',
                    value: 0,
                },
                {
                    icons: ['ts-calling-code'],
                    text: 'Flexibles Design',
                    value: 1,
                },
                {
                    icons: ['ts-calling-code'],
                    text: 'Intuitive Bedienung',
                    value: 2,
                },
                {
                    icons: ['ts-calling-code'],
                    text: 'Integration',
                    value: 3,
                },
                {
                    icons: ['ts-calling-code'],
                    text: 'Navigation',
                    value: 4,
                },
            ],
        },
    ],
    selectedItem: {
        icons: ['ts-calling-code'],
        text: 'Flexibles Design',
        value: 1,
    },
};

WithSuffixElements.args = {
    direction: ComboBoxDirection.TOP,
    lists: [
        {
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
        },
    ],
    selectedItem: {
        imageUrl: 'https://picsum.photos/200',
        text: 'Intuitive Bedienung',
        suffixElement: <Icon icons={['far fa-user']} />,
        value: 2,
    },
};

WithSubtextAndRightElement.args = {
    lists: [
        {
            groupName: 'Häufig ausgewählt',
            list: [
                {
                    imageUrl: 'https://tsimg.cloud/HUK-F4KJD/profile_w128.png',
                    value: 'HUK-F4KJD',
                    text: 'Linda Schuster',
                    subtext: 'Journalistin, Analytisch',
                    rightElement: (
                        <span style={{ fontStyle: 'italic', opacity: 0.65 }}>OpenAI GPT-4o</span>
                    ),
                },
                {
                    imageUrl: 'https://tsimg.cloud/Q8V-45A2G/profile_w128.png',
                    value: 'Q8V-45A2G',
                    text: 'Jonas Fischer',
                    subtext: 'IT-Sicherheitsexperte, Aggressiv',
                    rightElement: (
                        <span style={{ fontStyle: 'italic', opacity: 0.65 }}>
                            Google Gemini 1.0 Pro
                        </span>
                    ),
                },
            ],
        },
        {
            groupName: 'Weitere Avatare',
            list: [
                {
                    imageUrl: 'https://tsimg.cloud/3X1-8KA3H/profile_w128.png',
                    value: '3X1-8KA3H',
                    text: 'Prof. Dr. Hans Köhler',
                    subtext: 'Ökonom, Pragmatisch',
                    rightElement: (
                        <span style={{ fontStyle: 'italic', opacity: 0.65 }}>Claude 3</span>
                    ),
                },
                {
                    imageUrl: 'https://tsimg.cloud/U28-2F8C3/profile_w128.png',
                    value: 'U28-2F8C3',
                    text: 'Elena Novak',
                    subtext: 'Menschenrechtsaktivistin, Radikal',
                    rightElement: (
                        <span style={{ fontStyle: 'italic', opacity: 0.65 }}>OpenAI GPT-4o</span>
                    ),
                },
                {
                    imageUrl: 'https://tsimg.cloud/TTC-ANK55/profile_w128.png',
                    value: 'TTC-ANK55',
                    text: 'Thomas Becker',
                    subtext: 'Polizist, Moderat',
                    rightElement: (
                        <span style={{ fontStyle: 'italic', opacity: 0.65 }}>Mistral Large 1</span>
                    ),
                },
                {
                    imageUrl: 'https://tsimg.cloud/LBN-WHS1A/profile_w128.png',
                    value: 'LBN-WHS1A',
                    text: 'Dr. Clara Baumann',
                    subtext: 'Klimaforscherin, Idealistisch',
                    rightElement: (
                        <span style={{ fontStyle: 'italic', opacity: 0.65 }}>Claude 3</span>
                    ),
                },
                {
                    imageUrl: 'https://tsimg.cloud/DQM-BINQP/profile_w128.png',
                    value: 'DQM-BINQP',
                    text: 'Maximilian Weber',
                    subtext: 'Unternehmer, Pragmatisch',
                    rightElement: (
                        <span style={{ fontStyle: 'italic', opacity: 0.65 }}>Mistral Large 1</span>
                    ),
                },
            ],
        },
    ],
    placeholder: 'Avatar auswählen',
    shouldShowRoundImage: true,
    shouldUseFullWidth: true,
};
