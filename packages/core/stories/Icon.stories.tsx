import { Meta, StoryFn } from '@storybook/react';
import Icon from '../src/components/icon/Icon';

export default {
    title: 'Core/Icon',
    component: Icon,
    args: {
        icons: ['ts-chayns'],
        isDisabled: false,
        shouldStopPropagation: false,
        size: 24,
    },
} as Meta<typeof Icon>;

const Template: StoryFn<typeof Icon> = (args) => <Icon {...args} />;

export const General = Template.bind({});

export const StackedIcon = Template.bind({});

General.args = {
    icons: ['ts-chayns'],
};

StackedIcon.args = {
    icons: ['fa fa-circle fa-stack-2x', 'fa fa-french-fries fa-inverse'],
    size: 64,
};
