import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import { Button, type FileItem } from '@chayns-components/core';
import React, { useEffect, useState } from 'react';
import Gallery from '../src/components/Gallery';
import { GalleryViewMode } from '../src/types/gallery';
import { galleryPreviewFiles, galleryStoryFiles, galleryViewerSquareFiles } from './storyData';

export default {
    title: 'Gallery/Gallery',
    component: Gallery,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Die Wrapper-Komponente entscheidet zwischen Viewer und Editor und steuert das optionale verzögerte Laden der finalen Medien. Die Stories zeigen die typischen Einsatzfälle sowie die neue Preview-first-Ladelogik.',
            },
        },
    },
    argTypes: {
        allowDragAndDrop: { control: 'boolean' },
        addFileIcon: { control: 'text' },
        doubleFileDialogMessage: { control: 'text' },
        fileMinWidth: { control: { type: 'number', min: 40, step: 10 } },
        files: { control: false },
        isEditMode: { control: 'boolean' },
        maxFiles: { control: { type: 'number', min: 1, step: 1 } },
        onAdd: { control: false },
        onFileCountChange: { control: false },
        onRemove: { control: false },
        shouldLoadImages: { control: 'boolean' },
        viewMode: {
            control: { type: 'inline-radio' },
            options: Object.values(GalleryViewMode),
        },
    },
    args: {
        files: galleryStoryFiles,
        isEditMode: false,
        shouldLoadImages: true,
        viewMode: GalleryViewMode.GRID,
    },
} as Meta<typeof Gallery>;

const Template: StoryFn<typeof Gallery> = (args) => {
    const [files, setFiles] = useState(args.files ?? []);

    useEffect(() => {
        setFiles(args.files ?? []);
    }, [args.files]);

    const handleAdd = (file: FileItem) => {
        action('onAdd')(file);
        setFiles((prevState) => [...prevState, file]);
    };

    const handleRemove = (fileToRemove: FileItem) => {
        action('onRemove')(fileToRemove);
        setFiles((prevState) =>
            prevState.filter(
                (file) => file.id !== fileToRemove.id && file.file.url !== fileToRemove.file.url,
            ),
        );
    };

    const handleFileCountChange = (fileCount: number) => {
        action('onFileCountChange')(fileCount);
    };

    return (
        <Gallery
            {...args}
            files={files}
            onAdd={handleAdd}
            onRemove={handleRemove}
            onFileCountChange={handleFileCountChange}
        />
    );
};

const DeferredLoadTemplate: StoryFn<typeof Gallery> = (args) => {
    const [shouldLoadImages, setShouldLoadImages] = useState(args.shouldLoadImages ?? false);

    useEffect(() => {
        setShouldLoadImages(args.shouldLoadImages ?? false);
    }, [args.shouldLoadImages]);

    return (
        <>
            <Button onClick={() => setShouldLoadImages(true)}>Bilder laden</Button>
            <Gallery {...args} shouldLoadImages={shouldLoadImages} files={galleryPreviewFiles} />
        </>
    );
};

export const General = Template.bind({});

export const ReadOnlySquare = Template.bind({});

export const DeferredLoadPreviewFirst = DeferredLoadTemplate.bind({});

export const EditMode = Template.bind({});

export const EditModeMaxFilesReached = Template.bind({});

export const EditModeCustomAddIcon = Template.bind({});

ReadOnlySquare.args = {
    files: galleryViewerSquareFiles,
    viewMode: GalleryViewMode.SQUARE,
};

DeferredLoadPreviewFirst.args = {
    shouldLoadImages: false,
};

EditMode.args = {
    files: galleryPreviewFiles.slice(0, 3),
    isEditMode: true,
    maxFiles: 6,
};

EditModeMaxFilesReached.args = {
    files: galleryPreviewFiles.slice(0, 4),
    isEditMode: true,
    maxFiles: 4,
};

EditModeCustomAddIcon.args = {
    files: galleryPreviewFiles.slice(0, 3),
    isEditMode: true,
    maxFiles: 6,
    addFileIcon: 'fa fa-image-circle-plus',
};
