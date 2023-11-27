import { Meta, StoryFn } from '@storybook/react';
import TextArea from '../src/components/text-area/TextArea';

export default {
    title: 'Core/TextArea',
    component: TextArea,
    args: {
        placeholder: 'Nachricht schreiben',
    },
} as Meta<typeof TextArea>;

const Template: StoryFn<typeof TextArea> = (args) => <TextArea {...args} />;

export const General = Template.bind({});

export const MaxHeight = Template.bind({});

MaxHeight.args = {
    maxHeight: '200px',
};
