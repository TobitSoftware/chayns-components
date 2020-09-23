# InputBox

The InputBox is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage ##

It is used inside ChaynsComponents and actually not exported.
It could be imported directly, but will maybe removed in future releases.


## Props ##

The following properties can be set on the Input-Component

| Property       | Description                                                                                 | Type             | Default Value |
|----------------|---------------------------------------------------------------------------------------------|------------------|---------------|
| inputComponent | The component that should be used as input (requires at least onFocus-prop to work)         | React-Component  | Input         |
| children       | Element(s) that should be rendered inside the overlay-box                                   | React-Element(s) | *required*    |
| parent         | DOM-Element that should be used as parent                                                   | DOM-Element      | .tapp         |
| className      | className that should be set on the root-element                                            | String           |               |
| boxClassName   | className that should be set on the overlay-box                                             | String           |               |
| inputRef       | Reference to the input-element inside the InputBox (maybe a reference to a React-Component) | String           |               |

All other components will be given to the input component.

## Example ##

You can take a look at the **examples/react-chayns-input_box** folder.
