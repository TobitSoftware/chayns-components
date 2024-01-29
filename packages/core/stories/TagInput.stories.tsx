import { Meta, StoryFn } from '@storybook/react';
import TagInput from '../src/components/tag-input/TagInput';

export default {
    title: 'Core/TagInput',
    component: TagInput,
    args: {
        tags: [
            { id: 'pizza', text: 'Pizza' },
            { id: 'nudeln', text: 'Nudeln' },
        ],
    },
} as Meta<typeof TagInput>;

const Template: StoryFn<typeof TagInput> = (args) => <TagInput {...args} />;

export const General = Template.bind({});
