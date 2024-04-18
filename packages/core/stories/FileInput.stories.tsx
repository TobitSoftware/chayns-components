import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { FileInputFileItem } from '../src';
import FileInput from '../src/components/file-input/FileInput';

export default {
    title: 'Core/FileInput',
    component: FileInput,
    args: {},
} as Meta<typeof FileInput>;

const Template: StoryFn<typeof FileInput> = ({ ...args }) => {
    const [internalFiles, setInternalFiles] = useState(args.files);

    const handleRemove = (file: File | FileInputFileItem | string) => {
        if (typeof file !== 'string' && 'url' in file) {
            setInternalFiles((prevState) => prevState.filter(({ url }) => url !== file.url));
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
            url: 'https://tsimg.cloud/77896-21884/54a117f35e5fb57520e64471461af5491c0eff06.png',
        },
        {
            id: '34zh34rdchg26zth5erfdzjzg',
            url: 'https://tsimg.cloud/77896-21884/8aee1a304297729a4542b97325940a656a3da8f2.png',
        },
    ],
};
