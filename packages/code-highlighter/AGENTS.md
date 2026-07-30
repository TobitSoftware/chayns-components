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

`CodeHighlighter` is exported by `@chayns-components/code-highlighter` and should be imported from
the public package entry point.

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
    code={
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed rhoncus nunc. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Donec semper ante quis molestie vulputate. Praesent facilisis auctor turpis. Duis sodales dictum sem, id aliquet nisi faucibus egestas. Morbi volutpat dapibus feugiat.'
    }
    shouldWrapLines
/>
```

#### Sticky Header

```tsx
<CodeHighlighter
    copyButtonText={'Code kopieren'}
    shouldShowLineNumbers
    language={'typescript'}
    code={Array.from({ length: 100 }, (_, index) => `console.log('Zeile ${index + 1}');`).join(
        '\n',
    )}
/>
```

#### With Insert Action

```tsx
<CodeHighlighter
    copyButtonText={'Code kopieren'}
    shouldShowLineNumbers
    language={'typescript'}
    code={`const greeting = 'Hello world';
    
    console.log(greeting);`}
    onInsertCode={(code) => {
        console.log('Insert code', code);
    }}
/>
```

#### Light

```tsx
<CodeHighlighter
    copyButtonText={'Code kopieren'}
    shouldShowLineNumbers
    language={'tsx'}
    code={General.args?.code}
    theme={CodeHighlighterTheme.Light}
/>
```

#### Dark

```tsx
<CodeHighlighter
    copyButtonText={'Code kopieren'}
    shouldShowLineNumbers
    language={'tsx'}
    code={General.args?.code}
    theme={CodeHighlighterTheme.Dark}
/>
```

#### Nested Scroll Container

```tsx
<CodeHighlighter
    copyButtonText={'Code kopieren'}
    shouldShowLineNumbers
    language={'typescript'}
    code={Array.from(
        { length: 80 },
        (_, index) => `const update${index + 1} = createUpdate(${index + 1});`,
    ).join('\n')}
