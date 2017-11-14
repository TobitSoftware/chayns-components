# SmallWaitCursor-Component #

The SmallWaitCursor-Component is part of the *chayns-components*-Package. You can install it with the following command:

    npm install -S chayns-components@latest


## Usage ##
You have to import the components and styles first:

```jsx
import { SmallWaitCursor } from 'chayns-components';
import 'chayns-components/lib/react-chayns-smallwaitcursor/index.css';
```


You can now use the components as followed:
```jsx
<SmallWaitCursor
    show
/>
```


### Props ###
You can set the following props on a AmountControl element:

| Property     | Description                                                                                                  | Type     | Default |
|--------------|--------------------------------------------------------------------------------------------------------------|----------|---------|
| show         | Renders the WaitCursor                                                                                       | bool     | false   |
| absolute     | Shows the WaitCursor in the center of the parent element (one of the parents needs to be position: relative) | bool     | false   |
| style        | style-object of the wrapper                                                                                  | object   |         |


### Examples ###
#### absolute positioning ####
The SmallWaitCursor could be centered horizontal and vertical using the absolute-prop and a relative wrapper:
```jsx
<div
    style={{
        position: 'relative',
        height: '200px'
    }}
>
    <SmallWaitCursor
        absolute
        show
    />
</div>
```