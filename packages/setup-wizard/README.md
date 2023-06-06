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

First you need to install the setup wizard part of the chayns-components.

```bash
# NPM
npm install @chayns-components/setup-wizard

# Yarn
yarn add @chayns-components/setup-wizard
```

> **Information:** Since the components have now been implemented with the styled-components
> library, the styles are delivered directly with the components. There is no need to load an extra
> stylesheet anymore.

## Usage

You can use the components in your project as in the following example.

```typescript jsx
import { SetupWizard, SetupWizardItem } from '@chayns-components/setup-wizard';

<SetupWizard>
    <SetupWizardItem id={0} step={1} title="Intro">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
        et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est.
        Lorem ipsum dolor sit amet.
    </SetupWizardItem>
    <SetupWizardItem id={1} step={2} title="Info">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
        et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est.
        Lorem ipsum dolor sit amet.
    </SetupWizardItem>
</SetupWizard>;
```
