import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import MultiActionButton from '../src/components/multi-action-button/MultiActionButton';
import { MultiActionButtonStatusType } from '../src/components/multi-action-button/MultiActionButton.types';

export default {
    title: 'Core/MultiActionButton',
    component: MultiActionButton,
    args: {
        isDisabled: false,
        extendedTimeoutMs: 2000,
        shouldShowSecondaryLabelOnHover: true,
        primaryAction: {
            icon: 'fa fa-pen',
            label: 'Chatten',
        },
        secondaryAction: {
            icon: 'fa fa-microphone',
            label: 'Mitschnitt starten',
        },
    },
} as Meta<typeof MultiActionButton>;

const Template: StoryFn<typeof MultiActionButton> = (args) => <MultiActionButton {...args} />;

export const Default = Template.bind({});

export const PulsingSecondary = Template.bind({});
PulsingSecondary.args = {
    secondaryAction: {
        icon: 'fa fa-microphone',
        label: 'Mitschnitt starten',
        status: {
            type: MultiActionButtonStatusType.Pulse,
            pulseColor: 'rgba(255, 0, 0, 1)',
        },
    },
};
