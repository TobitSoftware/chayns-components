import { Meta, StoryFn } from '@storybook/react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MultiActionButton from '../src/components/multi-action-button/MultiActionButton';
import { MultiActionButtonStatusType, MultiActionButtonHeight } from '../src';

export default {
    title: 'Core/MultiActionButton',
    component: MultiActionButton,
    args: {
        isDisabled: false,
        extendedTimeoutMs: 2000,
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
            pulseColors: ['#A50000', '#630000'],
        },
    },
};

export const PulsingSecondaryCustomColors = Template.bind({});

PulsingSecondaryCustomColors.args = {
    secondaryAction: {
        icon: 'fa fa-microphone',
        label: 'Mitschnitt starten',
        status: {
            type: MultiActionButtonStatusType.Pulse,
            pulseColors: ['#00A500', '#006300'],
        },
    },
};

export const LargeSize = Template.bind({});

LargeSize.args = {
    height: MultiActionButtonHeight.Large,
};

export const DisabledActionWithReason = Template.bind({});

DisabledActionWithReason.args = {
    secondaryAction: {
        icon: 'fa fa-microphone',
        label: 'Mitschnitt starten',
        isDisabled: true,
        disabledReason:
            'Verwende die Sidekick™ App oder den Sidekick™ Desktop Client, um Mitschnitte zu erstellen.',
    },
};

export const ReactElementIcons = Template.bind({});

ReactElementIcons.args = {
    primaryAction: {
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2 14.7 9.3 22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7L12 2z" />
            </svg>
        ),
        label: 'Chatten',
    },
    secondaryAction: {
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3a4 4 0 0 1 4 4v5a4 4 0 1 1-8 0V7a4 4 0 0 1 4-4zm-6 9a1 1 0 1 1 2 0 4 4 0 0 0 8 0 1 1 0 1 1 2 0 6 6 0 0 1-5 5.91V21h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-3.09A6 6 0 0 1 6 12z" />
            </svg>
        ),
        label: 'Mitschnitt starten',
    },
};

type RecordingStage = 'idle' | 'started' | 'recording' | 'stopped';

const recordingLabelByStage: Record<RecordingStage, string> = {
    idle: 'Mitschnitt starten',
    started: 'Mitschnitt gestartet',
    recording: 'Beenden (01:23)',
    stopped: 'Mitschnitt beendet',
};

export const RecordingFlow: StoryFn<typeof MultiActionButton> = (args) => {
    const [stage, setStage] = useState<RecordingStage>('idle');
    const timeoutRef = useRef<number | null>(null);
    const collapseDelay = args.extendedTimeoutMs ?? 2000;

    const clearTimer = useCallback(() => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    const scheduleStage = useCallback(
        (nextStage: RecordingStage) => {
            clearTimer();
            timeoutRef.current = window.setTimeout(() => setStage(nextStage), collapseDelay);
        },
        [clearTimer, collapseDelay],
    );

    useEffect(
        () => () => {
            clearTimer();
        },
        [clearTimer],
    );

    const handleSecondaryClick = useCallback(() => {
        if (stage === 'idle') {
            setStage('started');
            scheduleStage('recording');
            return;
        }

        if (stage === 'recording' || stage === 'started') {
            setStage('stopped');
            scheduleStage('idle');
        }
    }, [scheduleStage, stage]);

    const resolvedSecondaryAction = useMemo(
        () => ({
            icon: 'fa fa-microphone',
            ...args.secondaryAction,
            label: recordingLabelByStage[stage],
            onClick: handleSecondaryClick,
        }),
        [args.secondaryAction, handleSecondaryClick, stage],
    );

    return <MultiActionButton {...args} secondaryAction={resolvedSecondaryAction} />;
};
