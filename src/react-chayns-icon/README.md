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

If you have a [Font Awesome Pro Subscription](https://fontawesome.com/pro), you can use the pro icon packages:

    npm i --save @fortawesome/pro-solid-svg-icons @fortawesome/pro-regular-svg-icons @fortawesome/pro-light-svg-icons @fortawesome/free-brands-svg-icons
    
Otherwise, you have to install the free packages:
    
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
