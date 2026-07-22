import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import CodeHighlighter from '../src/components/code-highlighter/CodeHighlighter';
import { CodeHighlighterTheme } from '../src/types/codeHighlighter';

export default {
    title: 'CodeHighlighter/CodeHighlighter',
    component: CodeHighlighter,
    args: {
        copyButtonText: 'Code kopieren',
        shouldShowLineNumbers: true,
        language: 'tsx',
    },
} as Meta<typeof CodeHighlighter>;

const Template: StoryFn<typeof CodeHighlighter> = ({ ...args }) => <CodeHighlighter {...args} />;

const CHAT_HEADER_HEIGHT = 52;
const CHAT_VIEWPORT_HEIGHT = 420;

const ChatScrollContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div
        style={{
            border: '1px solid #d4d4d4',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            height: `${CHAT_VIEWPORT_HEIGHT}px`,
            overflow: 'hidden',
        }}
    >
        <div
            style={{
                alignItems: 'center',
                background: '#fafafa',
                borderBottom: '1px solid #d4d4d4',
                display: 'flex',
                flexShrink: 0,
                fontWeight: 600,
                height: `${CHAT_HEADER_HEIGHT}px`,
                padding: '0 16px',
            }}
        >
            Projektgruppe Sommerfest
        </div>
        <div
            style={{
                minHeight: 0,
                overflowY: 'scroll',
                padding: '0 16px 16px',
            }}
        >
            <div style={{ paddingTop: '16px' }}>{children}</div>
        </div>
    </div>
);

const VirtualizedChatMessageFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div
        className="message-row message-row--virtualized"
        style={{
            transform: 'translate3d(0, 0, 0)',
            willChange: 'height, margin-top, opacity, transform',
        }}
    >
        <div className="message-bubble" style={{ filter: 'brightness(1)', overflow: 'clip' }}>
            <div className="message-bubble__content-wrapper" style={{ position: 'relative' }}>
                <div
                    className="message-bubble__content-wrapper__content"
                    style={{ overflow: 'clip' }}
                >
                    <div className="message-text" style={{ overflow: 'clip' }}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const NestedScrollContainerTemplate: StoryFn<typeof CodeHighlighter> = (args) => (
    <ChatScrollContainer>
        <p>Neue Nachricht mit einem Code-Beispiel</p>
        <CodeHighlighter {...args} />
        <p>Ende der langen Nachricht</p>
    </ChatScrollContainer>
);

const VirtualizedChatMessageTemplate: StoryFn<typeof CodeHighlighter> = (args) => (
    <ChatScrollContainer>
        <p>Neue Nachricht vor dem langen Code-Beispiel</p>
        <VirtualizedChatMessageFrame>
            <CodeHighlighter {...args} />
        </VirtualizedChatMessageFrame>
        <p>Ende der langen Nachricht</p>
    </ChatScrollContainer>
);

export const General = Template.bind({});

export const HighlightedLines = Template.bind({});
export const WithHTML = Template.bind({});
export const WithCss = Template.bind({});
export const WithMarkdown = Template.bind({});
export const WithGraphQL = Template.bind({});
export const WithYaml = Template.bind({});
export const WithLineBreak = Template.bind({});
export const StickyHeader = Template.bind({});
export const Light = Template.bind({});
export const Dark = Template.bind({});
export const NestedScrollContainer = NestedScrollContainerTemplate.bind({});
export const VirtualizedChatMessage = VirtualizedChatMessageTemplate.bind({});

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

WithHTML.args = {
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meine HTML Seite</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Hallo, Welt!</h1>
  <p>Dies ist eine einfache HTML-Seite.</p>
  <script src="script.js"></script>
</body>
</html>
`,
    language: 'html',
};

WithCss.args = {
    code: `body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
  color: #333;
}

h1 {
  color: #0066cc;
}
`,
    language: 'css',
};

WithYaml.args = {
    code: `person:
  name: John Doe
  age: 30
  address:
    city: Example City
    zip: '12345'
  hobbies:
    - Reading
    - Hiking
    - Coding
`,
    language: 'yaml',
};

WithMarkdown.args = {
    code: `# Markdown Beispiel

Dies ist ein einfaches Beispiel für Markdown.

- Listenelement 1
- Listenelement 2
- Listenelement 3

**Fettgedruckter Text**

*Kursiver Text*

[Link zu Google](https://www.google.com/)
`,
    language: 'markdown',
};

WithGraphQL.args = {
    code: `type Query {
  getUser(id: ID!): User
}

type User {
  id: ID!
  username: String!
  email: String!
  posts: [Post]
}

type Post {
  id: ID!
  title: String!
  content: String!
}
`,
    language: 'graphql',
};

WithLineBreak.args = {
    code: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed rhoncus nunc. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Donec semper ante quis molestie vulputate. Praesent facilisis auctor turpis. Duis sodales dictum sem, id aliquet nisi faucibus egestas. Morbi volutpat dapibus feugiat.',
    language: '',
    shouldWrapLines: true,
};

StickyHeader.args = {
    code: Array.from({ length: 100 }, (_, index) => `console.log('Zeile ${index + 1}');`).join(
        '\n',
    ),
    language: 'typescript',
};

Light.args = {
    code: General.args?.code,
    language: 'tsx',
    theme: CodeHighlighterTheme.Light,
};

Dark.args = {
    code: General.args?.code,
    language: 'tsx',
    theme: CodeHighlighterTheme.Dark,
};

NestedScrollContainer.args = {
    code: Array.from(
        { length: 80 },
        (_, index) => `const update${index + 1} = createUpdate(${index + 1});`,
    ).join('\n'),
    language: 'typescript',
    shouldShowLineNumbers: true,
};
VirtualizedChatMessage.args = NestedScrollContainer.args;
