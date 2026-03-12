# @chayns-components/code-highlighter

React component package providing `CodeHighlighter` for chayns applications.

Documented components: `CodeHighlighter`.

## Import

```ts
import { CodeHighlighter } from '@chayns-components/code-highlighter';
```

## Typical Usage

```tsx
<CodeHighlighter
    copyButtonText={'Code kopieren'}
    shouldShowLineNumbers
    language={'tsx'}
    code={`import React from 'react';
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
    
    export default AppWrapper;`}
/>
```

## CodeHighlighter

`CodeHighlighter` is exported by `@chayns-components/code-highlighter` and should be imported from the public package entry point.

### Import

```ts
import { CodeHighlighter } from '@chayns-components/code-highlighter';
```

### Examples

#### General

```tsx
<CodeHighlighter
    copyButtonText={'Code kopieren'}
    shouldShowLineNumbers
    language={'tsx'}
    code={`import React from 'react';
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
    
    export default AppWrapper;`}
/>
```

#### Highlighted Lines

```tsx
<CodeHighlighter
    copyButtonText={'Code kopieren'}
    shouldShowLineNumbers
    language={'tsx'}
    highlightedLines={{
            added: [15, 16, 17, 18, 19],
            removed: [14],
            marked: [5],
        }}
    code={`import React from 'react';
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
    
    export default AppWrapper;`}
/>
```

#### With HTML

```tsx
<CodeHighlighter
    copyButtonText={'Code kopieren'}
    shouldShowLineNumbers
    language={'html'}
    code={`<!DOCTYPE html>
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
    `}
/>
```

#### With Css

```tsx
<CodeHighlighter
    copyButtonText={'Code kopieren'}
    shouldShowLineNumbers
    language={'css'}
    code={`body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      color: #333;
    }
    
    h1 {
      color: #0066cc;
    }
    `}
/>
```

#### With Markdown

```tsx
<CodeHighlighter
    copyButtonText={'Code kopieren'}
    shouldShowLineNumbers
    language={'markdown'}
    code={`# Markdown Beispiel
    
    Dies ist ein einfaches Beispiel für Markdown.
    
    - Listenelement 1
    - Listenelement 2
    - Listenelement 3
    
    **Fettgedruckter Text**
    
    *Kursiver Text*
    
    [Link zu Google](https://www.google.com/)
    `}
/>
```

#### With Graph QL

```tsx
<CodeHighlighter
    copyButtonText={'Code kopieren'}
    shouldShowLineNumbers
    language={'graphql'}
    code={`type Query {
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
    `}
/>
```

#### With Yaml

```tsx
<CodeHighlighter
    copyButtonText={'Code kopieren'}
    shouldShowLineNumbers
    language={'yaml'}
    code={`person:
      name: John Doe
      age: 30
      address:
        city: Example City
        zip: '12345'
      hobbies:
        - Reading
        - Hiking
        - Coding
    `}
/>
```

#### With Line Break

```tsx
<CodeHighlighter
    copyButtonText={'Code kopieren'}
    shouldShowLineNumbers
    language={''}
    code={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed rhoncus nunc. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Donec semper ante quis molestie vulputate. Praesent facilisis auctor turpis. Duis sodales dictum sem, id aliquet nisi faucibus egestas. Morbi volutpat dapibus feugiat.'}
    shouldWrapLines
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `CodeHighlighter` directly from `@chayns-components/code-highlighter` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/code-highlighter/src/...`; always use the public package export.
