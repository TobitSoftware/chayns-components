import { Meta, StoryFn } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import GalleryViewer from '../src/components/gallery-viewer/GalleryViewer';
import { GalleryViewMode } from '../src/types/gallery';
import {
    galleryPreviewFiles,
    galleryStoryFiles,
    galleryViewerSquareFiles,
    galleryVideoFiles,
} from './storyData';

const STORY_SURFACE_STYLE: React.CSSProperties = {
    maxWidth: '420px',
    padding: '16px',
    background: '#f5f6f8',
};

export default {
    title: 'Gallery/GalleryViewer',
    component: GalleryViewer,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Der read-only Viewer rendert bekannte Medien im Grid- oder Square-Layout und unterstützt das verzögerte Laden finaler Medien über `shouldLoadImages`.',
            },
        },
    },
    argTypes: {
        files: { control: false },
        shouldLoadImages: { control: 'boolean' },
        viewMode: {
            control: { type: 'inline-radio' },
            options: Object.values(GalleryViewMode),
        },
    },
    args: {
        files: galleryStoryFiles,
        shouldLoadImages: true,
        viewMode: GalleryViewMode.GRID,
    },
} as Meta<typeof GalleryViewer>;

const Template: StoryFn<typeof GalleryViewer> = (args) => (
    <div style={STORY_SURFACE_STYLE}>
        <GalleryViewer {...args} />
    </div>
);

const DeferredLoadTemplate: StoryFn<typeof GalleryViewer> = (args) => {
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
            <GalleryViewer
                {...args}
                files={galleryPreviewFiles}
                shouldLoadImages={shouldLoadImages}
            />
        </div>
    );
};

export const General = Template.bind({});

export const SquareMode = Template.bind({});

export const MixedMedia = Template.bind({});

export const SingleItemFallbackRatio = Template.bind({});

export const DeferredLoadPreviewFirst = DeferredLoadTemplate.bind({});

SquareMode.args = {
    files: galleryViewerSquareFiles,
    viewMode: GalleryViewMode.SQUARE,
};

MixedMedia.args = {
    files: galleryStoryFiles,
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

DeferredLoadPreviewFirst.args = {
    shouldLoadImages: false,
    files: galleryPreviewFiles,
};

export const VideoFocus = Template.bind({});

VideoFocus.args = {
    files: galleryVideoFiles,
};
