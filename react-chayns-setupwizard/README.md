# Tapp - Setup Wizard #

The **Tapp - Setup Wizard** - Component is part of the **tobit-chayns_component** package. You can install the whole package with the following statement:

    npm install --save-dev tobit-chayns_components

## Use ##


The **Setup Wizard** is usually used for setting up Tapps for the first time. My suggestion would be to create the Setup Wizard in the first component, which get rendered into the DOM. This allows you to difference between a normal site view and a setup and also allows you to render the normal view after finishing the setup.
For rendering the **Setup Wizard** you have to import *SetupWizard* as well as *SetupItem*.

```jsx
import {SetupWizard, SetupItem} from 'tobit-chayns_components/react-chayns-setupwizard';
import 'tobit-chayns_components/react-chayns-contextmenu/style.css';
```

The basic structure of the component will be the following:
```jsx
<SetupWizard ready={()=>{}}>
	<SetupItem title="First">
		<FirstSetup/>
	</SetupItem>
	<SetupItem title="Second">
		<SecondSetup/>
	</SetupItem>
	<SetupItem title="Third">
		<ThirdSetup/>
	</SetupItem>
</SetupWizard>
```

There are 3 different methods for changing the current step. You can access them in the Step-Components (for example FirstSetup, SecondSetup,...) through the context:
```jsx
 static contextTypes = {
     nextStep: React.PropTypes.func,
     previousStep: React.PropTypes.func,
     toStep: React.PropTypes.func
 };
```


 **Important:** You will need a bundler for the component styles. If you are not familiar with things like webpack or gulp take a look at our [chayns-React-ES6 Template ][1]. The bundler **must** include the node modules, otherwise you will get an compatibility error.



## Props ##
The components got the following properties:


**SetupWizard**:


| Property   | Description                                                                                        | Type   | Default | Required
|------------|-----------------------------------------------------------------------------------------------------|--------|-------|------|
| ready | callback-Function which gets called right after the last step finished | func |        | true |

**SetupItem**:


| Property   | Description                                                                                        | Type   | Default | Required
|------------|-----------------------------------------------------------------------------------------------------|--------|-------|------|
| title | The title which is shown in the menu over the **Setup-Wizard**-Content  | string | | |


## Example ##

You can take a look at the **examples** folder in the **react-chayns-setupwizard** repository. There you can find an appropriate way of implementing the **SetupWizard** to your chayns-Tapp

For starting the example you have to first install all dependencies...
```
npm i
```
... and the start the webpack-dev-server with the following command:
```
npm start
```

[1]:  https://github.com/TobitSoftware/chayns-template-es6-react