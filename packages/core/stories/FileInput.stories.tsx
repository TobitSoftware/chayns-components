import { Meta, StoryFn } from '@storybook/react';
import FileInput from '../src/components/file-input/FileInput';

export default {
    title: 'Core/FileInput',
    component: FileInput,
    args: {},
} as Meta<typeof FileInput>;

const Template: StoryFn<typeof FileInput> = ({ ...args }) => <FileInput {...args}></FileInput>;

export const General = Template.bind({});
export const WithImageSelection = Template.bind({});

WithImageSelection.args = {
    imageSelectPlaceholder: 'Bild auswählen',
};
