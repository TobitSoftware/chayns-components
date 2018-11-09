# Badge #

The Badge is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest

## Usage ##

The component has to be imported:

```jsx harmony
import { Badge } from 'chayns-components';
```

You can use the badge like this:

```jsx harmony
<Badge>1</Badge>
```


## Props ##

The following properties can be set on the Badge:

| Property   | Description                                                                                         | Type   | Default Value |
|------------|-----------------------------------------------------------------------------------------------------|--------|---------------|
| children   | Value of the badge                                                                                  | node   | *required*    |
| className  | ClassName added to the badge                                                                        | string |               |
| badgeRef   | Reference to the badge div                                                                          | func   |               |


## Example ##

You can take a look at the **examples** folder in the **react-chayns-badge** repository. There you can find an appropriate way of implementing the **Badge** to your chayns-Tapp.
