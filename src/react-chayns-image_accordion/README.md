# ImageAccordion

The ImageAccordion is part of the *chayns-components* package. It can be installed via npm:
```
npm install -S chayns-components@latest
```

## Usage

The package has two components included: ImageAccordionGroup and ImageAccordion You have to import the components and styles first:

```jsx harmony
import { ImageAccordionGroup, ImageAccordion } from 'chayns-components';
```

You can use the ImageAccordion like in the [example](https://github.com/TobitSoftware/chayns-components/blob/master/examples/react-chayns-image_accordion/Example.jsx).

## Props (ImageAccordionGroup)

You can set the following props on an ImageAccordionGroup element:

| Property     | Description                                                            | Type                       | Default Value |
|--------------|------------------------------------------------------------------------|----------------------------|---------------|
| dataGroup    | ImageAccordionGroup group. ImageAccordion of one group close each other on opening | String         |               |
| onHeadOpen   | On ImageAccordion open event                                           | Function                   |               |

## Props (ImageAccordion)

| Property     | Description                                                            | Type                       | Default Value |
|--------------|------------------------------------------------------------------------|----------------------------|---------------|
| headline     | HeadLine of the ImageAccordion                                         | string                     |               |
| subheadline  | subHeadLine of the ImageAccordion                                      | string                     |               |
| image        | Image of the ImageAccordion                                            | string                     |               |
| circle       | Rounded image                                                          | bool                       | false         |
| disabled     | ImageAccordion with lower opacity                                      | bool                       | false         |
| icon         | Icon of the ImageAccordion                                             | React-Element              |               |
| iconPosition | Position of the icon                                                   | number                     | 0             |
| onOpen       | On open event                                                          | Function                   |               |

