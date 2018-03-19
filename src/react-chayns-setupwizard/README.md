# Tapp - Setup Wizard #

The **Tapp - Setup Wizard** - Component is part of the **chayns-components** package. You can install the whole package with the following statement:

    npm install -S chayns-components@latest

## Use ##


The **Setup Wizard** is usually used for setting up Tapps for the first time. My suggestion would be to create the Setup Wizard in the first component, which get rendered into the DOM. This allows you to difference between a normal site view and a setup and also allows you to render the normal view after finishing the setup.
For rendering the **Setup Wizard** you have to import *SetupWizard* as well as *SetupWizardItem*.

```jsx
import {SetupWizard, SetupWizardItem} from 'chayns-components/react-chayns-setupwizard';
import 'chayns-components/lib/react-chayns-setupwizard/index.css';
```

The basic structure of the component will be the following:
```jsx
<SetupWizard ready={()=>{}}>
    <SetupWizardItem title="First">
        <FirstSetup/>
    </SetupWizardItem>
    <SetupWizardItem title="Second">
        <SecondSetup/>
    </SetupWizardItem>
    <SetupWizardItem title="Third">
        <ThirdSetup/>
    </SetupWizardItem>
</SetupWizard>
```

There are 3 different methods for changing the current step and one method for completing the current step. You can access them in the Step-Components (for example FirstSetup, SecondSetup,...) through the context:
```jsx
 static contextTypes = {
     stepComplete: PropTypes.func,
     nextStep: PropTypes.func,
     previousStep: PropTypes.func,
     toStep: PropTypes.func
 };
```

 **Note:** You have to call stepComplete with a boolean parameter for completing/not completing the current step.

 **Important:** You will need a bundler for the component styles. If you are not familiar with things like webpack or gulp take a look at our [chayns-React-ES6 Template ][1]. The bundler **must** include the node modules, otherwise you will get an compatibility error.



## Props ##
The components got the following properties:


**SetupWizard**:


| Property     | Description                                                                | Type   | Default | Required |
|--------------|----------------------------------------------------------------------------|--------|---------|----------|
| ready        | callback-Function which gets called right after the last step finished     | func   |         | true     |
| notComplete  | callback-Function which gets called after calling nextStep but step is required and not complete     | func   |         | true     |
| style        | style of the wizard-root-element                                           | object |         | false    |
| contentStyle | style of the wizard-content-element                                        | object |         | false    |

**SetupWizardItem**:


| Property   | Description                                                                                        | Type   | Default | Required
|------------|-----------------------------------------------------------------------------------------------------|--------|-------|------|
| title | The title which is shown in the menu over the **Setup-Wizard**-Content  | string | | |
| required | Sets the **Setup-Wizard-Item** required or not required  | string | | |


## Example ##

You may take a look at the **examples** folder in the **react-chayns-setupwizard** repository. There you can find an appropriate way of implementing the **SetupWizard** to your chayns®-Tapp

For starting the example you have to first install all dependencies...
```
npm i
```
... and the start the webpack-dev-server with the following command:
```
npm start
```

[1]:  https://github.com/TobitSoftware/chayns-template-es6-react
