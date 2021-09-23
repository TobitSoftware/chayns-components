import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '../src/components/button/Button';

export default {
    title: 'Core/Button',
    component: Button,
    args: {
        children: 'Click me!',
        className: '',
        icon: '',
        isDisabled: false,
        isSecondary: false,
        shouldStopPropagation: false,
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = Button;

export const General = Template.bind({});
