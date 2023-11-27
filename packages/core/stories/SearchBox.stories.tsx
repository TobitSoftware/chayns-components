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

const Template: StoryFn<typeof SearchBox> = (args) => <SearchBox {...args} />;

export const General = Template.bind({});
