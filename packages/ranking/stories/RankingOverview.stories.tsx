import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import RankingOverview from '../src/components/ranking-overview/RankingOverview';

export default {
    title: 'Ranking/RankingOverview',
    component: RankingOverview,
    args: {},
} as Meta<typeof RankingOverview>;

const Template: StoryFn<typeof RankingOverview> = ({ ...args }) => <RankingOverview {...args} />;

export const General = Template.bind({});
