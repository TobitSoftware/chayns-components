import { Meta, StoryFn } from '@storybook/react';
import VerificationBadge from '../src/components/verification-badge/VerificationBadge';
import React from 'react';

export default {
    title: 'Core/VerificationBadge',
    component: VerificationBadge,
    args: {},
} as Meta<typeof VerificationBadge>;

const Template: StoryFn<typeof VerificationBadge> = () => <VerificationBadge />;

export const General = Template.bind({});
