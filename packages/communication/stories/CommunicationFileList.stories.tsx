import { Meta, StoryFn } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';
import {
    CommunicationFileList,
    CommunicationFile,
    CommunicationImage,
    CommunicationVideo,
    CommunicationLoadingState,
    CommunicationInput,
    CommunicationInputRef,
} from '../src';

export default {
    title: 'Communication/CommunicationFileList',
    component: CommunicationFileList,
    args: {},
} as Meta<typeof CommunicationFileList>;

const Template: StoryFn<typeof CommunicationFileList> = (args) => {
    const [value, setValue] = useState('');
    const [files, setFiles] = useState<
        (CommunicationFile | CommunicationImage | CommunicationVideo)[]
    >([
        {
            type: 'image',
            id: '1',
            url: '',
            thumbnail: '',
            loadingState: CommunicationLoadingState.uploading,
        },
        {
            type: 'file',
            id: '2',
            url: '',
            mimeType: 'application/pdf',
            name: 'presentation.pdf',
            size: 2048000,
            loadingState: CommunicationLoadingState.uploading,
        },
        {
            type: 'video',
            id: '3',
            url: '',
            thumbnail: '',
            loadingState: CommunicationLoadingState.uploading,
        },
    ]);

    const ref = useRef<CommunicationInputRef>(null);

    // useEffect(() => {
    //     const timeout1 = setTimeout(() => {
    //         setFiles((prev) =>
    //             prev.map((file) =>
    //                 file.id === '1' && file.type === 'image'
    //                     ? {
    //                           ...file,
    //                           thumbnail:
    //                               'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    //                       }
    //                     : file,
    //             ),
    //         );
    //     }, 2000);
    //
    //     const timeout2 = setTimeout(() => {
    //         setFiles((prev) =>
    //             prev.map((file) =>
    //                 file.id === '3' && file.type === 'video'
    //                     ? {
    //                           ...file,
    //                           thumbnail:
    //                               'https://images.unsplash.com/photo-1485470733090-0c814525038f?w=400&h=300&fit=crop',
    //                       }
    //                     : file,
    //             ),
    //         );
    //     }, 4000);
    //
    //     const timeout3 = setTimeout(() => {
    //         setFiles((prev) =>
    //             prev.map((file) =>
    //                 file.id === '1' && file.type === 'image'
    //                     ? {
    //                           ...file,
    //                           url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    //                           loadingState: CommunicationLoadingState.uploaded,
    //                       }
    //                     : file,
    //             ),
    //         );
    //     }, 6000);
    //
    //     const timeout4 = setTimeout(() => {
    //         setFiles((prev) =>
    //             prev.map((file) =>
    //                 file.id === '2' && file.type === 'file'
    //                     ? {
    //                           ...file,
    //                           url: 'https://example.com/presentation.pdf',
    //                           loadingState: CommunicationLoadingState.uploaded,
    //                       }
    //                     : file,
    //             ),
    //         );
    //     }, 8000);
    //
    //     // Nach 10 Sekunden: Video ist fertig
    //     const timeout5 = setTimeout(() => {
    //         setFiles((prev) =>
    //             prev.map((file) =>
    //                 file.id === '3' && file.type === 'video'
    //                     ? {
    //                           ...file,
    //                           url: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4',
    //                           loadingState: CommunicationLoadingState.uploaded,
    //                       }
    //                     : file,
    //             ),
    //         );
    //     }, 10000);
    //
    //     const timeout6 = setTimeout(() => {
    //         setFiles((prev) => [
    //             ...prev,
    //             {
    //                 type: 'image',
    //                 id: '4',
    //                 url: '',
    //                 thumbnail: '',
    //                 loadingState: CommunicationLoadingState.uploading,
    //             },
    //         ]);
    //     }, 12000);
    //
    //     const timeout7 = setTimeout(() => {
    //         setFiles((prev) =>
    //             prev.map((file) =>
    //                 file.id === '4' && file.type === 'image'
    //                     ? {
    //                           ...file,
    //                           url: 'https://images.unsplash.com/photo-1495995424756-f1a16f8a6d85?w=400&h=300&fit=crop',
    //                           thumbnail:
    //                               'https://images.unsplash.com/photo-1495995424756-f1a16f8a6d85?w=400&h=300&fit=crop',
    //                           loadingState: CommunicationLoadingState.uploaded,
    //                       }
    //                     : file,
    //             ),
    //         );
    //     }, 14000);
    //
    //     return () => {
    //         clearTimeout(timeout1);
    //         clearTimeout(timeout2);
    //         clearTimeout(timeout3);
    //         clearTimeout(timeout4);
    //         clearTimeout(timeout5);
    //         clearTimeout(timeout6);
    //         clearTimeout(timeout7);
    //     };
    // }, []);

    const handleRemove = (fileId: string) => {
        setFiles((prev) => prev.filter((file) => file.id !== fileId));
    };

    return (
        <div
            style={{
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor, tortor at
                vehicula ultricies, lacus felis rutrum enim, ullamcorper aliquam sem orci non diam.
                Sed vulputate ullamcorper libero at molestie. Phasellus mi ipsum, dapibus a accumsan
                vel, efficitur quis quam. Etiam mollis turpis massa, eu volutpat dolor rhoncus eu.
                Vivamus vehicula, nulla ut posuere consectetur, dui massa pulvinar leo, condimentum
                semper quam massa vel nunc. Nullam dignissim ut sem a vulputate. Etiam eget sem
                orci. Nam et condimentum nunc, maximus auctor enim. Sed ultrices id sem ut pretium.
                Quisque luctus pellentesque erat. Nunc pharetra egestas massa, id laoreet lacus
                tempus et. Quisque ornare volutpat sem, nec fermentum nunc mattis sed. Nam aliquet
                mauris ut quam pellentesque efficitur. Nulla in justo dignissim, vulputate leo sit
                amet, suscipit felis. Aenean at orci tincidunt, placerat est quis, dapibus eros.
                Etiam tempor mollis ultrices.
            </p>

            <CommunicationInput
                topContent={
                    <CommunicationFileList {...args} files={files} onRemove={handleRemove} />
                }
                ref={ref}
                inputConfig={{
                    placeholder: 'Nachricht schreiben',
                    value,
                    onInput: (_: unknown, text: string) => setValue(text),
                }}
            />
        </div>
    );
};

export const General = Template.bind({});
