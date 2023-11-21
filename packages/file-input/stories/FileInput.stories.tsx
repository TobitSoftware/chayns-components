import { Meta, StoryFn } from '@storybook/react';
import FileInput from '../src/components/FileInput';

export default {
    title: 'FileInput/FileInput',
    component: FileInput,
    args: {},
} as Meta<typeof FileInput>;

const Template: StoryFn<typeof FileInput> = ({ ...args }) => <FileInput {...args}></FileInput>;

export const General = Template.bind({});
