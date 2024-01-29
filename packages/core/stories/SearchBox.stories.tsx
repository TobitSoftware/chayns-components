import { Meta, StoryFn } from '@storybook/react';
import SearchBox from '../src/components/search-box/SearchBox';

export default {
    title: 'Core/SearchBox',
    component: SearchBox,
    args: {
        list: [
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
        ],
        placeholder: 'Essen Suchen',
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

export const General = Template.bind({});

export const WithImages = Template.bind({});

WithImages.args = {
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
};
