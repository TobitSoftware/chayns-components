import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { CodeScanner } from '../src';

export default {
    title: 'Scanner/CodeScanner',
    component: CodeScanner,
    args: {
        errorMessages: {
            alreadyInUse: 'Die Kamera wird bereits von einer anderen Anwendung verwendet.',
            cameraNotAvailable: 'Die Kameranutzung ist nicht möglich.',
            noCodeFound: 'Es konnte kein Code gefunden werden.',
            noPermission: 'Um einen QR-Code zu scannen, aktiviere Deine Kamera.',
        },
    },
} as Meta<typeof CodeScanner>;

const Template: StoryFn<typeof CodeScanner> = ({ ...args }) => <CodeScanner {...args} />;

export const General = Template.bind({});
