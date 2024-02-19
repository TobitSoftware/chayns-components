import { Meta, StoryFn } from '@storybook/react';

import { FileItem } from '@chayns-components/core';
import { useState } from 'react';
import Gallery from '../src/components/Gallery';

export default {
    title: 'Gallery/Gallery',
    component: Gallery,
    args: {
        files: [
            {
                id: 'first-image',
                file: {
                    id: '1',
                    url: 'https://tsimg.cloud/77896-21884/8aee1a304297729a4542b97325940a656a3da8f2.png',
                },
            },
            {
                id: 'second-image',
                file: {
                    id: '2',
                    url: 'https://tsimg.cloud/77896-21884/54a117f35e5fb57520e64471461af5491c0eff06.png',
                },
            },
            {
                id: 'third-image',
                file: {
                    id: '3',
                    url: 'https://tsimg.cloud/77896-21884/25399416f38c1d960f521a3530c8a2bc70a88bb9.png',
                },
            },
        ],
    },
} as Meta<typeof Gallery>;

const Template: StoryFn<typeof Gallery> = ({ ...args }) => {
    const [test, setTest] = useState(args.files);

    const handleAdd = (file: FileItem) => {
        setTest((prevState) => [...prevState, file]);
    };

    return <Gallery {...args} onAdd={handleAdd} files={test} />;
};

export const General = Template.bind({});

export const EditMode = Template.bind({});

EditMode.args = {
    isEditMode: true,
};
