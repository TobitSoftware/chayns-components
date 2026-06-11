import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import FileInput from '../src/components/file-input/FileInput';
import { IFileItem } from '../src/components/file-list/FileList';
import { UploadedFile } from '../src/components/file-select/FileSelect';

export default {
    title: 'Core/FileInput',
    component: FileInput,
    args: {},
} as Meta<typeof FileInput>;

const Template: StoryFn<typeof FileInput> = ({ ...args }) => {
    const [internalFiles, setInternalFiles] = useState(args.files);

    const handleRemove = (file: File | IFileItem | UploadedFile) => {
        if (typeof file !== 'string' && 'id' in file) {
            setInternalFiles((prevState) => prevState?.filter(({ id }) => id !== file.id));
        }
    };

    return <FileInput {...args} files={internalFiles} onRemove={handleRemove}></FileInput>;
};

export const General = Template.bind({});
export const WithImageSelection = Template.bind({});
export const WithFiles = Template.bind({});

WithImageSelection.args = {
    imageSelectPlaceholder: 'Bild auswählen',
};

WithFiles.args = {
    files: [
        {
            id: '2733zgetfvedjh4wetrf23w',
            name: 'Eine Datei',
            size: 34,
            mimeType: 'image/png',
        },
        {
            id: '34zh34rdchg26zth5erfdzjzg',
            name: 'Test Datei',
            size: 23,
            mimeType: 'image/png',
        },
    ],
};
