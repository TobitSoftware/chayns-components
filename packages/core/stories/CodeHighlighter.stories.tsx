import { Meta, StoryFn } from '@storybook/react';
import CodeHighlighter from '../src/components/code-highlighter/CodeHighlighter';

export default {
    title: 'CodeHighlighter/CodeHighlighter',
    component: CodeHighlighter,
    args: {
        shouldShowLineNumbers: true,
        language: 'jsx',
    },
} as Meta<typeof CodeHighlighter>;

const Template: StoryFn<typeof CodeHighlighter> = ({ ...args }) => <CodeHighlighter {...args} />;

export const General = Template.bind({});

export const HighlightedLines = Template.bind({});

General.args = {
    code: `import React from 'react';
import { ColorSchemeProvider } from '@chayns-components/core';
import { ChaynsProvider, getSite } from 'chayns-api';

const AppWrapper = () => {
    const { color, colorMode } = getSite();

    return (
        <ChaynsProvider>
            <ColorSchemeProvider 
                color={color} 
                colorMode={colorMode}
            >
                <YourComponent/>
            </ColorSchemeProvider>
        </ChaynsProvider>
    )
}

export default AppWrapper;`,
};

HighlightedLines.args = {
    highlightedLines: {
        added: [15, 16, 17, 18, 19],
        removed: [14],
        marked: [5],
    },
    code: `import React from 'react';
import { ColorSchemeProvider } from '@chayns-components/core';
import { ChaynsProvider, getSite } from 'chayns-api';

const AppWrapper = () => {
    const { color, colorMode } = getSite();

    return (
        <ChaynsProvider>
            <ColorSchemeProvider
                color={color}
                colorMode={colorMode}
            >
                <YourComponent/>
                <CodeHighlighter 
                    code={code} 
                    language="jsx"
                    theme={CodeHighlighterTheme.Dark}
                />
            </ColorSchemeProvider>
        </ChaynsProvider>
    )
}

export default AppWrapper;`,
};
