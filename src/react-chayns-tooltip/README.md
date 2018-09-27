# Tooltip - Component #

The **Tooltip** - Component is part of the **chayns-component** package. You can install the whole package with the following statement:

    npm install -S chayns-components@latest

## Use ##

First of all import the component to a component of your own project.

```jsx
import { Tooltip } from 'chayns-components';
```

You can use your **Tooltip** like this:
```jsx
<Tooltip
    bindListeners
    position={3}
    content={{ text: 'This is a tooltip. Optional, you can add a headline and an image.' }}
>
    <a>Tooltip</a>
</Tooltip>
```

### Props ###
The component got the following properties:

| Property              | Description                                                                                                           | Type      | Default | Required|
|-----------------------|-----------------------------------------------------------------------------------------------------------------------|-----------|-------|-------|
| children              | React Node, that the tooltip should refer to. It will always be rendered to your page.                                | node      |       |true   |
| bindListeners         | Binds mouseover and mouseleave listeners to children. The tooltip will automatically be opened and closed on hover.   | bool      | false |       |
| position              | Position of the tooltip (0 = top right, 1 = bottom right, 2 = bottom left, 3 = top left).                             | number    | 0     |       |
| width                 | Width of the tooltip.                                                                                                 | number    | 250   |       |
| removeIcon            | Determines if the remove icon in the upper right corner will be shown.                                                | bool      | false |       |
| content               | Content of the tooltip. You can use the properties listed below.                                                      | object    |       | true  |
| content.text          | Text of the tooltip. It's required if you don't use html content.                                                     | string    |       | true  |
| content.headline      | Headline of the tooltip.                                                                                              | string    |       | false |
| content.imageUrl      | Url of the image shown in the tooltip.                                                                                | string    |       | false |
| content.buttonText    | Text of the button shown in the tooltip.                                                                              | string    |       | false |
| content.buttonOnClick | Function which will be set as onClick for the button shown in the tooltip.                                            | func      |       | false |
| content.html          | React Node which will be rendered in the tooltip. It's required if you don't use the text property                    | node      |       | true  |


#### Example ####

You can take a look at the **examples** folder in the **react-chayns-tooltip** repository. There you can find an appropriate way of implementing the **Tooltip** to your chayns-Tapp.
