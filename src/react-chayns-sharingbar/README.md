# SharingBar #

The SharingBar is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage of the SharingBar ##

At least one of the components has to be imported:

```jsx harmony
import { SharingBar } from 'chayns-components';
```

You can use the SharingBar like this:

```jsx harmony
<SharingBar/>
```

## Props ##

The following properties can be set on the SharingBar-Component

| Property   | Description                                                                                        | Type    | Default Value |
|------------|-----------------------------------------------------------------------------------------------------|--------|--------------|
| link | The link shared by the SharingBar                                                           | String | Link to the current Tapp |
| className | Additional CSS-Classes that should be set to the button                                                        | String |


## Examples ##

You can take a look at the **examples** folder in the **react-chayns-sharingbar** repository. There you can find an appropriate way of implementing the **SharingBar** to your chayns-Tapp.
