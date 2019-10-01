# Gallery #

The Gallery is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest
    
## Features ##

- Display up to four images in default mode
- Accepts both files and URLs
- Blurred image previews while loading for tsimg.cloud images
- Reordering of the images via Drag & Drop in drag mode
- Deleting of images in delete mode

## Usage ##

The gallery has to be imported:

```jsx harmony
import { Gallery } from 'chayns-components';
```

You can use the gallery like in the examples:

- [Image upload preview with dragMode and deleteMode](https://github.com/TobitSoftware/chayns-components/blob/master/examples/react-chayns-file_input/Example.jsx)
- [Image gallery](https://github.com/TobitSoftware/chayns-components/blob/master/examples/react-chayns-gallery/Example.jsx)

## Gallery Props ##

The following properties can be set on the Gallery-Component

| **Property** | **Description**                                      | **Type** | **Default Value** | **Required** |
| ------------ | ---------------------------------------------------- | -------- | ----------------- | ------------ |
| className    | CSS-classes that should be set on root-element       | string   |                   |              |
| style        | Styles that should be set on root-element            | object   |                   |              |
| images       | The Images which should be displayed (file or url)   | array    |                   | true         |
| onClick      | Called when clicked on a image                       | func     | chayns.openImage  |              |
| deleteMode   | Enables the delete mode                              | bool     | false             |              |
| onDelete     | Called when clicked on a delete icon                 | func     |                   |              |
| dragMode     | Enables the drag mode                                | bool     | false             |              |
| onDragEnd    | Called on the end of each drag. Returns the new array. | func   |                   |              |
| height       | Height of the gallery in px, not used in deleteMode  | number   | width of the gallery |           |
| width        | Width of the gallery in px                           | number   | 100%              |              |
| stopPropagation | Stops the click propagation to parent elements    | bool     | false             |              |

### Image Props ###

The image shows automatically an preview of the image while the image is loading (only for tsimg.cloud images).

| **Property** | **Description**                                                          | **Type**    | **Default Value** | **Required** |
| ------------ | ------------------------------------------------------------------------ | ----------- | ----------------- | ------------ |
| image        | Image that will be displayed in the gallery (file or url)                | string      |                   | true         |
| onClick      | Called when clicked on the image                                         | string/File |                   |              |
| moreImages   | Shows the number on the image                                            | number      |                   |              |
| className    | CSS-classes that should be set on root-element                           | string      |                   |              |
| classNameLandscape| CSS-classes that should be set on root-element for landscape images | string      |                   |              |
| classNamePortrait | CSS-classes that should be set on root-element for portrait images  | string      |                   |              |
| style        | Styles that should be set on root-element                                | object      |                   |              |
| styleLandscape| Styles that should be set on root-element of landscape images           | object      |                   |              |
| stylePortrait | Styles that should be set on root-element of portrait images            | object      |                   |              |
| preventParams | Prevent parameters on loaded image, e.g. {width: true} to prevent w-param | object/bool|                  |              |

### ImageContainer Props ###

The imageContainer displays children in an 1:1 aspect ratio if height or padding-top are not given. It can also add a toolbar to the upper right corner.

| **Property** | **Description**                                                          | **Type**    | **Default Value** | **Required** |
| ------------ | ------------------------------------------------------------------------ | ----------- | ----------------- | ------------ |
| children     | Children                                                                 | Node        |                   | true         |
| tools        | Array of tools shown in the upper right corner                           | array       |                   |              |
| className    | CSS-classes that should be set on root-element                           | string      |                   |              |
| style        | Styles that should be set on root-element                                | object      |                   |              |
