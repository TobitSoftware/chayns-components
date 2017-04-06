# SelectList-Component #

The SelectList-Component is part of the *tobit-chayns_components*-Package. You can install it with the following command:

    npm install --save-dev tobit-chayns_components


## Usage ##
The package has two components included: SelectList and SelectListItem
You have to import the components and styles first:

```jsx
import {SelectList, SelectListItem} from 'tobit-chayns_components/react-chayns-selectlist';
import 'tobit-chayns_components/react-chayns-selectlist/index.css';
```


You can now use the components as followed:
```jsx
<SelectList>
	<SelectItem id="1" name="Hello World">
		<div>
			Hello World!
		</div>
	</SelectItem>

	<SelectItem id="2" name="Hello World 2">
		<div>
			Hello World 2!
		</div>
	</SelectItem>
</SelectList>
```

The SelectList only shows valid SelectItems (they need at least the following props: id, name)

### Props (SelectList) ###
You can set the following props on a SelectList element:

| Property   | Description                                                                                        | Type    | Default |
|------------|-----------------------------------------------------------------------------------------------------|--------|--------------|
| onChange | Callback that will be triggered when the selection changes                                                 | function |  |
| defaultId | Sets the id of an element that should be preselected                                                           | string, int |  |
| selectFirst | Automatically select the first entry, triggers onChange-callback                                                          | boolean |  false            |
| className | Sets the css-class of the selectlist                                                         | boolean |  false            |


### Props (SelectItem) ###
You can set the following props on a SelectList element:

| Property   | Description                                                                                        | Type    | Default |
|------------|-----------------------------------------------------------------------------------------------------|--------|--------------|
| id | The id of the item, will be send to onChange-callback and used in defaultId prop of the SelectList                                                 | string, int | *required* |
| name | Sets the id of an element that should be preselected                                                           | string | *required* |
| className | Sets the css-class of the parent element above the radiobutton                                                         | boolean |  false            |

### Beispiele ###
#### defaultId ####
You can set a defaultId. In the following example, the second item will be selected and "hello2" will be printed to the console.
```jsx
<SelectList onChange={(id) => {
				console.log(id);
			}}
			defaultId="hello2">
			
	<SelectItem id="hello1"
				name="Hello World">
				
		<div>
			Hello World!
		</div>
	</SelectItem>

	<SelectItem id="hello2"
				name="Hello World 2">
				
		<div>
			Hello World 2!
		</div>
	</SelectItem>

</SelectList>
```
#### selectFirst ####
The following example will select the first valid item from the SelectList and output "hello3" to the console:
```jsx
<SelectList onChange={(id) => {
				console.log(id);
			}}
			selectFirst={true}>
			
	<div>Hallo</div>

	<SelectItem id="hello2">	
		<div>
			Hello World 2!
		</div>
	</SelectItem>

	<SelectItem id="hello3"
				name="Hello World 3">
				
		<div>
			Hello World 3!
		</div>
	</SelectItem>

</SelectList>
```