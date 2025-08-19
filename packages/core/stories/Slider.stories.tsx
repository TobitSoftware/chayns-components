import { Meta, StoryFn } from '@storybook/react';
import Slider from '../src/components/slider/Slider';
import React from 'react';

export default {
    title: 'Core/Slider',
    component: Slider,
    args: {
        maxValue: 100,
        minValue: 0,
    },
} as Meta<typeof Slider>;

const Template: StoryFn<typeof Slider> = (args) => {
    return (
        <>
            <div style={{ marginTop: 40 }} />
            <Slider {...args} />
        </>
    );
};

const WithFormatterTemplate: StoryFn<typeof Slider> = (args) => {
    const formatter = (value: number) => {
        return `${value} €`;
    };

    return (
        <>
            <div style={{ marginTop: 40 }} />
            <Slider {...args} thumbLabelFormatter={formatter} />
        </>
    );
};

export const General = Template.bind({});

export const RangeSlider = Template.bind({});

export const WithHighlightedSteps = Template.bind({});

export const WithThumbLabelFormatter = WithFormatterTemplate.bind({});

RangeSlider.args = {
    interval: {
        maxValue: 50,
        minValue: 10,
    },
};

WithHighlightedSteps.args = {
    minValue: 0,
    maxValue: 4,
    shouldHighlightSteps: true,
    step: 1,
};

WithThumbLabelFormatter.args = {
    shouldShowThumbLabel: true,
    maxValue: 13.37,
    minValue: 0,
};
