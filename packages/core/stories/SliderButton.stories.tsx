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

const LongTemplate: StoryFn<typeof SliderButton> = (args) => {
    return (
        <div style={{ width: 200, border: '1px red solid' }}>
            <SliderButton {...args} />
        </div>
    );
};

export const General = Template.bind({});

export const Long = LongTemplate.bind({});

Long.args = {
    items: [
        { id: '45eujtdnc', text: 'A' },
        { id: 'erdjnerd', text: 'B' },
        { id: 'erdjnc', text: 'C' },
        { id: 'erdnxc', text: 'D' },
        { id: 'ejsdnxc', text: 'E' },
        { id: 'aejdmyncx', text: 'F' },
        { id: 'kswms4re5udrjk', text: 'G' },
        { id: '54weskr,zfxzj4', text: 'H' },
        { id: 'rsekmtxfdxj', text: 'I' },
        { id: '45kesrdytj', text: 'J' },
        { id: '4w5krsfxct', text: 'K' },
        { id: 'ejsdxtk', text: 'L' },
        { id: '45kjrstdfuh', text: 'M' },
        { id: 'gfbdgcjmndg', text: 'N' },
        { id: 'dfjrfdj', text: 'O' },
        { id: 'wezshx', text: 'P' },
        { id: 'wejusnfc', text: 'Q' },
        { id: 'weijkmfg', text: 'R' },
        { id: 'qw3zhsx', text: 'S' },
        { id: 'q3ktfdw', text: 'T' },
        { id: 'urjmfngx', text: 'U' },
        { id: 'ueklkjhgr', text: 'V' },
        { id: 'tuik4567uj', text: 'W' },
        { id: '4567ujhn', text: 'X' },
        { id: '5678ijhgf', text: 'Y' },
        { id: '567uzdz', text: 'Z' },
    ],
};
