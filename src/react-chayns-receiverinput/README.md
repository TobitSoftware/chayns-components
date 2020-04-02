# ReceiverInput *(deprecated)*

**The ReceiverInput is deprecated. Use the multiple personFinder instead.**

The ReceiverInput-Component is part of the *chayns-components*-Package. You can install it with the following command:

    npm install -S chayns-components@latest

## Usage
You have to import the component first:

```jsx harmony
import { ReceiverInput } from 'chayns-components';
```

You can use the ReceiverInput as followed:
```jsx harmony
<ReceiverInput/>
```

## Props
You can set the following props on a ReceiverInput element:

| Property                | Description                                                         | Type     | Default     |
| ----------------------- | ------------------------------------------------------------------- | -------- | ----------- |
| onChosenReceiverChange  | This function will be called if the chosen receivers were changed   | function | *null*      |
| onGroupNameChange       | This function will be called if the group name was changed          | function | *null*      |
| preselectedReceivers    | These receivers will be set to initial state of chosen receivers    | array    | *null*      |
| maxReceiverCount        | Maximum count of choseable receivers                                | number   | *null*      |
| fontFamily              | Defines the fontFamily of the input field                           | string   | *null*      |
| fontSize                | Defines the fontSize of the input field                             | string   | *null*      |
| placeholder             | Sets a placeholder to the input field                               | string   | ''          |
| groupNameEnabled        | Shows input field for group name if min. 2 receivers selected       | boolean  | false       |
| includeIntercomDisabled | Shows locations with disabled intercom in result list               | boolean  | false       |
| addPageOffset           | Adds pageYOffset for search result to show at correct position      | boolean  | false       |
| onlyPersons             | Hides sites in result of finder                                     | boolean  | false       |
| onlySites               | Hides persons in result of finder                                   | boolean  | false       |
| locationMode            | Shows groups in result of finder and prevents choosing own location | boolean  | false       |
| canFindOwn              | Shows own person or chayns site in results for search               | boolean  | false       |
| pureMode                | Displays input field without border and padding                     | boolean  | false       |
| disabled                | Disables the input field                                            | boolean  | false       |
| showIdInSelection       | Shows personId/siteId in selection                                  | boolean  | false       |
| showIdInPopup           | Shows personId/siteId in popup                                      | boolean  | false       |

> **Information:** All the properties are optional. The default value for each property 
> is shown in the table above.

> **Warning:** If both `onlyPersons` and `onlySites` are `true`, 
> the ReceiverInput does not display any results in the popup.

### Preselected receivers
The preselectedReceivers for the input can be set with the `preselectedReceivers` property. The value must be given
in the following syntax:
```javascript
   const preselectedReceivers = [{
        userId: 1124187,
        name: 'Jannik Weise'
    }, {
        locationId: 81445,
        name: 'Application Team DEV'
    }, {
        groupId: 1,
        name: 'chayns® Manager',
        includedUsers: ['1124187', '...'] // userIds of persons in group
    }];
```

### Window functions
There are some functions given on `window` to get information from `ReceiverInput` or reset its values. The following
functions can be used:

| **Function**              | **Description**                                                    |
| ------------------------- | ------------------------------------------------------------------ |
| window.getChosenReceivers | Returns all chosen receivers                                       |
| window.getGroupName       | Returns the value of group name input                              |
| window.clearReceiverInput | Clears chosen receivers and values for search and group name input |

## Example
```jsx harmony
<ReceiverInput
    onChosenReceiverChange={(chosenReceivers) => { console.log(chosenReceivers); }}
    onGroupNameChange={(groupName) => { console.log(groupName); }}
    groupNameEnabled={true}
    placeholder="Test me!"
    maxReceiverCount={3}
    canFindOwn={true}
/>
```
