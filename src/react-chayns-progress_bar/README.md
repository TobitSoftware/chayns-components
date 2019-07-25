# ProgressBar

The **ProgressBar** - Component is part of the **chayns-component** package. You can install the whole package with the following statement:

    npm install -S chayns-components@latest


## Usage ##

First of all the component has to be imported:

```jsx harmony
import { ProgressBar } from 'chayns-components';
```

You can use the **ProgressBar** like this to show a determinate progress bar:
```jsx harmony
<ProgressBar 
    value={10}
>
    Uploading (10%) ...
</ProgressBar>
```

It is also possible to show an indeterminate progress bar, when you do not know how long an operation will take:
```jsx harmony
<ProgressBar>
    Converting ...
</ProgressBar>
```


## Props ##

The component has the following properties:

| Property                | Description                                                                    | Type    | Default | Required |
|-------------------------|--------------------------------------------------------------------------------|---------|---------|----------|
| value                   | The current value of the ProgressBar (when possible)                           | number  |         | false    |
| children                | Text that is shown below the ProgressBar                                       | string  |         | false    |
| ready                   | Hides the ProgressBar and shows only the children string (animated transition) | boolean | false   | false    |

