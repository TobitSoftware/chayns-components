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
<FileUpload/>
```

## Props ##
| Property          | Description                                                                | Type          | Default Value |
|-------------------|----------------------------------------------------------------------------|---------------|---------------|
| className         | CSS-classes that should be set on root-element                             | String        |               |
| style             | Styles that should be set on root-element                                  | Object        |               |
| stopPropagation   | Stops the click propagation to parent elements                             | bool          | false         |
| disabled          | Disables the FileUpload                                                    | bool          | false         |
| items             | Items of the FileUpload                                                    | array         | false         |
| errorMessages     | Error message strings.                                                     | object        | false         |

### Items ###
| Property          | Description                                                                | Type          | Default Value |
|-------------------|----------------------------------------------------------------------------|---------------|---------------|
| className         | CSS-classes that should be set on the item                                 | String        |               |
| style             | Styles that should be set on the item                                      | Object        |               |
| disabled          | Disables the item                                                          | bool          | false         |
| onChange          | Callback-function (parameter: validFiles, invalidFiles)                    | Function      |               |
| onClick           | Callback-function                                                          | Function      |               |
| types             | Array of allowed mime-types (FileUpload.types)                             | array         | [*]           |
| maxNumberOfFiles  | Maximum number of files that can be uploaded at once. (0=infinity)         | number        | 0             |
| maxFileSize       | Maximum size per file. (0=infinity, in bytes)                              | number        | 0          |
| content.text      | Text that should be shown on button                                        | String        |               |
| content.icon      | Icon that should be shown on button                                        | String/object |               |
| content.children  | JSX that should be shown on button                                         | node          |               |

### ErrorMessages ###
| Property          | Description                                                                | Type          | Default Value |
|-------------------|----------------------------------------------------------------------------|---------------|---------------|
| tooMuchFiles      | User has chosen too much files                                             | String        |               |
| fileTooBig        | User has chosen a file which is bigger than maxFileSize                    | String        |               |
| wrongFileType     | User has chosen a file with wrong file type                                | String        |               |


## Example ##

You can take a look at the **examples** folder in the **react-chayns-upload** repository. There you can find an appropriate way of implementing the **FileUpload** to your chayns-Tapp.
