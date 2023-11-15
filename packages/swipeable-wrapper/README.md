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

First you need to install the swipeable wrapper part of the chayns-components.

```bash
# NPM
npm install @chayns-components/swipeable-wrapper

# Yarn
yarn add @chayns-components/swipeable-wrapper
```

> **Information:** Since the components have now been implemented with the styled-components
> library, the styles are delivered directly with the components. There is no need to load an extra
> stylesheet anymore.

## Usage

You can use the components in your project as in the following example.

```typescript jsx
import { Icon } from '@chayns-components/icon';
import { SwipeableWrapper } from '@chayns-components/swipeable-wrapper';

<SwipeableWrapper
    leftActions={[
        {
            action: () => console.log('Delete action'),
            color: '#3B82F6',
            icon: <Icon icons={['fa fa-trash']} />,
            text: 'Delete',
        },
    ]}
    rightActions={
        [
            // Same structure as leftActions
        ]
    }
>
    <MyComponent />
</SwipeableWrapper>;
```
