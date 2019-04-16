# Accordion-Component #

The Accordion-Component is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest

The Accordion-Component hides(actually removes) all child elements when it gets closed and makes the webpage faster. This gets very useful if many elements are stored in the accordion or if there are even wrapped accordions.


## Usage ##

At first the component has to be imported:

```jsx harmony
import { Accordion } from 'chayns-components';
```

Then it can be used like in the following:

```jsx harmony
<Accordion head="Hello">
    <div className="accordion__content">
        Hello World!
    </div>
</Accordion>
```

If you want to make an element and its children non-clickable, you simply have to add the class ``accordion--no-trigger`` to it.

## Props ##

The following properties can be set

| Property     | Description                                                            | Type                       | Default Value |
|--------------|------------------------------------------------------------------------|----------------------------|---------------|
| head         | Headline of the accordion                                              | String, node or object [1] | *required*    |
| children     | React components that should be stored in the accordion body           | React-Elements             | *required*    |
| right        | Node that get rendered in the right side of the accordion head         | React-Element              |               |
| renderClosed | Renders the accordion even if it is closed                             | bool                       | false         |
| isWrapped    | Makes this accordion a wrapped accordion                               | bool                       | false         |
| dataGroup    | Accordion group. Accordions of one group close each other on opening   | String                     |               |
| className    | CSS classes for the accordion                                          | String                     |               |
| id           | The accordions Id                                                      | String                     |               |
| icon         | The accordion icon                                                     | String/object              | 'ts-angle-right' |
| style        | Accordion styles                                                       | Object                     |               |
| styleBody    | Accordion body styles                                                  | Function                   |               |
| onOpen       | onOpened-Event                                                         | Function                   |               |
| onClose      | onClose-Event                                                          | Function                   |               |
| ellipsis     | Cuts the accordion headline if it is too long                          | bool                       |               |
| open         | true: the accordion will open, false: it will close                    | bool                       | undefined     |
| defaultOpened| The accordion is default opened                                        | bool                       |               |
| autogrow     | The accordion will adjust its height when opened                       | bool                       | false         |
| reference    | A reference for the accordion                                          | Function                   |               |
| noRotate     | Disable rotating of the icon                                           | Function                   |               |
| fixed        | Disable open/close logic                                               | bool                       |               |
| noIcon       | Remove Icon from the left                                              | bool                       | false         |
| onSearch     | Accordion search onChange callback (makes the search input visible)    | func                       |               |
| onSearchEnter | Accordion search onEnter callback (makes the search input visible)    | func                       |               |
| searchPlaceholder | Placeholder for the accordion search                              | string                     |               |
| removeContentClosed | Remove content from body when accordion is closing.             | bool                       | false         |
| onClick      | Click listener for head                                                | bool                       | false         |
| disabled     | Disables the accordion                                                 | bool                       | false         |

[1]: You can set an head for an open and a close accordion: ``head={{open: <Input/>, close: 'Text'}}``.

## Examples ##

You can take a look at the **examples** folder in the **react-chayns-accordion** repository. There you can find an appropriate way of implementing the **Accordion** to your chayns-Tapp.
