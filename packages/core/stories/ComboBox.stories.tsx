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
            gubergren, no sea takimata sanctus est.Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
            amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est.
        </p>
        <ComboBox {...args} />
        <p>
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
            gubergren, no sea takimata sanctus est.Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
            amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua.
        </p>
        <p>
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
            gubergren, no sea takimata sanctus est.Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
            amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua.
        </p>
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

export const OwnWidth = Template.bind({});

export const WithPrefix = Template.bind({});

export const WithImages = Template.bind({});

export const WithSuffixElements = Template.bind({});

export const WithIcons = Template.bind({});

export const WithGroups = Template.bind({});

export const WithSubtext = Template.bind({});

export const WithBigImage = Template.bind({});

export const WithInput = WithInputTemplate.bind({});

export const WithTextStyle = Template.bind({});

OwnWidth.args = {
    bodyWidth: 300,
    direction: ComboBoxDirection.LEFT,
    shouldUseFullWidth: true,
};

WithPrefix.args = {
    prefix: 'Von',
};

WithGroups.args = {
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

WithSubtext.args = {
    shouldShowBigImage: true,
    lists: [
        {
            list: [
                {
                    imageUrl: 'https://tsimg.cloud/PM4-7NBYY/profile_w128.png',
                    value: 'PM4-7NBYY',
                    text: 'David Rechenberg, 39 Jahre',
                    subtext: 'Mathelehrer',
                },
                {
                    imageUrl: 'https://tsimg.cloud/9JC-14TQZ/profile_w128.png',
                    value: '9JC-14TQZ',
                    text: 'Gerhard Kaiser, 55 Jahre',
                    subtext: 'Geschichtslehrer',
                },
                {
                    imageUrl: 'https://tsimg.cloud/AFQ-2VL54/profile_w128.png',
                    value: 'AFQ-2VL54',
                    text: 'Claudia Schreiber, 57 Jahre',
                    subtext: 'Deutschlehrerin',
                },
                {
                    imageUrl: 'https://tsimg.cloud/FCB-GEU25/profile_w128.png',
                    value: 'FCB-GEU25',
                    text: 'Lukas Waldmann, 24 Jahre',
                    subtext: 'Biologielehrer',
                },
                {
                    imageUrl: 'https://tsimg.cloud/R3U-8B6ZJ/profile_w128.png',
                    value: 'R3U-8B6ZJ',
                    text: 'Emily Taylor, 29 Jahre',
                    subtext: 'Englischlehrerin',
                },
                {
                    imageUrl: 'https://tsimg.cloud/TER-1VS4Q/profile_w128.png',
                    value: 'TER-1VS4Q',
                    text: 'Paul Bitner, 28 Jahre',
                    subtext: 'Informatiklehrer',
                },
                {
                    imageUrl: 'https://tsimg.cloud/IFZ-HFCC6/profile_w128.png',
                    value: 'IFZ-HFCC6',
                    text: 'Rudi Ratlos, 20 Jahre',
                    subtext: 'Informatik-Referent',
                },
            ],
        },
    ],
    placeholder: 'Agent wählen',
    shouldShowClearIcon: true,
    shouldShowRoundImage: true,
    shouldUseFullWidth: true,
};

WithBigImage.args = {
    shouldShowBigImage: true,
    lists: [
        {
            list: [
                {
                    imageUrl: 'https://tsimg.cloud/6C8-5QJDF/profile_w128.png',
                    value: '6C8-5QJDF',
                    text: 'Albert, 55 Jahre',
                },
                {
                    imageUrl: 'https://tsimg.cloud/DFU-I2R6I/profile_w128.png',
                    value: 'DFU-I2R6I',
                    text: 'Anna, 30 Jahre',
                },
                {
                    imageUrl: 'https://tsimg.cloud/SY9-LT5TA/profile_w128.png',
                    value: 'SY9-LT5TA',
                    text: 'Elisabeth, 80 Jahre',
                },
                {
                    imageUrl: 'https://tsimg.cloud/BGJ-DTZBH/profile_w128.png',
                    value: 'BGJ-DTZBH',
                    text: 'Jonas, 20 Jahre',
                },
                {
                    imageUrl: 'https://tsimg.cloud/672-9GQ3J/profile_w128.png',
                    value: '672-9GQ3J',
                    text: 'Lisa, 10 Jahre',
                },
                {
                    imageUrl: 'https://tsimg.cloud/CVW-MDH7R/profile_w128.png',
                    value: 'CVW-MDH7R',
                    text: 'Stefan, 35 Jahre',
                    subtext: 'Informatiklehrer',
                },
            ],
        },
    ],
    placeholder: 'Agent wählen',
    shouldShowClearIcon: true,
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
