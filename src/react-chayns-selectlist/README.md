# SelectList #

The SelectList-Component is part of the *chayns-components*-Package. You can install it with the following command:

    npm install -S chayns-components@latest


## Usage ##

The package has two components included: SelectList and SelectListItem
You have to import the components and styles first:

```jsx harmony
import { SelectList, SelectListItem } from 'chayns-components';
```

You can now use the components as followed:
```jsx harmony
<SelectList>
	<SelectListItem id="1" name="Hello World">
		<div>
			Hello World!
		</div>
	</SelectListItem>

	<SelectListItem id="2" name="Hello World 2">
		<div>
			Hello World 2!
		</div>
	</SelectListItem>
</SelectList>
```

The SelectList only shows valid SelectItems (they need at least the following props: id, name)


## Props (SelectList) ##
You can set the following props on a SelectList element:

| Property     | Description                                                                   | Type        | Default      |
|--------------|-------------------------------------------------------------------------------|-------------|--------------|
| onChange     | Callback that will be triggered when the selection changes                    | function    |              |
| defaultValue | Sets the id of an element that should be preselected                          | string, int |              |
| selectFirst  | Automatically select the first entry, triggers onChange-callback (deprecated) | boolean     |  false       |
| className    | Sets the css-class of the selectlist                                          | boolean     |  false       |


## Props (SelectItem) ##
You can set the following props on a SelectList element:

| Property  | Description                                                                                         | Type            | Default    |
|-----------|-----------------------------------------------------------------------------------------------------|-----------------|------------|
| id        | The id of the item, will be send to onChange-callback and used in defaultId prop of the SelectList  | string, int     | *required* |
| name      | Sets the id of an element that should be preselected                                                | string          | *required* |
| className | Sets the css-class of the parent element above the radiobutton                                      | boolean         | false      |
| value     | Additional information of the item.                                                                 | object, array   | null       |
| tooltipProps | Props to use a tooltip around the radio button.                                                  | object, array   | null       |


## Example ##

You can take a look at the **examples** folder in the **react-chayns-selectlist** repository. There you can find an appropriate way of implementing the **SelectList** to your chayns-Tapp.
