import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import FileSelect from '../src/components/file-select/FileSelect';

export default {
    title: 'Core/FileSelect',
    component: FileSelect,
    args: {},
} as Meta<typeof FileSelect>;

const Template: StoryFn<typeof FileSelect> = ({ ...args }) => {
    return <FileSelect />;
};

export const General = Template.bind({});
