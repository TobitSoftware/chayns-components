import { Meta, StoryFn } from '@storybook/react';
import SmallWaitCursor from '../src/components/small-wait-cursor/SmallWaitCursor';

export default {
    title: 'Core/SmallWaitCursor',
    component: SmallWaitCursor,
    args: {
        shouldHideBackground: false,
        shouldHideWaitCursor: false,
    },
} as Meta<typeof SmallWaitCursor>;

const Template: StoryFn<typeof SmallWaitCursor> = (args) => <SmallWaitCursor {...args} />;

export const General = Template.bind({});
