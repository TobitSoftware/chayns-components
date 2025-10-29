import { Meta, StoryFn } from '@storybook/react';
import PositionInput from '../src/components/position-input/PositionInput.constants';
import React from 'react';

export default {
    title: 'Maps/PositionInput',
    component: PositionInput,
    args: {
        apiToken: 'AIzaSyCicm5YKKdfym2UtjVwuoSvMAL9uKD_yxo',
        searchPlaceholder: 'Stadt suchen',
    },
} as Meta<typeof PositionInput>;

const Template: StoryFn<typeof PositionInput> = ({ ...args }) => <PositionInput {...args} />;

export const General = Template.bind({});
