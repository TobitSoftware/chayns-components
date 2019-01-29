# FileUpload #

The FileUpload-Component is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage ##

At first the component needs to be imported:

```jsx harmony
import { FileUpload } from 'chayns-components';
```

The component can be used in JSX like in the following example:

```jsx harmony
<FileUpload onUpload={(url) => console.log(url)} />
```


## Props ##
| Property          | Description                                                                | Type          | Default Value |
|-------------------|----------------------------------------------------------------------------|---------------|---------------|
| onChange          | Callback-function (parameter: files, validFiles, invalidFiles)             | Function      |               |
| type              | Allowed types (currently supported: all, image, audio, video)              | String        | all           |
| multiple          | Enables/Disables upload of multiple files                                  | Bool          | true          |
| className         | CSS-classes that should be set on root-element                             | String        |               |
| uploadText        | Text that should be shown on button                                        | String        |               |
| disableListeners  | Disables all event listeners                                               | Bool          | false         |
| onDrop            | Registers a custom onDrop-Listener (prevents default handling)             | Function      |               |
| onClick           | Registers a custom onClick-Listener (prevents default handling)            | Function      |               |
| onUpload          | Uploads file and return the url. Only for images.                          | Function      |               |
| children          | Component(s) that should be rendered inside component                      | ReactElements |               |
| customIcon        | CustomIcon that should be rendered inside component                        | string/object |               |
| types             | Array for different upload types. Overwrites existing props for each type. | Array         |               |

## Example ##

You can take a look at the **examples** folder in the **react-chayns-upload** repository. There you can find an appropriate way of implementing the **FileUpload** to your chayns-Tapp.
