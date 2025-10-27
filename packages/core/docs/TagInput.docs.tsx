import React, { FC, useState } from 'react';
import { Tag, TagInput } from '@chayns-components/core';

const Component: FC = () => {
    const [tags, setTags] = useState<Tag[]>([]);

    const handleAdd = (tag: Tag) => {
        setTags((prevState) => [...prevState, tag]);
    };

    const handleRemove = (id: Tag['id']) => {
        setTags((prevState) => prevState.filter((tag) => tag.id !== id));
    };

    return <TagInput tags={tags} onAdd={handleAdd} onRemove={handleRemove} />;
};

Component.displayName = 'Component';

export default Component;
