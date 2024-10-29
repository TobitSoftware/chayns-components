import { Meta, StoryFn } from '@storybook/react';
import SliderButton from '../src/components/slider-button/SliderButton';

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

const ScrollableTemplate: StoryFn<typeof SliderButton> = (args) => {
    return (
        <div style={{ width: 200 }}>
            <SliderButton {...args} />
        </div>
    );
};

export const General = Template.bind({});

export const FullWidth = Template.bind({});

export const Scrollable = ScrollableTemplate.bind({});

Scrollable.args = {
    items: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
        { id: 'c', text: 'C' },
        { id: 'd', text: 'D' },
        { id: 'e', text: 'E' },
        { id: 'f', text: 'F' },
        { id: 'g', text: 'G' },
        { id: 'h', text: 'H' },
        { id: 'i', text: 'I' },
        { id: 'j', text: 'J' },
        { id: 'k', text: 'K' },
        { id: 'l', text: 'L' },
        { id: 'm', text: 'M' },
        { id: 'n', text: 'N' },
        { id: 'o', text: 'O' },
        { id: 'p', text: 'P' },
        { id: 'q', text: 'Q' },
        { id: 'r', text: 'R' },
        { id: 's', text: 'S' },
        { id: 't', text: 'T' },
        { id: 'u', text: 'U' },
        { id: 'v', text: 'V' },
        { id: 'w', text: 'W' },
        { id: 'x', text: 'X' },
        { id: 'y', text: 'Y' },
        { id: 'z', text: 'Z' },
    ],
    selectedId: 'm',
};

FullWidth.args = {
    shouldUseFullWidth: true,
    items: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
        { id: 'c', text: 'C' },
    ],
};
