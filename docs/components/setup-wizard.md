<div align="center"><h1>SetupWizard</h1></div>

A set of steps the user has to go through sequentially.

## Usage

You should have the `chayns-components` package installed. If that is not the
case already, run

```bash
yarn add chayns-components
```

or

```bash
npm i chayns-components
```

After the `chayns-components` package is installed, you can import the component
and use it with React:

```jsx
import React from 'react'
import { SetupWizard } from 'chayns-components';

// ...

<SetupWizard {...} />
```

## Methods

The setup wizard exposes several methods on its reference to control its flow:

-   `nextStep()` navigates to the next step
-   `stepComplete(isComplete, stepIndex = currentStep)` marks a step as
    complete/incomplete
-   `resetToStep(stepIndex)` resets the wizard up until a specific index
-   `stepEnabled(isEnabled, stepIndex)` enables or disables a specific step
-   `stepRequired(isRequired, stepIndex)` marks a specific step as required or
    optional

You can access them in any child components by using the
`withSetupWizardContext`
[higher-order component](https://reactjs.org/docs/higher-order-components.html):

```js
const FirstStep = withSetupWizardContext(
    ({ nextStep, stepComplete /* ... */ }) => {
        // ...
    }
);
```

## Props

The `SetupWizard`-component takes the following props:

| Name                                                    | Type                                  | Default                             | Required |
| ------------------------------------------------------- | ------------------------------------- | ----------------------------------- | :------: |
| [children](#children)                                   | `ReactNode`                           |                                     |          |
| [ready](#ready)                                         | `function`                            |                                     |          |
| [notComplete](#notcomplete)                             | `function`                            |                                     |          |
| [className](#classname)                                 | `string`                              |                                     |          |
| [style](#style)                                         | `{ [key: string]: string \| number }` |                                     |          |
| [contentStyle](#contentstyle)                           | `{ [key: string]: string \| number }` |                                     |          |
| [title](#title)                                         | `string`                              |                                     |          |
| [description](#description)                             | `ReactNode`                           |                                     |          |
| [numberOfSteps](#numberofsteps)                         | `number`                              |                                     |          |
| [allRequiredStepsCompleted](#allrequiredstepscompleted) | `function`                            |                                     |          |
| [initialStep](#initialstep)                             | `number`                              | `0`                                 |          |
| [disableShowStep](#disableshowstep)                     | `boolean`                             | `false`                             |          |
| [operationMode](#operationmode)                         | `enum`                                | `SetupWizard.operationMode.DEFAULT` |          |

### `children`

```ts
children?: ReactNode
```

An array of `SetupWizardItem` components.

---

### `ready`

```ts
ready?: function
```

A callback that is invoked after `nextStep` is called when the last step is
active and all required steps are completed.

---

### `notComplete`

```ts
notComplete?: function
```

A callback that is invoked after `nextStep` is called but some required steps
are not completed.

---

### `className`

```ts
className?: string
```

A classname string that will be applied to the container element.

---

### `style`

```ts
style?: { [key: string]: string | number }
```

A React style object that will be applied to the container element.

---

### `contentStyle`

```ts
contentStyle?: { [key: string]: string | number }
```

A React style object that will be applied to the content elements.

---

### `title`

```ts
title?: string
```

The title of the wizard.

---

### `description`

```ts
description?: ReactNode
```

The description of the wizard. Can be a `string` or a `ReactNode`.

---

### `numberOfSteps`

```ts
numberOfSteps?: number
```

The number of steps in the wizard.

---

### `allRequiredStepsCompleted`

```ts
allRequiredStepsCompleted?: function
```

A callback that is invoked when all required steps have been completed.

---

### `initialStep`

```ts
initialStep?: number
```

The initial step of the wizard.

---

### `disableShowStep`

```ts
disableShowStep?: boolean
```

Removes the number that is displayed in front of the title.

---

### `operationMode`

```ts
operationMode?: enum
```

Specifies the mode of the wizard. `0` is the regular behavior, `1` means that
all steps except the current one will be disabled and the user cannot manually
navigate between steps.
