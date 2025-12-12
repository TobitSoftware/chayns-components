import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import Input from '../src/components/input/Input';
import Button from '../src/components/button/Button';
import Icon from '../src/components/icon/Icon';
import { InputDesign } from '../src';
import { InputPlaceholderMode } from '../src/components/input/input-placeholder/InputPlaceholder.types';

export default {
    title: 'Core/Input',
    component: Input,
    args: {
        placeholder: 'Try me out',
        shouldUseAutoFocus: true,
    },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const General = Template.bind({});

export const WithAnimationElement = Template.bind({});

export const WithButton = Template.bind({});

export const WithLeftAndRightElement = Template.bind({});

WithAnimationElement.args = {
    animationElement: (
        <Icon color="var(--chayns-color--primary)" icons={['ts-sidekick']} size={20} />
    ),
    design: InputDesign.Rounded,
    shouldShowExpandAnimation: true,
    placeholder: 'Deine Frage',
};

WithButton.args = {
    rightElement: <Button onClick={() => {}}>Weiter</Button>,
    placeholder: 'Dein Name',
    placeholderMode: InputPlaceholderMode.Floating,
};

WithLeftAndRightElement.args = {
    animationElement: (
        <Icon color="var(--chayns-color--primary)" icons={['ts-sidekick']} size={20} />
    ),
    design: InputDesign.Rounded,
    leftElement: (
        <div
            style={{
                alignItems: 'center',
                display: 'flex',
                flex: '0 0 auto',
                justifyContent: 'center',
                paddingLeft: '10px',
            }}
        >
            <Icon icons={['fa fa-plus']} size={20} />
        </div>
    ),
    placeholder: 'Nachricht eingeben',
    rightElement: (
        <div
            style={{
                alignItems: 'center',
                backgroundColor: 'var(--chayns-color--primary)',
                borderRadius: '50%',
                display: 'flex',
                flex: '0 0 auto',
                height: '44px',
                justifyContent: 'center',
                width: '44px',
            }}
        >
            <Icon color="white" icons={['fa fa-paper-plane']} size={20} />
        </div>
    ),
    shouldShowExpandAnimation: true,
};
