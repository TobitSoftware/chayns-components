# SetupWizard #

The **SetupWizard** - Component is part of the **chayns-components** package. You can install the whole package with the following statement:

    npm install -S chayns-components@latest


## Usage ##

The **SetupWizard** is usually used for setting up Tapps for the first time. 
My suggestion would be to create the Setup Wizard in the first component, which get rendered into the DOM. 
This allows you to difference between a normal site view and a setup and also allows you to render the normal view after finishing the setup.
For rendering the **SetupWizard** you have to import *SetupWizard* as well as *SetupWizardItem*.

There are different methods to update the wizard.
You can access them in the Step-Components (for example FirstStep, SecondStep,...) through the setupWizardContext:

- navigate through steps
    - nextStep()
    - previousStep()
    - toStep(step)
- set steps as complete or incomplete
    - stepComplete(value, step=currentStep)
- reset steps
    - resetToStep(step)
- enable or disable steps
    - stepEnabled(value, step)
- set steps as required or not    
    - stepRequired(value, currentStep)

You have to call stepComplete with a boolean parameter for completing/not completing the current step.

**Note:** The context is delivered through `withSetupWizardContext`.

### Example ###
Take a look at the [SetupWizard example](https://github.com/TobitSoftware/chayns-components/tree/master/examples/react-chayns-setupwizard) in the examples folder.

### Deprecation ###
`previousStep` and `toStep` are deprecated according to the design guide.

**The old context is deprecated and will be removed in a future version.**
 
## Props ##
The components got the following properties:

**SetupWizard**:

| Property     | Description                                                                | Type   | Required |
|--------------|----------------------------------------------------------------------------|--------|----------|
| ready        | callback-function which gets called right after nextStep is called on the last step when all required steps are completed. | func | true |
| notComplete  | callback-function which gets called after calling nextStep but step is required and not complete | func | true |
| allRequiredStepsCompleted | callback-function which gets called when all required steps are completed | func | true |
| style        | style of the wizard-root-element                                           | object | false    |
| contentStyle | style of the wizard-content-element                                        | object | false    |
| title        | title of the wizard                                                        | object | false    |
| description  | description of the wizard                                                  | object | false    |
| numberOfSteps| number of steps                                                            | number | true     |

**SetupWizardItem**:

| Property   | Description                                                                                        | Type                       | Required |
|------------|----------------------------------------------------------------------------------------------------|----------------------------|----------|
| title      | The title which is shown in the menu over the **Setup-Wizard**-Content                             | string                     | true     |
| required   | Sets the **Setup-Wizard-Item** required or not required                                            | string                     | false    |
| step       | step number (0-based)                                                                              | number                     | true     |
| right      | Node that get rendered in the right side of the accordion head                                     | String, node or object [1] | false    |

[1]: You can set a right element for a complete, and a not complete step: ``right={{complete: <Badge>Done!</Badge>, notComplete: <Badge>Not done!</Badge>}}``.
