# Icon #

The icon Component is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage ##

The icon component has to be imported:

```jsx harmony
import { Icon } from 'chayns-components';
```


## Font Awesome ##

If you want to use a [Font Awesome Icon](https://fontawesome.com/icons), you also have to install the icon packages and import the icon from the corresponding font awesome library.

    npm i --save @fortawesome/pro-solid-svg-icons @fortawesome/pro-regular-svg-icons @fortawesome/pro-light-svg-icons @fortawesome/free-brands-svg-icons
    
or
    
    npm i --save @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons


```jsx harmony
import { faGoogle } from '@fortawesome/free-brands-svg-icons'; /**Brands Style*/
```

You can use the icon like this:
```jsx harmony
<Icon icon={faGoogle}/>
<Icon icon="ts-bamboo"/>
```


## Props ##

The following properties can be set on the icon component

| Property     | Description                                                                       | Type            | Required | Default Value |
|--------------|-----------------------------------------------------------------------------------|-----------------|----------|---------------|
| icon         | The icon (TS-icon: string, FA-icon: object)                                       | string / object | true     |               |
| style        | Additional styles that should be set to the icon                                  | string          | false    | undefined     |
| className    | Additional CSS-Classes that should be set to the icon                             | string / object | false    | undefined     |
