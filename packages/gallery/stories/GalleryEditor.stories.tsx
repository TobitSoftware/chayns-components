import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import type { FileItem } from '@chayns-components/core';
import React, { useEffect, useState } from 'react';
import GalleryEditor from '../src/components/gallery-editor/GalleryEditor';
import { galleryPreviewFiles, galleryStoryFiles, galleryVideoFiles } from './storyData';

const STORY_SURFACE_STYLE: React.CSSProperties = {
    maxWidth: '420px',
    padding: '16px',
    background: '#f5f6f8',
};

export default {
    title: 'Gallery/GalleryEditor',
    component: GalleryEditor,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Der Editor verwaltet lokale und externe Medien, unterstützt Drag-and-Drop und kann die endgültige Medienladung über `shouldLoadImages` verzögern.',
            },
        },
    },
    argTypes: {
        allowDragAndDrop: { control: 'boolean' },
        addFileIcon: { control: 'text' },
        doubleFileDialogMessage: { control: 'text' },
        fileMinWidth: { control: { type: 'number', min: 40, step: 10 } },
        files: { control: false },
        maxFiles: { control: { type: 'number', min: 1, step: 1 } },
        onAdd: { control: false },
        onFileCountChange: { control: false },
        onRemove: { control: false },
        shouldLoadImages: { control: 'boolean' },
    },
    args: {
        allowDragAndDrop: false,
        fileMinWidth: 100,
        files: galleryStoryFiles.slice(0, 3),
        maxFiles: 6,
        shouldLoadImages: true,
    },
} as Meta<typeof GalleryEditor>;

const Template: StoryFn<typeof GalleryEditor> = ({ files: initialFiles, ...args }) => {
    const [files, setFiles] = useState(initialFiles);

    useEffect(() => {
        setFiles(initialFiles);
    }, [initialFiles]);

    const handleAdd = (file: FileItem) => {
        action('onAdd')(file);
        setFiles((prevState = []) => [...prevState, file]);
    };

    const handleRemove = (fileToRemove: FileItem) => {
        action('onRemove')(fileToRemove);
        setFiles((prevState = []) =>
            prevState.filter(
                (file) => file.id !== fileToRemove.id && file.file.url !== fileToRemove.file.url,
            ),
        );
    };

    const handleCountChange = (fileCount: number) => {
        action('onFileCountChange')(fileCount);
    };

    return (
        <div style={STORY_SURFACE_STYLE}>
            <GalleryEditor
                {...args}
                files={files}
                onAdd={handleAdd}
                onRemove={handleRemove}
                onFileCountChange={handleCountChange}
            />
        </div>
    );
};

const DeferredLoadTemplate: StoryFn<typeof GalleryEditor> = (args) => {
    const [shouldLoadImages, setShouldLoadImages] = useState(args.shouldLoadImages ?? false);

    useEffect(() => {
        setShouldLoadImages(args.shouldLoadImages ?? false);
    }, [args.shouldLoadImages]);

    return (
        <div style={STORY_SURFACE_STYLE}>
            <button
                type="button"
                onClick={() => setShouldLoadImages(true)}
                style={{ marginBottom: 12 }}
            >
                Bilder laden
            </button>
            <GalleryEditor
                {...args}
                files={galleryPreviewFiles.slice(0, 4)}
                shouldLoadImages={shouldLoadImages}
            />
        </div>
    );
};

export const General = Template.bind({});

export const DenseLayout = Template.bind({});

export const MaxFilesReached = Template.bind({});

export const CustomAddIcon = Template.bind({});

export const DragAndDropEnabled = Template.bind({});

export const DeferredLoadPreviewFirst = DeferredLoadTemplate.bind({});

DenseLayout.args = {
    fileMinWidth: 140,
    files: galleryPreviewFiles.slice(0, 4),
};

MaxFilesReached.args = {
    files: galleryPreviewFiles.slice(0, 4),
    maxFiles: 4,
};

CustomAddIcon.args = {
    files: galleryPreviewFiles.slice(0, 3),
    addFileIcon: 'fa fa-image-circle-plus',
};

DragAndDropEnabled.args = {
    allowDragAndDrop: true,
    files: galleryPreviewFiles.slice(0, 3),
};

DeferredLoadPreviewFirst.args = {
    shouldLoadImages: false,
    files: galleryPreviewFiles.slice(0, 4),
};

export const VideoAndImages = Template.bind({});

VideoAndImages.args = {
    files: [...galleryStoryFiles.slice(0, 3), ...galleryVideoFiles],
};
