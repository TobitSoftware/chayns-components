import { Meta, StoryFn } from '@storybook/react';
import React, { ChangeEvent, useState } from 'react';
import SearchBox from '../src/components/search-box/SearchBox';
import { Tag } from '../src';
import { ISearchBoxItem } from '../src/components/search-box/SearchBox.types';

const ITEMS = [
    {
        id: '1',
        text: 'Pizza',
    },
    {
        id: '2',
        text: 'Burger',
    },
    {
        id: '3',
        text: 'Nudeln',
    },
    {
        id: '4',
        text: 'Steak',
    },
    {
        id: '5',
        text: 'Pommes',
    },
    {
        id: '6',
        text: 'Reis',
    },
];

const MORE_ITEMS = [
    {
        id: '7',
        text: 'Baum',
    },
    {
        id: '8',
        text: 'Stein',
    },
    {
        id: '9',
        text: 'Ziegelstein',
    },
    {
        id: '10',
        text: 'Tastatur',
    },
    {
        id: '11',
        text: 'Hosen',
    },
    {
        id: '12',
        text: 'Luft',
    },
];

export default {
    title: 'Core/SearchBox',
    component: SearchBox,
    args: {
        placeholder: 'Essen holen',
        lists: [
            {
                groupName: undefined,
                list: ITEMS,
            },
        ],
    },
} as Meta<typeof SearchBox>;

const Template: StoryFn<typeof SearchBox> = (args) => (
    <>
        <SearchBox {...args} />
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et sollicitudin turpis.
            Vivamus id nibh augue. Fusce finibus lobortis porta. Nulla velit augue, lobortis et
            scelerisque ac, venenatis non leo. Donec risus tellus, maximus in mollis ac, lobortis id
            metus. Nam sodales dolor a mauris tempus imperdiet. Cras id fermentum ipsum. Nulla
            condimentum dolor ac urna lobortis, vitae imperdiet elit rutrum. Pellentesque elementum
            ligula non quam accumsan ullamcorper. Vestibulum ante felis, mollis vitae odio eget,
            pretium gravida sem. Donec varius molestie interdum. Donec dictum nisi quam, non
            bibendum libero dictum egestas. Vivamus iaculis mauris ligula, et placerat felis gravida
            quis. Sed at eleifend orci, sit amet pretium velit. Phasellus aliquet id libero at
            egestas. Donec placerat libero eros, aliquet iaculis orci ultrices vitae. Nam in quam
            fringilla, semper neque id, venenatis urna. Vivamus rutrum mauris quis dui faucibus
            interdum. Curabitur eget justo at erat finibus accumsan. Ut quis pellentesque eros.
            Etiam at lacinia mauris. Praesent nec sem accumsan, bibendum tellus quis, pulvinar eros.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos.
        </p>
    </>
);

const DelayedItemsTemplate: StoryFn<typeof SearchBox> = (args) => {
    const [items, setItems] = useState([]);

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (target.value === 'Bau') {
            setTimeout(() => {
                setItems(MORE_ITEMS);
            }, 125);
        }
    };

    return (
        <>
            <SearchBox
                {...args}
                lists={[{ groupName: undefined, list: items }]}
                onChange={handleChange}
            />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et sollicitudin
                turpis. Vivamus id nibh augue. Fusce finibus lobortis porta. Nulla velit augue,
                lobortis et scelerisque ac, venenatis non leo. Donec risus tellus, maximus in mollis
                ac, lobortis id metus. Nam sodales dolor a mauris tempus imperdiet. Cras id
                fermentum ipsum. Nulla condimentum dolor ac urna lobortis, vitae imperdiet elit
                rutrum. Pellentesque elementum ligula non quam accumsan ullamcorper. Vestibulum ante
                felis, mollis vitae odio eget, pretium gravida sem. Donec varius molestie interdum.
                Donec dictum nisi quam, non bibendum libero dictum egestas. Vivamus iaculis mauris
                ligula, et placerat felis gravida quis. Sed at eleifend orci, sit amet pretium
                velit. Phasellus aliquet id libero at egestas. Donec placerat libero eros, aliquet
                iaculis orci ultrices vitae. Nam in quam fringilla, semper neque id, venenatis urna.
                Vivamus rutrum mauris quis dui faucibus interdum. Curabitur eget justo at erat
                finibus accumsan. Ut quis pellentesque eros. Etiam at lacinia mauris. Praesent nec
                sem accumsan, bibendum tellus quis, pulvinar eros. Class aptent taciti sociosqu ad
                litora torquent per conubia nostra, per inceptos himenaeos.
            </p>
        </>
    );
};

