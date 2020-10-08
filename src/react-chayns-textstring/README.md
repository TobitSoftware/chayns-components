# TextString

The TextString-Component loads, renders and changes your textString. It can also
replace your replacements.

If you are a Tobit.Software worker in the tobit.ag network, you are able to
change textStrings using CTRL+Click on a textString.

## Usage

At first the component has to be imported:

```jsx harmony
import { TextString } from 'chayns-components';
```

Then, you need to load your lib before your components are rendered:

```jsx harmony
TextString.loadLibrary('TextStringTest').then(() => {
    ReactDom.render(<App />, document.querySelector('#tapp'));
});
```

After this, it can be used like in the following example:

```jsx harmony
<TextString
    stringName="txt_chayns_textStringTest"
    replacements={{ '##REPLACE##': chayns.env.user.name }}
    fallback={'Test ##REPLACE##'}
>
    <p style={{ color: 'red' }} />
</TextString>
```

If you need the textString as a string, e.g. for a dialog, you can use the
static method `TextString.getTextString(stringName)`. Note that changing the
textString via STRG+Click is not available with this function.

There is a working example in the examples folder. Take a look at it to learn
more about the usage of the TextString component:

-   [index.jsx](https://github.com/TobitSoftware/chayns-components/blob/master/examples/index.jsx)
    (loading libraries)
-   [Example.jsx](https://github.com/TobitSoftware/chayns-components/blob/master/examples/react-chayns-textstring/Example.jsx)
    (usage of the React component)

## Props

| Property                   | Description                                                                                         | Type   |
| -------------------------- | --------------------------------------------------------------------------------------------------- | ------ |
| stringName                 | Name of the string.                                                                                 | String |
| replacements               | Replacements in an object                                                                           | object |
| children                   | Children where the textString will be rendered into.                                                | node   |
| fallback                   | Fallback string.                                                                                    | string |
| useDangerouslySetInnerHTML | Use dangerouslySetInnerHTML (for strings with HTML content).                                        | bool   |
| language                   | Language of the string (language need to be loaded before usage)                                    | string |
| setProps                   | StringNames for children Props e.g. placeholder or accordion head                                   | object |
| setProps.fallback          | Fallback strings for setProps                                                                       | object |
| preventNoTranslate         | Prevents setting no-translate class to children if textString language is the same as tapp language | bool   |
