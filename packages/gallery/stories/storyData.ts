import type { FileItem } from '@chayns-components/core';

const GALLERY_BASE64_PREVIEW =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjZDZkOGRlIi8+PGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjMiIGZpbGw9IiM5YWEwYWEiLz48cmVjdCB4PSI1IiB5PSIxNCIgd2lkdGg9IjE0IiBoZWlnaHQ9IjQiIHJ4PSIyIiBmaWxsPSIjOWFhMGFhIi8+PC9zdmc+';

const withPreview = (file: FileItem): FileItem => ({
    ...file,
    file:
        'thumbnailUrl' in file.file
            ? file.file
            : {
                  ...file.file,
                  meta: {
                      preview: GALLERY_BASE64_PREVIEW,
                      width: '24',
                      height: '24',
                  },
              },
});

export const galleryStoryFiles: FileItem[] = [
    {
        id: 'first-image',
        file: {
            id: '1',
            url: 'https://tsimg.cloud/77896-21884/8aee1a304297729a4542b97325940a656a3da8f2.png',
            ratio: 1.6,
            meta: {
                preview: GALLERY_BASE64_PREVIEW,
                width: '24',
                height: '24',
            },
        },
    },
    {
        id: 'second-image',
        file: {
            id: '2',
            url: 'https://tsimg.cloud/77896-21884/54a117f35e5fb57520e64471461af5491c0eff06.png',
            ratio: 1,
        },
    },
    {
        id: 'third-image',
        file: {
            id: '3',
            url: 'https://tsimg.cloud/77896-21884/25399416f38c1d960f521a3530c8a2bc70a88bb9.png',
            ratio: 1,
        },
    },
    {
        id: 'fourth-video',
        file: {
            id: '4',
            url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
            thumbnailUrl: 'https://picsum.photos/id/237/1200/900',
            ratio: 1.33,
        },
    },
    {
        id: 'fifth-image',
        file: {
            id: '5',
            url: 'https://picsum.photos/id/421/1200/900',
            ratio: 1.33,
        },
    },
];

export const galleryPreviewFiles: FileItem[] = galleryStoryFiles.map(withPreview);

export const galleryVideoFiles: FileItem[] = [galleryStoryFiles[3]];

export const galleryViewerSquareFiles: FileItem[] = galleryStoryFiles.slice(0, 4);
