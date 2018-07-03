# Gallery

The Gallery is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage of the Gallery
The input has to be imported:

```jsx
import { Gallery } from 'chayns-components';
import 'chayns-components/lib/react-chayns-gallery/index.css';
```


You can use the input like this:
```jsx
<Gallery
    urls={['https://tsimg.space/v1/images/6ffbd340-a77b-e811-80d6-0025905a8161.jpg', 'https://tsimg.space/v1/images/c9a8d7ad-ee72-e811-80d6-0025905a8161.jpg','https://tsimg.space/v1/images/416b53f0-ee72-e811-80d6-0025905a8161.jpg'https://tsimg.space/v1/images/416b53f0-ee72-e811-80d6-0025905a8161.jpg]} 
    onlyIcon
/>
```


## Props
The following properties can be set on the EmojiInput-Component

| **Property** | **Description**                                      | **Type** | **Default Value** | **Required** |
| ------------ | ---------------------------------------------------- | -------- | ----------------- | ------------ |
| urls         | The Images which should be displayed                 | array    |                   | true         |
| onlyIcon     | Show only an icon, if there is more then three images| bool     | false           | true         |
