import { Meta, StoryFn } from '@storybook/react';
import { ChangeEvent, useState } from 'react';
import { ComboBoxDirection } from '../src';
import ComboBox, { IComboBoxItem } from '../src/components/combobox/ComboBox';
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
                        isDisabled: true,
                        text: 'Paprika',
                        value: 6,
                    },
                    {
                        text: 'Oliven',
                        value: 7,
                    },
                    {
                        isDisabled: true,
                        text: 'Zwiebeln',
                        value: 8,
                    },
                    {
                        isDisabled: true,
                        text: 'Peperoni',
                        value: 9,
                    },
                    {
                        isDisabled: true,
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

const WithInputTemplate: StoryFn<typeof ComboBox> = (args) => {
    const [value, setValue] = useState('');

    const handleChange = (event: ChangeEvent) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const handleSelect = (item: IComboBoxItem) => {
        setValue(item.text);
    };

    return (
        <>
            <p>
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
                diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
                kasd gubergren, no sea takimata sanctus est.
            </p>
            <ComboBox
                {...args}
                inputValue={value}
                onInputChange={handleChange}
                onSelect={handleSelect}
            />
        </>
    );
};

export const General = Template.bind({});

export const WithPrefix = Template.bind({});

export const WithImages = Template.bind({});

export const WithSuffixElements = Template.bind({});

export const WithIcons = Template.bind({});

export const WithGroups = Template.bind({});

export const WithSubtextAndRightElement = Template.bind({});

export const WithInput = WithInputTemplate.bind({});

export const WithTextStyle = Template.bind({});

WithPrefix.args = {
    prefix: 'Von',
};

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
    prefix: 'Von',
    shouldShowBigImage: true,
    lists: [
        {
            list: [
                {
                    imageUrl: 'https://tsimg.cloud/Q8V-45A2G/profile_w128.png',
                    value: 'Q8V-45A2G',
                    text: 'Herr Funktiona (Mathematik, 9. - 10. Klasse) mit zusätzlicher Information',
                    subtext: 'Mathelehrer, 27 Jahre',
                    suffixElement: <Icon icons={['fal fa-image']} />,
                },
                {
                    imageUrl: 'https://tsimg.cloud/HUK-F4KJD/profile_w128.png',
                    value: 'HUK-F4KJD',
                    text: 'Frau Grammatika (Deutsch, 9. - 10. Klasse)',
                    subtext: 'Deutschlehrerin, 29 Jahre',
                },
                {
                    imageUrl: 'https://tsimg.cloud/3X1-8KA3H/profile_w128.png',
                    value: '3X1-8KA3H',
                    text: 'Herr Historia (Geschichte, 9. - 10. Klasse) mit zusätzlicher Information',
                    subtext: 'Geschichtslehrer, 31 Jahre',
                },
                {
                    imageUrl: 'https://tsimg.cloud/U28-2F8C3/profile_w128.png',
                    value: 'U28-2F8C3',
                    text: 'Frau Biologica (Biologie, 9. - 10. Klasse) mit zusätzlicher Information',
                    subtext: 'Biologielehrerin, 33 Jahre',
                },
                {
                    imageUrl: 'https://tsimg.cloud/TTC-ANK55/profile_w128.png',
                    value: 'TTC-ANK55',
                    text: 'Herr Chemica (Chemie, 9. - 10. Klasse)',
                    subtext: 'Chemielehrer, 35 Jahre',
                },
            ],
        },
    ],
    placeholder: 'Avatar auswählen',
    shouldShowRoundImage: true,
    shouldUseFullWidth: true,
};

WithInput.args = {
    lists: [
        {
            list: [
                {
                    text: '12px',
                    value: 0,
                },
                {
                    text: '13px',
                    value: 1,
                },
                {
                    text: '14px',
                    value: 2,
                },
                {
                    text: '15px',
                    value: 3,
                },
                {
                    text: '16px',
                    value: 4,
                },
                {
                    text: '20px',
                    value: 5,
                },
                {
                    text: '24px',
                    value: 6,
                },
            ],
        },
    ],
    placeholder: 'Fontsize',
};

WithTextStyle.args = {
    lists: [
        {
            list: [
                {
                    text: 'Normal',
                    value: 0,
                },
                {
                    text: 'Headline 1',
                    value: 1,
                    textStyles: {
                        tagName: 'h1',
                        styles: { margin: 0 },
                    },
                },
                {
                    text: 'Headline 2',
                    value: 2,
                    textStyles: {
                        tagName: 'h2',
                        styles: { margin: 0 },
                    },
                },
                {
                    text: 'Headline 3',
                    value: 3,
                    textStyles: {
                        tagName: 'h3',
                        styles: { margin: 0 },
                    },
                },
                {
                    text: 'headline 4',
                    value: 4,
                    textStyles: {
                        tagName: 'h4',
                        styles: { margin: 0 },
                    },
                },
                {
                    text: 'Footer',
                    value: 5,
                    textStyles: {
                        tagName: 'footer',
                        styles: { margin: 0 },
                    },
                },
            ],
        },
    ],
    placeholder: 'Fontsize',
};
