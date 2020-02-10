# ModeSwitch #

The ModeSwitch-Component is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components
    
The ModeSwitch-Component decides itself, whether to show the ModeSwitch and if so, which modes to show.


## Usage of the ModeSwitch ##

At first the component needs to be imported:

```jsx harmony
import { ModeSwitch } from 'chayns-components';
```

Afterwards the ModeSwitch-Component has to be initialized at any time (it is recommended to initialize it on tapp start).

```jsx harmony
<ModeSwitch 
    modes={[{
        id: 1,
        uacIds: [1],
        name: 'chayns-Manager'
    }]}
    save
    onChange={console.log}
/>
```

You should add the ModeSwitch-Component to the top-level div of your tapp. The ModeSwitch is positioned absolute. 


## Props ##

| Property   | Description                                                                                        | Type    | Default Value |
|------------|-----------------------------------------------------------------------------------------------------|--------|--------------|
| modes | Modes that will be added to the ModeSwitch (see Mode Object)                                                 | array |              |
| save | Saves the last active mode to the LocalStorage                                                        | bool   | false        |
| onChange    | Callback will be executed on mode switch. Returns the current group object                                                          | function |              |
| defaultMode    | Id of the mode that will be set on default                                                         | number |              |
| show    | Show the ModeSwitch Component                                                      | bool |              |

You should set the Show property only if you have more than two modes or the adminSwitch is not accessible.


## Mode Object ##

The mode object represents a mode in the ModeSwitch.
It requires an **id** and a **name**.
It is also possible to provide an array containing UAC group ids. This causes that the specific mode (group object) can only be selected by users, that are member of the specified uac groups.


## Usage of Mode ##

The mode component is used to display and hide other react components. The decision is made by the provided modes.

***Important: The mode property expects an ID that was provided on the ModeSwitches initialization , and not a uac group id***

A check for the Group '0' will check if the users hasn't selected any mode(username as mode name).

The component can be imported with the following line:
```jsx harmony
import { Mode } from 'chayns-components';
```

The following shows you the usage:
```jsx harmony
<Mode modes={[1]}>
    <div class="tapp__intro">
        Hello Admin
    </div>

    <div class="tapp__content">
        Secured Content
    </div>
</Mode>

<Mode modes={[0, 1563]}>
    <div class="tapp__intro">
        Hello Stranger
    </div>
</Mode>
```


| Property   | Description                                                                                         | Type        |  |
|------------|-----------------------------------------------------------------------------------------------------|-------------|----|
| modes | Modes to check for                                                                                       | array (Int) |  |
| children | Elements to render                                                                                    | node | |
| className | className of the rendered div                                                                         | string | |

Mode -1 will be shown if the user is not logged in.


## Usage of the ModeSwitch-Functions

The ModeSwitch-Component has some functions, which are static:

| Function | Description  | Parameter |
| -------- | ------------- | --------- |
| getCurrentMode | Returns the current mode. |  |
| addChangeListener | Sets a callback for the mode switch. | Function |
| removeChangeListener | Removes a callback. The callback function has to be provided as parameter. | Function |


## Example ##

You can take a look at the **examples** folder in the **react-chayns-modeswitch** repository. There you can find an appropriate way of implementing the **ModeSwitch** to your chayns-Tapp.
