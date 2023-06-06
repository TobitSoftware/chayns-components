import { ComponentMeta, ComponentStory } from '@storybook/react';
import FileInput from '../src/components/FileInput';

export default {
    title: 'FileInput/FileInput',
    component: FileInput,
    args: {},
} as ComponentMeta<typeof FileInput>;

const Template: ComponentStory<typeof FileInput> = ({ ...args }) => (
    <FileInput {...args}></FileInput>
);

export const General = Template.bind({});
