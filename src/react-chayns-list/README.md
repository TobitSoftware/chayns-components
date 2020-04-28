# List

The List-Component is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage ##

The List and ListItem has to be imported:

```jsx harmony
import { List, ListItem } from 'chayns-components';
```

You can use the List like this:

````jsx harmony
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
````

# Props of List

| Property      | Description                                                                                                                       | Type           | Default Value |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------|----------------|---------------|
| className     | ClassName that should be set on the List-Component                                                                                | string         |               |
| notExpandable | Disables the context-props, which causes expandable Items to not open. Could improve performance if expandable Items are not used | bool           | false         |
| children      | All components that should be rendered inside the List                                                                            | React-Elements | *required*    |

# Props of ListItem

| Property      | Description                                                                                                                     | Type           | Default Value |
|---------------|---------------------------------------------------------------------------------------------------------------------------------|----------------|---------------|
| title         | Title that should be rendered on the item                                                                                       | React-Elements | *required*    |
| subtitle      | Second title (subtitle) that should be rendered on the item                                                                     | React-Elements |               |
| image         | Image that should be rendered to the left of the title                                                                          | String         |               |
| icon          | Icon that should be rendered to the left of the title                                                                           | String/Object  |               |
| hideIndicator | Remove the opening icon from the left                                                                                           | bool           |               |
| className     | ClassName that should be set on the ListItem root element                                                                       | String         |               |
| onClick       | onClick-Listener that should be set on the item                                                                                 | Function       |               |
| onOpen        | onOpen-Listener that should be set on the item                                                                                  | Function       |               |
| onClose       | onClose-Listener that should be set on the item                                                                                 | Function       |               |
| children      | Children that should be shown, when clicked on the item (works only inside Lists that does not have the notExpandable-prop set) | React-Elements |               |
| right         | React-Elements that should be rendered on the right side of the ListItem                                                        | React-Elements |               |
| noContentClass | Prevents adding the "list-item__content"-Class to the children wrapper.                                                        | bool           | false         |
| open          | Opening state of the item. true=open, false=close, null=uncontrolled                                                            | bool           | false         |
| style         | ListItem styles.                                                                                                                | Object         |               |
| style.head    | Styles only applied to the head of the ListItem                                                                                 | Object         |               |
| style.body    | Styles only applied to the body of the ListItem                                                                                 | Object         |               |
| headerProps   | Props applied to the head of the ListItem                                                                                       | Object         |               |

## Example ##

You can take a look at the [examples/react-chayns-list](/examples/react-chayns-list/) folder in this repository.
There you can find some suggestions for implementing some use-cases of the **List**-Component.

