import { Meta, StoryFn } from '@storybook/react';
import SearchInput from '../src/components/search-input/SearchInput';

export default {
    title: 'Core/SearchInput',
    component: SearchInput,
    args: {
        placeholder: 'Finden',
    },
} as Meta<typeof SearchInput>;

const Template: StoryFn<typeof SearchInput> = (args) => (
    <div style={{ textAlign: 'right' }}>
        <SearchInput {...args} />
    </div>
);

export const General = Template.bind({});
