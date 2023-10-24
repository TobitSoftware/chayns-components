import { ComponentMeta, ComponentStory } from '@storybook/react';
import TextArea from '../src/components/text-area/TextArea';

export default {
    title: 'Core/TextArea',
    component: TextArea,
    args: {
        placeholder: 'Nachricht schreiben',
    },
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />;

export const General = Template.bind({});

export const MaxHeight = Template.bind({});

MaxHeight.args = {
    maxHeight: '200px',
};
