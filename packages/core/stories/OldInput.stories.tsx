import { Typewriter } from '@chayns-components/typewriter';
import { Meta, StoryFn } from '@storybook/react';
import Icon from '../src/components/icon/Icon';
import OldInput from '../src/components/old-input/OldInput';
import React from 'react';

export default {
    title: 'Core/OldInput',
    component: OldInput,
    args: {
        placeholder: 'Try me out',
    },
} as Meta<typeof OldInput>;

const Template: StoryFn<typeof OldInput> = (args) => <OldInput {...args} />;

export const General = Template.bind({});

export const WithRightElement = Template.bind({});

export const WithDynamicPlaceholders = Template.bind({});

WithRightElement.args = {
    rightElement: (
        <div
            style={{
                backgroundColor: '#3377b6',
                height: '42px',
                width: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Icon icons={['ts-calling-code']} size={25} color={'white'} />
        </div>
    ),
};

WithDynamicPlaceholders.args = {
    placeholder: (
        <Typewriter
            children={[
                'Erstelle mir einen Bericht über...',
                'Erkläre mir die Photosynthese.',
                'Wie sage ich auf englisch...',
            ]}
            shouldHideCursor
        />
    ),
};
