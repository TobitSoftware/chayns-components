# Sharingbar

The Sharingbar is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage of the Sharingbar
At least one of the components has to be imported:

```jsx
import {Sharingbar} from 'chayns-components/react-chayns-sharingbar';
```


You can use the button like this:
```jsx
<Sharingbar/>
```

## Props
The following properties can be set on the Sharingbar-Component

| Property   | Description                                                                                        | Type    | Default Value |
|------------|-----------------------------------------------------------------------------------------------------|--------|--------------|
| link | The link shared by the sharingbar                                                           | String | Link to the current Site and Tapp |
| className | Additional CSS-Classes that should be set to the button                                                        | String |


### Examples
#### Share link
```jsx
 <Sharingbar link="https://www.facebook.com/tobit.software/"/>
```
