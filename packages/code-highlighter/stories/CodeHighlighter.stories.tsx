import { Meta, StoryFn } from '@storybook/react';
import CodeHighlighter from '../src/components/CodeHighlighter';

export default {
    title: 'CodeHighlighter/CodeHighlighter',
    component: CodeHighlighter,
    args: {},
} as Meta<typeof CodeHighlighter>;

const Template: StoryFn<typeof CodeHighlighter> = ({ ...args }) => <CodeHighlighter />;

export const General = Template.bind({});
