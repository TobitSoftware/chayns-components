import type { FileItem } from '@chayns-components/core';

export const galleryStoryFiles: FileItem[] = [
    {
        id: 'first-image',
        file: {
            id: '1',
            url: 'https://tsimg.cloud/77896-21884/8aee1a304297729a4542b97325940a656a3da8f2.png',
            ratio: 1.6,
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
        id: 'fourth-image',
        file: {
            id: '4',
            url: 'https://tsimg.cloud/77896-21884/fce5e30f68c75c8c524cc9ac0887832f263b79ff.png',
            ratio: 1,
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

export const galleryViewerSquareFiles: FileItem[] = galleryStoryFiles.slice(0, 4);
