# FileInput #

The FileInput-Component is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage ##

At first the component needs to be imported:

```jsx harmony
import { FileInput } from 'chayns-components';
```

The component can be used in JSX like in the following example:

```jsx harmony
<FileInput/>
```

## Props ##
| Property          | Description                                                                | Type          | Default Value |
|-------------------|----------------------------------------------------------------------------|---------------|---------------|
| className         | CSS-classes that should be set on root-element                             | string        |               |
| style             | Styles that should be set on root-element                                  | object        |               |
| stopPropagation   | Stops the click propagation to parent elements                             | bool          | false         |
| disabled          | Disables the FileInput                                                     | bool          | false         |
| items             | Items of the FileInput                                                     | array         | false         |
| errorMessages     | Error message strings.                                                     | object        | false         |

### Items ###
| Property          | Description                                                                | Type          | Default Value |
|-------------------|----------------------------------------------------------------------------|---------------|---------------|
| className         | CSS-classes that should be set on the item                                 | string        |               |
| style             | Styles that should be set on the item                                      | object        |               |
| disabled          | Disables the item                                                          | bool          | false         |
| onChange          | Callback-function (parameter: validFiles, invalidFiles)                    | function      |               |
| onClick           | Callback-function                                                          | function      |               |
| types             | Array of allowed mime-types (FileInput.types)                              | array         | [*]           |
| maxNumberOfFiles  | Maximum number of files that can be uploaded at once. (0=infinity)         | number        | 0             |
| maxFileSize       | Maximum size per file. (0=infinity, in bytes)                              | number        | 0             |
| fileInputRef      | Reference to file input. Allows you to clear the input.                    | function      |               |
| content.text      | Text that should be shown on button                                        | string        |               |
| content.icon      | Icon that should be shown on button                                        | string/object |               |
| content.children  | JSX that should be shown on button                                         | node          |               |

### ErrorMessages ###
| Property          | Description                                                                | Type          | Default Value |
|-------------------|----------------------------------------------------------------------------|---------------|---------------|
| tooMuchFiles      | User has chosen too much files                                             | string        |               |
| fileTooBig        | User has chosen a file which is bigger than maxFileSize                    | string        |               |
| wrongFileType     | User has chosen a file with wrong file type                                | string        |               |

## Uploading images ##
To Upload images to our new ImageService, you can use the imageUpload-function from the utils folder. It accepts image URLs and files with a maximum size of 4 MB.
To avoid accidentally removal of an image, you may add a reference. When an image gets deleted, you can also add a reference. The file will only be deleted, if no other references are left.

## Example ##

You can take a look at the **examples** folder in the **react-chayns-file_input** repository. There you can find an appropriate way of implementing the **FileInput** to your chayns-Tapp.
