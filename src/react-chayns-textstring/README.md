# TextString-Component #

The TextString-Component is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage ##
At first the component needs to be imported:

```jsx
import { TextString } from 'chayns-components';
```

The component can be used in JSX like in the following example:
```jsx
<TextString textString="txt_mein_textstring" />
```


## Props ##
| Property   | Description                                                                                         | Type   | Default Value |
|------------|-----------------------------------------------------------------------------------------------------|--------|---------------|
| textString | Name of the textstring (i.e. txt_rating_intro)                                                      | String |               |
| renderHtml | Render the textstring as HTML                                                                       | Bool   | false         |
| replace    | eplace placeholders with the given value                                                            | Object |               |
| render     | Auto-render textstrings if they were set as an HTML attribute                                       | Bool   | true          |


## Example ##
### Replacing Variables ###
```jsx
<TextStrings
    textString="txt_rating"
    replace={{
        '##location_id##': window.chayns.env.site.locationId,
        '##site_id##': window.chayns.env.site.id
    }}
/>
```


### Usage of HTML###
To use HTML in an textstring it has to be activated in the component.
```jsx
<TextStrings
    textString="txt_rating"
    renderHtml
/>
```