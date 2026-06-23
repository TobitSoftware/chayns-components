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
            loadingState: CommunicationLoadingState.UPLOADING,
        },
        {
            type: 'file',
            id: '2',
            url: '',
            mimeType: 'application/pdf',
            name: 'Presentation.pdf',
            size: 2048000,
            loadingState: CommunicationLoadingState.UPLOADING,
        },
        {
            type: 'video',
            id: '3',
            url: '',
            thumbnail: '',
            loadingState: CommunicationLoadingState.UPLOADING,
        },
    ]);

    const ref = useRef<CommunicationInputRef>(null);

    useEffect(() => {
        const timeout1 = setTimeout(() => {
            setFiles((prev) =>
                prev.map((file) =>
                    file.id === '1' && file.type === 'image'
                        ? {
                              ...file,
                              thumbnail:
                                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpUkXj1rlkIRJba5cjdAQEHFE1acYHsG8y9oWYSFeVbg&s=10',
                          }
                        : file,
                ),
            );
        }, 2000);

        const timeout2 = setTimeout(() => {
            setFiles((prev) =>
                prev.map((file) =>
                    file.id === '3' && file.type === 'video'
                        ? {
                              ...file,
                              thumbnail:
                                  'https://telecommunication-telemedia-assessment.github.io/AVT-VQDB-UHD-1/thumbs/new/test_1_bigbuck_bunny_8bit_15000kbps_1080p_60.0fps_h264.jpg',
                          }
                        : file,
                ),
            );
        }, 4000);

        const timeout3 = setTimeout(() => {
            setFiles((prev) =>
                prev.map((file) =>
                    file.id === '1' && file.type === 'image'
                        ? {
                              ...file,
                              url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpUkXj1rlkIRJba5cjdAQEHFE1acYHsG8y9oWYSFeVbg&s=10',
                              loadingState: CommunicationLoadingState.UPLOADED,
                          }
                        : file,
                ),
            );
        }, 6000);

        const timeout4 = setTimeout(() => {
            setFiles((prev) =>
                prev.map((file) =>
                    file.id === '2' && file.type === 'file'
                        ? {
                              ...file,
                              url: 'https://example.com/presentation.pdf',
                              loadingState: CommunicationLoadingState.UPLOADED,
                          }
                        : file,
                ),
            );
        }, 8000);

        // Nach 10 Sekunden: Video ist fertig
        const timeout5 = setTimeout(() => {
            setFiles((prev) =>
                prev.map((file) =>
                    file.id === '3' && file.type === 'video'
                        ? {
                              ...file,
                              url: 'https://avtshare01.rz.tu-ilmenau.de/avt-vqdb-uhd-1/test_1/segments/bigbuck_bunny_8bit_15000kbps_1080p_60.0fps_h264.mp4',
                              loadingState: CommunicationLoadingState.UPLOADED,
                          }
                        : file,
                ),
            );
        }, 10000);

        const timeout6 = setTimeout(() => {
            setFiles((prev) => [
                ...prev,
                {
                    type: 'image',
                    id: '4',
                    url: '',
                    thumbnail: '',
                    loadingState: CommunicationLoadingState.UPLOADING,
                },
            ]);
        }, 12000);

        const timeout7 = setTimeout(() => {
            setFiles((prev) =>
                prev.map((file) =>
                    file.id === '4' && file.type === 'image'
                        ? {
                              ...file,
                              url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTofbL0jwzE1oMQItSKlz_sbZ4feV1GMhp8_D7YjyLL_w&s=10',
                              thumbnail:
                                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTofbL0jwzE1oMQItSKlz_sbZ4feV1GMhp8_D7YjyLL_w&s=10',
                              loadingState: CommunicationLoadingState.UPLOADED,
                          }
                        : file,
                ),
            );
        }, 14000);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
            clearTimeout(timeout4);
            clearTimeout(timeout5);
            clearTimeout(timeout6);
            clearTimeout(timeout7);
        };
    }, []);

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
