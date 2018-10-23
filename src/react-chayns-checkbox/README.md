# Checkbox #

The Checkbox is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage ##

The checkbox has to be imported:

```jsx harmony
import { Checkbox } from 'chayns-components';
```

You can use the checkbox like this:
```jsx harmony
<Checkbox onChange={console.log} />
```


## Props ##

The following properties can be set on the Checkbox-Component

| Property            | Description                                                                                         | Type          | Default Value |
|---------------------|-----------------------------------------------------------------------------------------------------|---------------|---------------|
| style               | Additional styles that should be set to the checkbox                                                | Object        |               |
| className           | Additional CSS-Classes that should be add to the checkbox                                           | String        |               |
| label               | Label that will be shown next to the checkbox                                                       | String        |               |
| dangerouslySetLabel | Label that will be shown next to the checkbox                                                       | String (HTML) |               |
| children            | Label that will be shown next to the checkbox                                                       | String        |               |
| onChange            | onChange-event. Returns true or false                                                               | function      |               |
| toggleButton        | Renders checkbox as toggleButton (see [chayns-css wiki](https://github.com/TobitSoftware/chayns-css/wiki/form-elements#toggle-button)) | bool | false  |
| defaultChecked      | Set the default value of the checkbox                                                               | bool          | false         |
| checked             | Set the value of the checkbox                                                                       | bool          | false         |
| disabled            | Disables the checkbox                                                                               | bool          | false         |
| labelClassName      | Class names for the label                                                                           | string        |               |
| labelStyle          | Styles for the label                                                                                | string        |               |


## Example ##

You can take a look at the **examples** folder in the **react-chayns-checkbox** repository. There you can find an appropriate way of implementing the **CheckBox** to your chayns-Tapp.
