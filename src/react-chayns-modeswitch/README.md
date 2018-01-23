# ModeSwitch-Component

The ModeSwitch-Component is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components
    
The ModeSwitch-Component decides itself, whether to show the ModeSwitch and if so, which modes to show.

Note: In case you add the chayns-manager UAC-Group (1) at point of initialization, the ModeSwitch-Component relies on the 
the current chaynsId-settings which can be found at the top of each chayns site.

## Usage of the ModeSwitch
At first the component needs to be imported:

```jsx
import { ModeSwitch } from 'chayns-components';
```

Afterwards the ModeSwitch-Component has to be initialized at any time (it is recommended to initialize it on tapp start).

JSX initialization
```jsx
<ModeSwitch groups={[{
    id: 1,
    uacIds: [1],
    name: 'chayns-Manager'
}]}/>
```
JavaScript initialization
```javascript
ModeSwitch.init({
    groups: [{
        id: 1,
        uacIds: [1],
        name: 'chayns-Manager'
    }]
})
``` 

### Props
Both ways of initialization allow the following settings (No checking in the JavaScript variant):

| Property   | Description                                                                                        | Type    | Default Value |
|------------|-----------------------------------------------------------------------------------------------------|--------|--------------|
| groups | Groups that will be added to the ModeSwitch (see Group Object)                                                 | Array |              |
| save | Saves the last active mode to the LocalStorage                                                        | Bool   | false        |
| onChange    | Callback will be executed on mode switch. Returns the current group object                                                          | Function |              |


#### Group Object
The group object represents a group (mode) in the ModeSwitch.
It requires an *id** and a **name**.
It is also possible to provide an array containing UAC group ids. This causes that the specific mode (group object) can only be selected by users, that are member of the specified uac groups.

## Usage of Mode
The mode component is used to display and hide other react components. The decision is made by the provided groups/modes.

***Important: The group property expects an ID that was provided on the ModeSwitches initialization , and not a uac group id***

If more than one child element are provided, they will be put into a DIV element.

A check for the Group '0' will check if the users hasn't selected any mode(username as mode name).

The component can be imported with the following line:
```jsx
import { Mode } from 'chayns-components';
```

The following shows you the usage:
```jsx
<Mode mode={1}>
    <div class="tapp__intro">
        Hello Admin
    </div>

    <div class="tapp__content">
        Secured Content
    </div>
</Mode>

<Mode mode={[0, 1563]}>
    <div class="tapp__intro">
        Hello Stranger
    </div>
</Mode>
```



| Property   | Description                                                                                         | Type        |  |
|------------|-----------------------------------------------------------------------------------------------------|-------------|----|
| mode | Mode to check for                                                                                         | Int         |  |
| modes | Modes to check for                                                                                       | Array (Int) |  |
| group | Mode to check for                                                                                        | Int | **deprecated** |
| group | Modes to check for                                                                                      | Array (Int) | **deprecated** |
| children | Elements to render                                                                                    | React-Component(s) | |

## Usage of connectToModeSwitch
ConnectToModeSwitch is the Decorator-Variant of mode. It only takes no parameter or an array as parameter.
The current mode will be provideded as mode prop to the specific react element.
If an array is provided, it will be checked whether one of the modes contained in the array is selected. Based to this, the react element will be rendered, or not.
The props of the react element will be forwarded.

### Example
```jsx
import { connectToModeSwitch } from 'chayns-components';

@connectToModeSwitch([1])
export default class Example extends React.Component {
    render() {
        return(
            <div>
                Decorators<br />
                {JSON.stringify(this.props.mode)}
            </div>
        );
    }
}
```

## Usage of the ModeSwitch-Functions
The ModeSwitch-Component has some functions, which are static and may be called independent of React:

| Function | Description  | Parameter |
| -------- | ------------- | --------- |
| getCurrentMode | Returns the current mode. |  |
| addChangeListener | Sets a callback for the mode switch. | Function |
| removeChangeListener | Removes a callback. The callback function has to be provided as parameter. | Function |
| hide | Hides the modeswitch (using chaynsAPI). |  |
| show | Shows the modeswitch (using chaynsAPI). |  |
| isUserInGroup | Returns whether the current user is in a specific user-group. | int |
| isChaynsManager | Returns whether the current user is in the chayns® Manager group. | int |
