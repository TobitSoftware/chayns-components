import { Meta, StoryFn } from '@storybook/react';
import type { FileItem } from '@chayns-components/core';
import React, { useState } from 'react';
import GalleryEditor from '../src/components/gallery-editor/GalleryEditor';
import { galleryStoryFiles } from './storyData';

export default {
    title: 'Gallery/GalleryEditor',
    component: GalleryEditor,
    args: {
        allowDragAndDrop: false,
        fileMinWidth: 100,
        files: galleryStoryFiles.slice(0, 3),
        maxFiles: 6,
    },
} as Meta<typeof GalleryEditor>;

const Template: StoryFn<typeof GalleryEditor> = ({ files: initialFiles, ...args }) => {
    const [files, setFiles] = useState(initialFiles);

    const handleAdd = (file: FileItem) => {
        setFiles((prevState = []) => [...prevState, file]);
    };

    const handleRemove = (fileToRemove: FileItem) => {
        setFiles((prevState = []) =>
            prevState.filter(
                (file) => file.id !== fileToRemove.id && file.file.url !== fileToRemove.file.url,
            ),
        );
    };

    return (
        <div style={{ maxWidth: '420px' }}>
            <GalleryEditor {...args} files={files} onAdd={handleAdd} onRemove={handleRemove} />
        </div>
    );
};

export const General = Template.bind({});

export const ReachedMaxFiles = Template.bind({});

export const CustomAddIcon = Template.bind({});

ReachedMaxFiles.args = {
    files: galleryStoryFiles.slice(0, 4),
    maxFiles: 4,
};

CustomAddIcon.args = {
    files: galleryStoryFiles.slice(0, 3),
    addFileIcon: 'fa fa-image-circle-plus',
};
