import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import MultiActionButton from '../src/components/multi-action-button/MultiActionButton';
import { MultiActionButtonStatusType } from '../src';

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

export const WidthOverride = Template.bind({});

WidthOverride.args = {
    width: 260,
};

export const FullWidth = Template.bind({});

FullWidth.args = {
    shouldUseFullWidth: true,
};

export const LongLabels = Template.bind({});

LongLabels.args = {
    primaryAction: {
        icon: 'fa fa-pen',
        label: 'Ein langes Label für den Test der Ellipsis',
    },
    secondaryAction: {
        icon: 'fa fa-microphone',
        label: 'Ein noch viel längeres Label das mit Sicherheit gekürzt werden muss!',
    },
};

export const CustomBackground = Template.bind({});

CustomBackground.args = {
    backgroundColor: '#0f6d7e',
};

export const OnlyPrimary = Template.bind({});

OnlyPrimary.args = {
    secondaryAction: undefined,
};

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
