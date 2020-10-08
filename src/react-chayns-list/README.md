# List

The List-Component is part of the _chayns-components_ package. It can be
installed via npm:

    npm install -S chayns-components@latest

## Usage

The List and ListItem has to be imported:

```jsx harmony
import { List, ListItem } from 'chayns-components';
```

You can use the List like this:

```jsx harmony
<List>
    <ListItem
        title="Hello World!"
        subtitle="Description"
        image="https://chayns.tobit.com/storage/60038-22141/Images/icon-72.png"
    />
    <ListItem
        title="Hello World!"
        subtitle="Description"
        image="https://chayns.tobit.com/storage/60038-22141/Images/icon-72.png"
    >
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren,
    </ListItem>
</List>
```

# Props of List

| Property      | Description                                                                                                                       | Type           | Default Value |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------- |
| className     | ClassName that should be set on the List-Component                                                                                | string         |               |
| notExpandable | Disables the context-props, which causes expandable Items to not open. Could improve performance if expandable Items are not used | bool           | false         |
| children      | All components that should be rendered inside the List                                                                            | React-Elements | _required_    |

# Props of ListItem

| Property         | Description                                                                                                                              | Type           | Default Value      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------ |
| title            | Title that should be rendered on the item                                                                                                | React-Elements | _required_         |
| subtitle         | Second title (subtitle) that should be rendered on the item                                                                              | React-Elements |                    |
| image            | Image that should be rendered to the left of the title                                                                                   | String         |                    |
| images           | Images that should be rendered to the left of the title like a puzzle.                                                                   | String-Array   |                    |
| icon             | Icon that should be rendered to the left of the title                                                                                    | String/Object  |                    |
| hideIndicator    | Remove the opening icon from the left                                                                                                    | bool           |                    |
| className        | ClassName that should be set on the ListItem root element                                                                                | String         |                    |
| onClick          | onClick-Listener that should be set on the item                                                                                          | Function       |                    |
| onOpen           | onOpen-Listener that should be set on the item                                                                                           | Function       |                    |
| onClose          | onClose-Listener that should be set on the item                                                                                          | Function       |                    |
| children         | Children that should be shown, when clicked on the item (works only inside Lists that does not have the notExpandable-prop set)          | React-Elements |                    |
| right            | React-Elements that should be rendered on the right side of the ListItem. You can use an array to get the elements on top of each other. | React-Elements |                    |
| noContentClass   | Prevents adding the "list-item\_\_content"-Class to the children wrapper.                                                                | bool           | false              |
| open             | Opening state of the item. true=open, false=close, null=uncontrolled                                                                     | bool           | false              |
| style            | ListItem styles.                                                                                                                         | Object         |                    |
| style.head       | Styles only applied to the head of the ListItem                                                                                          | Object         |                    |
| style.body       | Styles only applied to the body of the ListItem                                                                                          | Object         |                    |
| headerProps      | Props applied to the head of the ListItem                                                                                                | Object         |                    |
| defaultOpen      | default opening state                                                                                                                    | bool           | false              |
| circle           | renders the image/icon as a circle                                                                                                       | bool           | false              |
| hoverItem        | item which is shown on the right side of the item on hover                                                                               | node           | null               |
| onLongPress      | event which gets triggered on long press                                                                                                 | func           | false              |
| longPressTimeout | press duration for the onLongPress event                                                                                                 | number         | 450                |
| onMouseDown      | onMouseDown event                                                                                                                        | func           | null               |
| onMouseMove      | onMouseMove event                                                                                                                        | func           | null               |
| onMouseUp        | onMouseUp event                                                                                                                          | func           | null               |
| onTouchStart     | onTouchStart event                                                                                                                       | func           | null               |
| onTouchMove      | onTouchMove event                                                                                                                        | func           | null               |
| onTouchEnd       | onTouchEnd event                                                                                                                         | func           | null               |
| onTouchCancel    | onTouchCancel event                                                                                                                      | func           | null               |
| imageBorderColor | image border color                                                                                                                       | string         | nearly transparent |

## Example

You can take a look at the
[examples/react-chayns-list](/examples/react-chayns-list/) folder in this
repository. There you can find some suggestions for implementing some use-cases
of the **List**-Component.
