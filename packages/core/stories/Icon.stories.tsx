import { ComponentStory, ComponentMeta } from '@storybook/react';

import Icon from '../src/components/icon/Icon';

export default {
    title: 'Core/Icon',
    component: Icon,
    args: {
        icons: [],
        isDisabled: false,
        shouldStopPropagation: false,
        size: 24,
    },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const General = Template.bind({});

export const StackedIcon = Template.bind({});

General.args = {
    icons: ['ts-chayns'],
};

StackedIcon.args = {
    icons: ['fa fa-camera', 'fa fa-ban fa-stack-2x'],
};
