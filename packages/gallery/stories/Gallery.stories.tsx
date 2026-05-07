import { Meta, StoryFn } from '@storybook/react';
import { FileItem } from '@chayns-components/core';
import React, { useState } from 'react';
import Gallery from '../src/components/Gallery';
import { GalleryViewMode } from '../src/types/gallery';
import { galleryStoryFiles, galleryViewerSquareFiles } from './storyData';

export default {
    title: 'Gallery/Gallery',
    component: Gallery,
    args: {
        files: galleryStoryFiles,
    },
} as Meta<typeof Gallery>;

const Template: StoryFn<typeof Gallery> = ({ ...args }) => {
    const [test, setTest] = useState(args.files);

    const handleAdd = (file: FileItem) => {
        setTest((prevState) => [...prevState, file]);
    };

    return (
        <div style={{ maxWidth: '420px' }}>
            <Gallery {...args} onAdd={handleAdd} files={test} />
        </div>
    );
};

export const General = Template.bind({});

export const EditMode = Template.bind({});

export const WrapperReadOnlySquare = Template.bind({});

export const EditModeCustomAddIcon = Template.bind({});

EditMode.args = {
    files: galleryStoryFiles.slice(0, 3),
    isEditMode: true,
    maxFiles: 6,
};

WrapperReadOnlySquare.args = {
    files: galleryViewerSquareFiles,
    viewMode: GalleryViewMode.SQUARE,
};

EditModeCustomAddIcon.args = {
    files: galleryStoryFiles.slice(0, 3),
    isEditMode: true,
    maxFiles: 6,
    addFileIcon: 'fa fa-image-circle-plus',
};
