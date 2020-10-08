# SharingBar

The SharingBar is part of the _chayns-components_ package. It can be installed
via npm:

    npm install -S chayns-components@latest

## Usage of the SharingBar

Import the component:

```jsx harmony
import { SharingBar } from 'chayns-components';
```

You can then use the SharingBar like this:

```jsx harmony
<SharingBar />
```

## Props

The following properties can be set on the SharingBar-Component

| Property        | Description                                             | Type   | Default Value            |
| --------------- | ------------------------------------------------------- | ------ | ------------------------ |
| link            | The link shared by the SharingBar                       | String | Link to the current Tapp |
| linkText        | A message added in front of the shared link             | String |                          |
| className       | Additional CSS-Classes that should be set to the button | String |                          |
| stopPropagation | Stops the click propagation to parent elements          | bool   | false                    |

## Examples

You can take a look at the **examples** folder in the
**react-chayns-sharingbar** repository. There you can find an appropriate way of
implementing the **SharingBar** to your chayns-Tapp.
