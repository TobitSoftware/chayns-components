import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import FileList from '../src/components/file-list/FileList';

export default {
    title: 'Core/FileList',
    component: FileList,
    args: {
        files: [
            { id: '1', name: 'file1', size: 20, mimeType: 'text/plain' },
            { id: '2', name: 'file2', size: 20, mimeType: 'text/plain' },
            { id: '3', name: 'file3', size: 20, mimeType: 'text/plain' },
            { id: '4', name: 'file4', size: 20, mimeType: 'text/plain' },
        ],
    },
} as Meta<typeof FileList>;

const Template: StoryFn<typeof FileList> = ({ ...args }) => {
    const [internalFiles, setInternalFiles] = useState(args.files);

    const handleRemove = (id: string) => {
        setInternalFiles((prevState) => (prevState ?? []).filter((file) => id !== file.id));
    };

    return <FileList files={internalFiles} onRemove={handleRemove} />;
};

export const General = Template.bind({});
