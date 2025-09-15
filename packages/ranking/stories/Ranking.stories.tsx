import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import Ranking from '../src/components/ranking/Ranking';

export default {
    title: 'Ranking/Ranking',
    component: Ranking,
    args: {},
} as Meta<typeof Ranking>;

const Template: StoryFn<typeof Ranking> = ({ ...args }) => <Ranking {...args} />;

export const General = Template.bind({});
