# Accordion-Component

The Accordion-Component is part of the _chayns-components_ package. It can be
installed via npm:

    npm install -S chayns-components@latest

The Accordion-Component hides(actually removes) all child elements when it gets
closed and makes the webpage faster. This gets very useful if many elements are
stored in the accordion or if there are even wrapped accordions.

## Usage

At first the component has to be imported:

```jsx harmony
import { Accordion } from 'chayns-components';
```

Then it can be used like in the following:

```jsx harmony
<Accordion head="Hello">
    <div className="accordion__content">Hello World!</div>
</Accordion>
```

If you want to make an element and its children non-clickable, you simply have
to add the class `accordion--no-trigger` to it.

## Props

The following properties can be set

| Property             | Description                                                                     | Type                       | Default Value    |
| -------------------- | ------------------------------------------------------------------------------- | -------------------------- | ---------------- |
| autogrow             | The accordion will adjust its height when opened                                | bool                       | false            |
| children             | React components that should be stored in the accordion body                    | React-Elements             | _required_       |
| className            | CSS classes for the accordion                                                   | String                     |                  |
| dataGroup            | Accordion group. Accordions of one group close each other on opening            | String                     |                  |
| defaultOpened        | The accordion is default opened                                                 | bool                       |                  |
| disabled             | Disables the accordion                                                          | bool                       | false            |
| ellipsis             | Cuts the accordion headline if it is too long                                   | bool                       |                  |
| fixed                | Disable open/close logic                                                        | bool                       |                  |
| head                 | Headline of the accordion                                                       | String, node or object [1] | _required_       |
| headClassNames       | CSS classes for the accordion head                                              | String, array or object    | null             |
| headCustomAttributes | Custom attributes for head element                                              | object                     | null             |
| headMultiline        | Allows line-wrap in accordion head title                                        | bool                       | false            |
| isWrapped            | Makes this accordion a wrapped accordion                                        | bool                       | false            |
| icon                 | The accordion icon                                                              | String/object              | 'ts-angle-right' |
| id                   | The accordions Id                                                               | String                     |                  |
| noIcon               | Remove Icon from the left                                                       | bool                       | false            |
| noRotate             | Disable rotating of the icon                                                    | Function                   |                  |
| onClick              | Click listener for head                                                         | bool                       | false            |
| onClose              | onClose-Event                                                                   | Function                   |                  |
| onOpen               | onOpened-Event                                                                  | Function                   |                  |
| onSearch             | Accordion search onChange callback (makes the search input visible)             | func                       |                  |
| onSearchEnter        | Accordion search onEnter callback (makes the search input visible)              | func                       |                  |
| open                 | true: the accordion will open, false: it will close                             | bool                       | undefined        |
| reference            | A reference for the accordion                                                   | Function                   |                  |
| removeContentClosed  | Remove content from body when accordion is closing.                             | bool                       | false            |
| renderClosed         | Renders the accordion even if it is closed                                      | bool                       | false            |
| right                | Node that get rendered in the right side of the accordion head                  | String, node or object [2] |                  |
| searchPlaceholder    | Placeholder for the accordion search                                            | string                     |                  |
| searchValue          | Value for the search input                                                      | string                     |                  |
| style                | Accordion styles                                                                | Object                     |                  |
| styleBody            | Accordion body styles                                                           | Function                   |                  |
| controlled           | When set, the open-prop updates and onChange does not update the internal state | bool                       | false            |

[1]: You can set a head for an open and a close accordion:
`head={{open: <Input/>, close: 'Text'}}`. [2]: You can set a right element for
an open and a close accordion:
`right={{open: <Input/>, close: <Badge>10</Badge>}}`.

## Examples

You can take a look at the **examples** folder in the **react-chayns-accordion**
repository. There you can find an appropriate way of implementing the
**Accordion** to your chayns-Tapp.
