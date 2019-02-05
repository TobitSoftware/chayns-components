# Gallery

The Gallery is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage of the Gallery
The gallery has to be imported:

```jsx
import { Gallery } from 'chayns-components';
import 'chayns-components/lib/react-chayns-gallery/index.css';
```


You can use the gallery like this:
```jsx
<Gallery
    urls={['https://tsimg.space/v1/images/6ffbd340-a77b-e811-80d6-0025905a8161.jpg',
        'https://tsimg.space/v1/images/c9a8d7ad-ee72-e811-80d6-0025905a8161.jpg',
        'https://tsimg.space/v1/images/416b53f0-ee72-e811-80d6-0025905a8161.jpg',
        'https://tsimg.space/v1/images/416b53f0-ee72-e811-80d6-0025905a8161.jpg']} 
/>
```


## Props
The following properties can be set on the Gallery-Component

| **Property** | **Description**                                      | **Type** | **Default Value** | **Required** |
| ------------ | ---------------------------------------------------- | -------- | ----------------- | ------------ |
| urls         | The Images which should be displayed                 | array    |                   | true         |
| onClick      | Called when clicked on a image                       | func     | chayns.openImage  |              |
| deleteMode   | Enables the delete mode                              | bool     | false             |              |
| onDelete     | Called when clicked on a delete icon                 | func     |                   |              |
| height       | Height of the gallery in px, not used in deleteMode  | number   | 428 (mobile 256)  |              |
| width        | Width of the gallery in px                           | number   | 100%              |              |
