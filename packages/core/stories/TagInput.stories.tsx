import { Meta, StoryFn } from '@storybook/react';
import TagInput from '../src/components/tag-input/TagInput';
import React, { useState } from 'react';
import { Tag } from '../src';

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

const Template: StoryFn<typeof TagInput> = (args) => {
    const [tags, setTags] = useState(args.tags);

    const handleRemove = (id: string) => {
        setTags((prev) => prev?.filter((tag) => tag.id !== id));
    };

    const handleAdd = (tag: Tag) => {
        setTags([...(tags ?? []), tag]);
    };

    return <TagInput {...args} tags={tags} onAdd={handleAdd} onRemove={handleRemove} />;
};

export const General = Template.bind({});
