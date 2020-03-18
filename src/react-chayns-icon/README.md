# Icon #

The icon Component is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage ##

The icon component has to be imported:

```jsx harmony
import { Icon } from 'chayns-components';
```

You can use [Font Awesome Icons](https://fontawesome.com/icons) and [Tobit Software Icons](https://design.chayns.net/IconsundSymbole).
Therefor, you have to set the icon class name into the icon prop. 
For Font Awesome Icons, you also have to set the icon style (fa, fas, far, fal, fab).

Take a look at the [examples](https://github.com/TobitSoftware/chayns-components/tree/master/examples/react-chayns-icon) for an appropriate way of implementing the component to your chayns-Tapp. 

## Props ##

The following properties can be set on the icon component

| Property     | Description                                                                       | Type            | Required | Default Value |
|--------------|-----------------------------------------------------------------------------------|-----------------|----------|---------------|
| icon         | The icon (TS-icon: string, FA-icon: string or object)                             | string / object | true     |               |
| style        | Additional styles that should be set to the icon                                  | string          | false    | undefined     |
| className    | Additional CSS-Classes that should be set to the icon                             | string / object | false    | ''            |
| onClick      | OnClick listener to make icon clickable                                           | function        | false    | undefined     |
| disabled     | Disables clickable icons                                                          | boolean         | false    | false         |
| stopPropagation | Stops the click propagation to parent elements                                 | bool            | false    |               |

## Deprecated ##

Because of the problem, that it is not possible to use FontAwesome SVG icons to get the light, regular or solid icons 
according to the setting of the chayns site, we recommend using Font Icons instead of FontAwesome SVG icons. 
The icon font and icon definitions are provided through the chayns css api.

You simply have to change the SVGs to CSS class names and add the fa/fal/far/fas/fab-class. Here are a few examples:

````jsx harmony
<Icon icon="fa fa-coffee"/> // use site style
<Icon icon="far fa-coffee"/> // use regular style
<Icon icon="fal fa-coffee"/> // use light style
<Icon icon="fas fa-coffee"/> // use solid style
<Icon icon="fab fa-twitter"/> // brand icons need to use the brands style
````
