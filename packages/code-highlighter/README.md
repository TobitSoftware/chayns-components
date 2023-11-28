<div align="center">
    <h1>
        <img src="https://raw.githubusercontent.com/TobitSoftware/chayns-components/master/assets/logo.png" width="600px" alt="chayns-components" />
    </h1>
    <p>A set of beautiful React components for developing your own applications with chayns.</p>
    <div>
        <img src="https://img.shields.io/npm/dm/@chayns-components/typewriter.svg?style=for-the-badge" alt="" />
        <img src="https://img.shields.io/npm/v/@chayns-components/typewriter?style=for-the-badge" alt="" />
        <img src="https://img.shields.io/github/license/TobitSoftware/chayns-components?style=for-the-badge" alt="" />
        <img src="https://img.shields.io/github/contributors/TobitSoftware/chayns-components?style=for-the-badge" alt="" />
    </div>
</div>

---

## Installation

First you need to install the code highlighter part of the chayns-components.

```bash
# NPM
npm install @chayns-components/code-highlighter

# Yarn
yarn add @chayns-components/code-highlighter
```

> **Information:** Since the components have now been implemented with the styled-components
> library, the styles are delivered directly with the components. There is no need to load an extra
> stylesheet anymore.

## Usage

You can use the components in your project as in the following example.

```typescript jsx
import { CodeHighlighter } from '@chayns-components/typewriter';

<CodeHighlighter>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
    ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
    dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est. Lorem ipsum dolor
    sit amet.
</CodeHighlighter>;
```
