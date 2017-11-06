# SharingBar

The SharingBar is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage of the SharingBar
At least one of the components has to be imported:

```jsx
import {SharingBar} from 'chayns-components';
import 'chayns-components/lib/react-chayns-sharingbar/index.css';
```


You can use the SharingBar like this:
```jsx
<SharingBar/>
```

## Props
The following properties can be set on the SharingBar-Component

| Property   | Description                                                                                        | Type    | Default Value |
|------------|-----------------------------------------------------------------------------------------------------|--------|--------------|
| link | The link shared by the SharingBar                                                           | String | Link to the current Site and Tapp |
| className | Additional CSS-Classes that should be set to the button                                                        | String |


### Examples
#### Share link
```jsx
 <SharingBar link="https://www.facebook.com/tobit.software/"/>
```
