import { Meta, StoryFn } from '@storybook/react';
import SearchInput from '../src/components/search-input/SearchInput';
import React from 'react';

export default {
    title: 'Core/SearchInput',
    component: SearchInput,
    args: {
        placeholder: 'Finden',
    },
} as Meta<typeof SearchInput>;

const Template: StoryFn<typeof SearchInput> = (args) => (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'end', position: 'relative' }}>
        <SearchInput {...args} />
    </div>
);

export const General = Template.bind({});
