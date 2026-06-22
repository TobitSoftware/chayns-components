import { Meta, StoryFn } from '@storybook/react';
import React, { useRef, useState } from 'react';
import {
    CommunicationFileList,
    CommunicationFile,
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
    const [files, setFiles] = useState<CommunicationFile[]>([]);

    const ref = useRef<CommunicationInputRef>(null);

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
                topContent={<CommunicationFileList {...args} files={files} />}
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
