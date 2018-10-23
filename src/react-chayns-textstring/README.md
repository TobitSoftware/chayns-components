# TextString #

The TextString-Component loads, renders and changes your textString. It can also replace your replacements.

If you are a Tobit.Software worker in the tobit.ag network, you are able to change textStrings using CTRL+Click on a textString.


## Usage ##

At first the component has to be imported:

```jsx harmony
import { TextString } from 'chayns-components';
```

Then, you need to load your lib before your components are rendered:
```jsx harmony
TextString.loadLibrary('TextStringTest').then(() => {
        ReactDom.render(
            <App />,
            document.querySelector('#tapp')
        );
    });
```

Then it can be used like in the following example:
```jsx harmony
    <TextString
        stringName="txt_chayns_textStringTest"
        replacements={{ '##REPLACE##': chayns.env.user.name }}
        fallback={"Test ##REPLACE##"}
    >
        <p style={{ color: 'red' }} />
    </TextString>
```

If you need the textString as a string, e.g. for a dialog, you can use the static method `TextString.getTextString(stringName)`.


## Props ##

| Property   | Description                                                                            | Type     |
|------------|----------------------------------------------------------------------------------------|----------|
| stringName  | Name of the string.                                                                   | String   |
| replacements | Replacements in an object                                                            | object   |
| children    | Children where the textString will be rendered into.                                  | node     |
| fallback    | Fallback string.                                                                      | string   |
| useDangerouslySetInnerHTML | Use dangerouslySetInnerHTML (for strings with HTML content).           | bool     |
| language | Language of the string (language need to be loaded before usage)                         | string   |


## Example ##

You can take a look at the **examples** folder in the **react-chayns-textstring** repository. There you can find an appropriate way of implementing the **TextString** to your chayns-Tapp.
