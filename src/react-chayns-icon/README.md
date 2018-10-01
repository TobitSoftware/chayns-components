# Icon

First, you need to [set a pro token to your npm config](https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers#installing-pro).
Ask your supervisor for a valid Font Awesome Pro token.

The icon Component is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage of the Icon
The icon component has to be imported:

```jsx
import { Icon } from 'chayns-components';
```

If you want to use a [Font Awesome Icon](https://fontawesome.com/icons), you also have to import the icon from the corresponding font awesome library. 
The Font Awesome library is already installed with the chayns-components.

```jsx
import { faGoogle } from '@fortawesome/free-brands-svg-icons'; /**Brands Style*/
import { faRocket } from '@fortawesome/pro-light-svg-icons'; /**Light Style*/
import { faCocktail } from '@fortawesome/pro-regular-svg-icons'; /**Regular Style*/
import { faCoffee } from '@fortawesome/pro-solid-svg-icons'; /**Solid Style*/
```

You can use the icon like this:
```jsx
<Icon icon={faGoogle} scale={4} color="blue"/>
<Icon icon="ts-bamboo" scale={2} color="#7DC23D"/>
```

## Props
The following properties can be set on the icon component

| Property     | Description                                                                       | Type            | Required | Default Value |
|--------------|-----------------------------------------------------------------------------------|-----------------|----------|---------------|
| icon         | The icon (TS-icon: string, FA-icon: object)                                       | string / object | true     |               |
| scale        | Additional styles that should be set to the input                                 | number          | false    | 1             |
| color        | Additional CSS-Classes that should be set to the button                           | string          | false    | undefined     |
