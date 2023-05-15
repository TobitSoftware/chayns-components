import { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchInput from '../src/components/search-input/SearchInput';

export default {
    title: 'Core/SearchInput',
    component: SearchInput,
    args: {
        placeholder: 'Finden',
    },
} as ComponentMeta<typeof SearchInput>;

const Template: ComponentStory<typeof SearchInput> = (args) => (
    <div style={{ textAlign: 'right' }}>
        <SearchInput {...args} />
    </div>
);

export const General = Template.bind({});
