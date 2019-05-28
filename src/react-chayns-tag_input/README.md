# TagInput

The TagInput is part of the *chayns-components* package. It can be installed via npm:
```
npm install -S chayns-components@latest
```

## Usage

The input has to be imported:

```jsx harmony
import { TagInput } from 'chayns-components';
```

You can use the input like this:

```jsx harmony
<TagInput
    placeholder="Input tag and hit ENTER"
    onAddTag={this.handleTagAdd}
    onRemoveTag={this.handleTagRemove}
    onChange={this.handleChange}
    value={this.state.value}
    tags={this.state.tags}
/>
```

You have to handle the state (tags + value of the input) within your application to control the input.


## Props

The following properties can be set on the TagInput-Component

| Property     | Description                                                                      | Type            | Default Value |
|--------------|----------------------------------------------------------------------------------|-----------------|---------------|
| tags         | All tags that should be displayed (array of { text: '\<text\>' })                | array<{ text }> | *required*    |
| value        | The value of the input that is beside the tags                                   | string          | *required*    |
| onChange     | Callback that is triggered when the user writes inside the input beside the tags | func            | *required*    |
| onAddTag     | Callback that is triggered when the user adds a new tag (hits ENTER)             | func            | *required*    |
| onRemoveTag  | Callback that is triggered when the user removes a tag                           | func            | *required*    |
| placeholder  | Text that should be shown when there is no tag and text inside the input         | string          |               |


## Example ##

You can take a look at the **examples/react-chayns-tag_input** folder in this repository. There you can find an appropriate way of implementing the **TagInput** to your chayns-Tapp.
