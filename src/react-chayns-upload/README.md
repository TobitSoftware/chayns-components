# FileUpload-Component #

The FileUpload-Component is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage ##
At first the component needs to be imported:

```jsx
import { FileUpload } from 'chayns-components';
import 'chayns-components/lib/react-chayns-upload/index.css';
```

The component can be used in JSX like in the following example:
```jsx
<FileUpload onChange={(files) => console.log(files)} />
```


## Props ##
| Property   | Description                                                                | Type     | Default Value |
|------------|----------------------------------------------------------------------------|----------|---------------|
| onChange   | Callback-function (parameter: files, validFiles, invalidFiles)             | function |               |
| type       | Allowed types (currently supported: all, image, audio, video)              | String   | all           |
| multiple   | Enables/Disables upload of multiple files                                  | Bool     | true          |
| className  | CSS-classes that should be set on root-element                             | String   |               |


## Example ##
### single image upload ###
```jsx
<FileUpload
    multiple={false}
    type="images"
    onChange={(files, validFiles) => {
        console.log(`You have selected ${files.length} files of which ${validFiles.length} are valid`);
    }}
/>
```