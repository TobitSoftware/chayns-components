import { Meta, StoryFn } from '@storybook/react';
import { Checkbox, Input } from '../src';
import Tooltip from '../src/components/tooltip/Tooltip';
import React from 'react';

export default {
    title: 'Core/Tooltip',
    component: Tooltip,
    args: {
        item: {
            headline: 'Info',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula nisi sapien, in vehicula elit malesuada sit amet. Vivamus ac ultricies felis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas felis ligula, pulvinar id ipsum sit amet, placerat blandit orci. Aenean purus magna, aliquam eu pellentesque blandit, maximus maximus quam. Vestibulum non elit vitae turpis efficitur tincidunt. Vestibulum pretium eleifend fermentum. Ut rutrum nec nisl quis mollis. Proin non erat ex. Integer nulla felis, lacinia sed fringilla sed, dignissim in neque. Etiam quis sem tempor, pulvinar neque ac, lobortis massa. Maecenas nec sapien erat. Donec nisl leo, sollicitudin id fermentum pellentesque, condimentum a ligula. Maecenas vel interdum ligula. In sagittis, nulla condimentum porta ornare, ante velit ornare tellus, et vehicula quam lacus luctus turpis.',
            button: { text: 'Hallo', onClick: () => alert('hallo') },
            imageUrl:
                'https://tsimg.cloud/77896-21884/25399416f38c1d960f521a3530c8a2bc70a88bb9.png',
        },
        itemWidth: '300px',
    },
} as Meta<typeof Tooltip>;

const Template: StoryFn<typeof Tooltip> = ({ children, ...args }) => (
    <Tooltip {...args}>{children}</Tooltip>
);

export const General = Template.bind({});

export const OnCheckbox = Template.bind({});

export const OnDeactivatedInput = Template.bind({});

General.args = {
    children: 'Hover me!',
};

OnCheckbox.args = {
    children: <Checkbox>Checkbox mit Tooltip</Checkbox>,
};

OnDeactivatedInput.args = {
    children: <Input isDisabled placeholder="Deaktiviert"></Input>,
    shouldUseChildrenWidth: true,
    item: {
        headline: undefined,
        text: 'Aktiviere den Agenten, um das Briefing zu testen.',
        imageUrl: undefined,
        button: undefined,
    },
    itemWidth: undefined,
};
