import { ComponentMeta, ComponentStory } from '@storybook/react';
import SmallWaitCursor from '../src/components/small-wait-cursor/SmallWaitCursor';

export default {
    title: 'Core/SmallWaitCursor',
    component: SmallWaitCursor,
    args: {
        shouldHideBackground: false,
        shouldHideWaitCursor: false,
    },
} as ComponentMeta<typeof SmallWaitCursor>;

const Template: ComponentStory<typeof SmallWaitCursor> = (args) => <SmallWaitCursor {...args} />;

export const General = Template.bind({});