/>
```

#### Virtualized Chat Message

```tsx
<CodeHighlighter copyButtonText={'Code kopieren'} shouldShowLineNumbers language={'tsx'} />
```

### Props

| name                    | type                                      | required | description                                                                                                            |
| ----------------------- | ----------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `code`                  | `string`                                  | yes      | The code that should be displayed.                                                                                     |
| `copyButtonText`        | `string \| undefined`                     | no       | The text that should be displayed after the copy button.<br />If not set, just the button is displayed without text.   |
| `highlightedLines`      | `HighlightedLines \| undefined`           | no       | The lines of code that should be highlighted.<br />Following lines can be highlighted: added, removed and just marked. |
| `language`              | `CodeHighlighterLanguage`                 | yes      | The language of the displayed code.                                                                                    |
| `onFormatError`         | `((error: unknown) => void) \| undefined` | no       | Function to be executed when the formatting of the code fails.                                                         |
| `onInsertCode`          | `((code: string) => void) \| undefined`   | no       | Function to be executed when the code should be inserted into another target.                                          |
| `shouldFormatCode`      | `boolean \| undefined`                    | no       | Whether the code should be formatted with prettier.                                                                    |
| `shouldShowLineNumbers` | `boolean \| undefined`                    | no       | Whether the line numbers should be displayed.                                                                          |
| `shouldWrapLines`       | `boolean \| undefined`                    | no       | Whether long lines should be wrapped.                                                                                  |
| `theme`                 | `CodeHighlighterTheme \| undefined`       | no       | The theme of the code block. Decide between dark and light.                                                            |

### Types

- `CodeHighlighterLanguage` ->
  `type CodeHighlighterLanguage =   | 'abap'   | 'abnf'   | 'actionscript'   | 'ada'   | 'agda'   | 'al'   | 'antlr4'   | 'apacheconf'   | 'apex'   | 'apl'   | 'applescript'   | 'aql'   | 'arduino'   | 'arff'   | 'asciidoc'   | 'asm6502'   | 'asmatmel'   | 'aspnet'   | 'autohotkey'   | 'autoit'   | 'avisynth'   | 'avroIdl'   | 'bash'   | 'basic'   | 'batch'   | 'bbcode'   | 'bicep'   | 'birb'   | 'bison'   | 'bnf'   | 'brainfuck'   | 'brightscript'   | 'bro'   | 'bsl'   | 'c'   | 'cfscript'   | 'chaiscript'   | 'cil'   | 'clike'   | 'clojure'   | 'cmake'   | 'cobol'   | 'coffeescript'   | 'concurnas'   | 'coq'   | 'cpp'   | 'crystal'   | 'csharp'   | 'cshtml'   | 'csp'   | 'cssExtras'   | 'css'   | 'csv'   | 'cypher'   | 'd'   | 'dart'   | 'dataweave'   | 'dax'   | 'dhall'   | 'diff'   | 'django'   | 'dnsZoneFile'   | 'docker'   | 'dot'   | 'ebnf'   | 'editorconfig'   | 'eiffel'   | 'ejs'   | 'elixir'   | 'elm'   | 'erb'   | 'erlang'   | 'etlua'   | 'excelFormula'   | 'factor'   | 'falselang'   | 'firestoreSecurityRules'   | 'flow'   | 'fortran'   | 'fsharp'   | 'ftl'   | 'gap'   | 'gcode'   | 'gdscript'   | 'gedcom'   | 'gherkin'   | 'git'   | 'glsl'   | 'gml'   | 'gn'   | 'goModule'   | 'go'   | 'graphql'   | 'groovy'   | 'haml'   | 'handlebars'   | 'haskell'   | 'haxe'   | 'hcl'   | 'hlsl'   | 'hoon'   | 'hpkp'   | 'hsts'   | 'html'   | 'http'   | 'ichigojam'   | 'icon'   | 'icuMessageFormat'   | 'idris'   | 'iecst'   | 'ignore'   | 'inform7'   | 'ini'   | 'io'   | 'j'   | 'java'   | 'javadoc'   | 'javadoclike'   | 'javascript'   | 'javastacktrace'   | 'jexl'   | 'jolie'   | 'jq'   | 'jsExtras'   | 'jsTemplates'   | 'jsdoc'   | 'json'   | 'json5'   | 'jsonp'   | 'jsstacktrace'   | 'jsx'   | 'julia'   | 'keepalived'   | 'keyman'   | 'kotlin'   | 'kumir'   | 'kusto'   | 'latex'   | 'latte'   | 'less'   | 'lilypond'   | 'liquid'   | 'lisp'   | 'livescript'   | 'llvm'   | 'log'   | 'lolcode'   | 'lua'   | 'magma'   | 'makefile'   | 'markdown'   | 'markupTemplating'   | 'markup'   | 'matlab'   | 'maxscript'   | 'mel'   | 'mermaid'   | 'mizar'   | 'mongodb'   | 'monkey'   | 'moonscript'   | 'n1ql'   | 'n4js'   | 'nand2tetrisHdl'   | 'naniscript'   | 'nasm'   | 'neon'   | 'nevod'   | 'nginx'   | 'nim'   | 'nix'   | 'nsis'   | 'objectivec'   | 'ocaml'   | 'opencl'   | 'openqasm'   | 'oz'   | 'parigp'   | 'parser'   | 'pascal'   | 'pascaligo'   | 'pcaxis'   | 'peoplecode'   | 'perl'   | 'phpExtras'   | 'php'   | 'phpdoc'   | 'plsql'   | 'powerquery'   | 'powershell'   | 'processing'   | 'prolog'   | 'promql'   | 'properties'   | 'protobuf'   | 'psl'   | 'pug'   | 'puppet'   | 'pure'   | 'purebasic'   | 'purescript'   | 'python'   | 'q'   | 'qml'   | 'qore'   | 'qsharp'   | 'r'   | 'racket'   | 'reason'   | 'regex'   | 'rego'   | 'renpy'   | 'rest'   | 'rip'   | 'roboconf'   | 'robotframework'   | 'ruby'   | 'rust'   | 'sas'   | 'sass'   | 'scala'   | 'scheme'   | 'scss'   | 'shellSession'   | 'smali'   | 'smalltalk'   | 'smarty'   | 'sml'   | 'solidity'   | 'solutionFile'   | 'soy'   | 'sparql'   | 'splunkSpl'   | 'sqf'   | 'sql'   | 'squirrel'   | 'stan'   | 'stylus'   | 'swift'   | 'systemd'   | 't4Cs'   | 't4Templating'   | 't4Vb'   | 'tap'   | 'tcl'   | 'textile'   | 'toml'   | 'tremor'   | 'tsx'   | 'tt2'   | 'turtle'   | 'twig'   | 'typescript'   | 'typoscript'   | 'unrealscript'   | 'uorazor'   | 'uri'   | 'v'   | 'vala'   | 'vbnet'   | 'velocity'   | 'verilog'   | 'vhdl'   | 'vim'   | 'visualBasic'   | 'warpscript'   | 'wasm'   | 'webIdl'   | 'wiki'   | 'wolfram'   | 'wren'   | 'xeora'   | 'xmlDoc'   | 'xojo'   | 'xquery'   | 'yaml'   | 'yang'   | 'zig'   | ''   | undefined;`
- `CodeHighlighterTheme` -> `enum CodeHighlighterTheme {     Light = 'light',     Dark = 'dark', }`
- `HighlightedLines` ->
  `interface HighlightedLines {     added?: number[];     removed?: number[];     marked?: number[]; }`

### Usage Notes

- Import `CodeHighlighter` directly from `@chayns-components/code-highlighter` instead of internal
  source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.
- Pay special attention to required props: `code`, `language`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/code-highlighter/src/...`; always
  use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
