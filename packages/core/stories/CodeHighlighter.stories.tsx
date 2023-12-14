import { Meta, StoryFn } from '@storybook/react';
import CodeHighlighter from '../src/components/code-highlighter/CodeHighlighter';

export default {
    title: 'Core/CodeHighlighter',
    component: CodeHighlighter,
    args: {
        shouldShowLineNumbers: true,
        language: 'tsx',
    },
} as Meta<typeof CodeHighlighter>;

const Template: StoryFn<typeof CodeHighlighter> = ({ ...args }) => <CodeHighlighter {...args} />;

export const General = Template.bind({});

export const HighlightedLines = Template.bind({});
export const WithHTML = Template.bind({});
export const WithCss = Template.bind({});
export const WithMarkdown = Template.bind({});
export const WithGraphQL = Template.bind({});
export const WithYaml = Template.bind({});

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
