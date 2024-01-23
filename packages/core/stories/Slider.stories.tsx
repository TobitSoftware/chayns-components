import { Meta, StoryFn } from '@storybook/react';
import Slider from '../src/components/slider/Slider';

export default {
    title: 'Core/Slider',
    component: Slider,
    args: {
        maxValue: 100,
        minValue: 0,
    },
} as Meta<typeof Slider>;

const Template: StoryFn<typeof Slider> = (args) => {
    return <Slider {...args} />;
};

const WithFormatterTemplate: StoryFn<typeof Slider> = (args) => {
    const formatter = (value: number) => {
        return `${value} €`;
    };

    return <Slider {...args} thumbLableFormatter={formatter} />;
};

export const General = Template.bind({});

export const WithThumbLableFormatter = WithFormatterTemplate.bind({});

export const RangeSlider = Template.bind({});

WithThumbLableFormatter.args = {
    shouldShowThumbLable: true,
};

RangeSlider.args = {
    interval: {
        maxValue: 50,
        minValue: 10,
    },
};
