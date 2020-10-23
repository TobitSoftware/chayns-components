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
