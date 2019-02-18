# Gallery #

The Gallery is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage ##

The gallery has to be imported:

```jsx harmony
import { Gallery } from 'chayns-components';
```

You can use the gallery like in the examples:

- [Image upload preview](https://github.com/TobitSoftware/chayns-components/blob/master/examples/react-chayns-file_input/Example.jsx)
- [Image gallery](https://github.com/TobitSoftware/chayns-components/blob/master/examples/react-chayns-gallery/Example.jsx)

## Props ##

The following properties can be set on the Gallery-Component

| **Property** | **Description**                                      | **Type** | **Default Value** | **Required** |
| ------------ | ---------------------------------------------------- | -------- | ----------------- | ------------ |
| className    | CSS-classes that should be set on root-element       | string   |                   |              |
| style        | Styles that should be set on root-element            | object   |                   |              |
| images       | The Images which should be displayed                 | array    |                   | true         |
| onClick      | Called when clicked on a image                       | func     | chayns.openImage  |              |
| deleteMode   | Enables the delete mode                              | bool     | false             |              |
| onDelete     | Called when clicked on a delete icon                 | func     |                   |              |
| height       | Height of the gallery in px, not used in deleteMode  | number   | width of the gallery |              |
| width        | Width of the gallery in px                           | number   | 100%              |              |
| stopPropagation | Stops the click propagation to parent elements    | bool     | false             |              |

