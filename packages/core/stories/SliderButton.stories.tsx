import { Meta, StoryFn } from '@storybook/react';
import SliderButton from '../src/components/slider-button/SliderButton';
import React from 'react';

export default {
    title: 'Core/SliderButton',
    component: SliderButton,
    args: {
        items: [
            { id: 'montag', text: 'Mo.' },
            { id: 'dienstag', text: 'Di.' },
            { id: 'mittwoch', text: 'Mi.' },
            { id: 'donnerstag', text: 'Do.' },
            { id: 'freitag', text: 'Fr.' },
            { id: 'samstag', text: 'Sa.' },
            { id: 'sonntag', text: 'So.' },
        ],
    },
} as Meta<typeof SliderButton>;

const Template: StoryFn<typeof SliderButton> = (args) => {
    return <SliderButton {...args} />;
};

export const General = Template.bind({});

export const Expanded = Template.bind({});

Expanded.args = {
    items: [
        { id: 'montag', text: 'Montag' },
        { id: 'dienstag', text: 'Dienstag' },
        { id: 'mittwoch', text: 'Mittwoch' },
        { id: 'donnerstag', text: 'Donnerstag' },
        { id: 'freitag', text: 'Freitag' },
        { id: 'samstag', text: 'Samstag' },
        { id: 'sonntag', text: 'Sonntag' },
    ],
};
