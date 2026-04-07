import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import GalleryViewer from '../src/components/gallery-viewer/GalleryViewer';
import { GalleryViewMode } from '../src/types/gallery';
import { galleryStoryFiles, galleryViewerSquareFiles } from './storyData';

export default {
    title: 'Gallery/GalleryViewer',
    component: GalleryViewer,
    args: {
        files: galleryStoryFiles,
        viewMode: GalleryViewMode.GRID,
    },
} as Meta<typeof GalleryViewer>;

const Template: StoryFn<typeof GalleryViewer> = (args) => (
    <div style={{ maxWidth: '420px' }}>
        <GalleryViewer {...args} />
    </div>
);

export const General = Template.bind({});

export const SquareMode = Template.bind({});

export const SingleItemFallbackRatio = Template.bind({});

SquareMode.args = {
    files: galleryViewerSquareFiles,
    viewMode: GalleryViewMode.SQUARE,
};

SingleItemFallbackRatio.args = {
    files: [
        {
            id: 'single-fallback-image',
            file: {
                id: 'fallback-1',
                url: 'https://picsum.photos/id/1025/1200/900',
            },
        },
    ],
};