const TagInputTemplate: StoryFn<typeof SearchBox> = (args) => {
    const [tags, setTags] = useState<Tag[]>([]);

    const onRemove = (id: string) => {};

    const onAdd = (tag: Tag) => {
        setTags((prevState) => [...prevState, tag]);
    };

    const onSelect = (item: ISearchBoxItem) => {
        setTags((prevState) => [...prevState, { text: item.text, id: item.id }]);
    };

    return (
        <>
            <SearchBox
                {...args}
                onSelect={onSelect}
                tagInputSettings={{
                    tags,
                    onRemove,
                    onAdd,
                    shouldAllowMultiple: true,
                }}
            />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et sollicitudin
                turpis. Vivamus id nibh augue. Fusce finibus lobortis porta. Nulla velit augue,
                lobortis et scelerisque ac, venenatis non leo. Donec risus tellus, maximus in mollis
                ac, lobortis id metus. Nam sodales dolor a mauris tempus imperdiet. Cras id
                fermentum ipsum. Nulla condimentum dolor ac urna lobortis, vitae imperdiet elit
                rutrum. Pellentesque elementum ligula non quam accumsan ullamcorper. Vestibulum ante
                felis, mollis vitae odio eget, pretium gravida sem. Donec varius molestie interdum.
                Donec dictum nisi quam, non bibendum libero dictum egestas. Vivamus iaculis mauris
                ligula, et placerat felis gravida quis. Sed at eleifend orci, sit amet pretium
                velit. Phasellus aliquet id libero at egestas. Donec placerat libero eros, aliquet
                iaculis orci ultrices vitae. Nam in quam fringilla, semper neque id, venenatis urna.
                Vivamus rutrum mauris quis dui faucibus interdum. Curabitur eget justo at erat
                finibus accumsan. Ut quis pellentesque eros. Etiam at lacinia mauris. Praesent nec
                sem accumsan, bibendum tellus quis, pulvinar eros. Class aptent taciti sociosqu ad
                litora torquent per conubia nostra, per inceptos himenaeos.
            </p>
        </>
    );
};

export const General = Template.bind({});

export const WithImages = Template.bind({});

export const WithGroups = Template.bind({});

export const WithDelayedItems = DelayedItemsTemplate.bind({});

export const WithTagInput = TagInputTemplate.bind({});

WithImages.args = {
    lists: [
        {
            groupName: undefined,
            list: [
                {
                    imageUrl: 'https://picsum.photos/200',
                    id: '1',
                    text: 'Pizza',
                },
                { imageUrl: 'https://picsum.photos/200', id: '2', text: 'Burger' },
                { imageUrl: 'https://picsum.photos/200', id: '3', text: 'Nudeln' },
                { imageUrl: 'https://picsum.photos/200', id: '4', text: 'Steak' },
                { imageUrl: 'https://picsum.photos/200', id: '5', text: 'Pommes' },
                { imageUrl: 'https://picsum.photos/200', id: '6', text: 'Reis' },
            ],
        },
    ],
};

WithTagInput.args = {
    tagInputSettings: {
        tags: [
            {
                id: '1',
                text: 'Pizza',
            },
        ],
    },
};

WithGroups.args = {
    lists: [
        {
            groupName: 'Essbar',
            list: [
                { id: '1', text: 'Pizza' },
                { id: '2', text: 'Burger' },
                { id: '3', text: 'Nudeln' },
                { id: '4', text: 'Steak' },
                { id: '5', text: 'Pommes' },
                { id: '6', text: 'Reis' },
            ],
        },
        {
            groupName: 'Nicht essbar',
            list: [
                { id: '7', text: 'Baum' },
                { id: '8', text: 'Stein' },
                { id: '9', text: 'Ziegelstein' },
                { id: '10', text: 'Tastatur' },
                { id: '11', text: 'Hosen' },
                { id: '12', text: 'Luft' },
            ],
        },
    ],
};

WithDelayedItems.args = {
    shouldAddInputToList: false,
    shouldHideFilterButtons: true,
    shouldShowContentOnEmptyInput: false,
};
