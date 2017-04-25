# Tapp - Setup Wizard #

The **Swiper** - Component is part of the **tobit-chayns_component** package. You can install the whole package with the following statement:

    npm install -D tobit-chayns_components@latest

## Use ##


You have to import the components itself, the styles from the npm-package (to fit the chayns-design) and the swiper files itself (style and javascript, maybe from cdnjs).

The swiper-files itself should be 'imported' in the index.html.

You could use it like this:
```jsx
import {Swiper, Swipe} from 'tobit-chayns_components/react-chayns-swiper';
import 'tobit-chayns_components/react-chayns-swiper/index.css';

return (
    <Swiper>
        <Swipe image="http://lorempixel.com/output/technics-q-g-640-480-1.jpg">
        </Swipe>
        <Swipe image="http://lorempixel.com/output/technics-q-g-640-480-7.jpg">
        </Swipe>
        <Swipe image="http://lorempixel.com/output/technics-q-g-640-480-4.jpg">
        </Swipe>
    </Swiper>
);
```


## Props ##
The components got the following properties:


**Swiper**:

| Property   | Description                                                                                        | Type   | Default |
|------------|-----------------------------------------------------------------------------------------------------|--------|-------|
| autoplay | delay before the next slide | number |        |
| loop | swipe from last item to first | bool | false |
| lazyLoading | swiper should lazy load images | bool |  |
| preloadImages | preload the next slides | bool |  |
| setHeight | returns the height on a given width | func | function that returns the height in 16/9 format |
| overlay | node that could be set in front of the slider | node |  |



**Swipe**:

| Property   | Description                                                                                        | Type   |
|------------|-----------------------------------------------------------------------------------------------------|--------|
| image | image that should be in the background  | string |
| onClick | click-event callback  | function |