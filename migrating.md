# Migrating from v2 to v4

1. Update the package `chayns-components` to its latest version
```bash
npm install chayns-components@latest -S
```

2. Use the new chayns® API v4 instead of v3.1
```html
<!-- CSS-API -->
<!--<link rel="stylesheet" href="//chayns-res.tobit.com/API/V3.1/css/chayns.min.css">-->
<link rel="stylesheet" href="https://api.chayns.net/css/">

<!-- JS-API -->
<!--<script src="https://chayns-res.tobit.com/API/V3.1/js/chayns.min.js"></script>-->
<script src="https://api.chayns-static.space/js/chayns.min.js"></script>

<!-- chaynsLangRes -->
<!--<script src="//chayns-res.tobit.com/API/v3/intern/chaynsLangRes/js/chaynsLangRes.js"></script>-->
<script src="https://api.chayns-static.space/lang/js/chaynsLangRes.min.js"></script>
<script src="https://api.chayns-static.space/translate/js/chaynsTranslate.min.js"></script>

<!-- chaynsTime -->
<!--<script src="https://chayns-res.tobit.com/API/v3/intern/chaynsTime/js/chaynsTime.min.js"></script>-->
<!--Use moment.js instead-->
```

3. Remove your Font Awesome css and install instead fortawesome library packages
```html
<!--<link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">-->
```

If you have a Font Awesome pro token, you can use the pro version:

**Notice:** You need to [set the pro token in your npm config](https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers#installing-pro) to install pro packages.

```bash
npm i --save @fortawesome/pro-solid-svg-icons @fortawesome/pro-regular-svg-icons @fortawesome/pro-light-svg-icons @fortawesome/free-brands-svg-icon
```

Otherwise, you can install the free version:

```bash
npm i --save @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icon
```

4. Replace your icons with the new Icon-Component
```jsx
import { faRocket } from '@fortawesome/free-solid-svg-icons'; /**Solid Style*/

<!--<i class="fa fa-rocket" aria-hidden="true"></i>-->
<!--<i class="ts-tobit" aria-hidden="true"></i>-->

<Icon icon={faRocket}/>
<Icon icon="ts-tobit"/>
```

5. Replace color classes

API v3 classes:
- .chayns__background-color--[0;100]
- .chayns__color--[0;100]
- .chayns__border-color--[0;100]

API v3 classes:
- .chayns__background-color--white-[0;6]
- .chayns__color--white-[0;6]
- .chayns__border-color--white-[0;6]

- .chayns__background-color--light-[0;4]
- .chayns__color--light-[0;4]
- .chayns__border-color--light-[0;4]

- .chayns__background-color--medium-[0;4]
- .chayns__color--medium-[0;4]
- .chayns__border-color--medium-[0;4]

- .chayns__background-color--dark-[0;3]
- .chayns__color--dark-[0;3]
- .chayns__border-color--dark-[0;3]

- .chayns__background-color--green-[0;4]
- .chayns__color--green-[0;4]
- .chayns__border-color--green-[0;4]

- .chayns__background-color--red-[0;4]
- .chayns__color--red-[0;4]
- .chayns__border-color--red-[0;4]

- .chayns__background-color--yellow-[0;4]
- .chayns__color--yellow-[0;4]
- .chayns__border-color--yellow-[0;4]

6. Check all styles

7. Change [Modeswitch](/src/react-chayns-modeswitch/) to component

```jsx
<ModeSwitch 
    modes={[{
        id: 1,
        uacIds: [1],
        name: 'chayns-Manager'
    }]}
    save
    onChange={console.log}
/>
```

## Other components

###Accordion
New Props: 
- icon: The icon shown on the left of accordion head.
- noRotate: Disable rotating of the icon.

###AmountControl
Removed shopStyle.

New Props:
- icon: Icon shown if amount is zero.
- iconColor: Color of the icon.
- addColor: Color of the add-icon.
- removeColor: Color of the remove-icon.
- focusOnClick: Enables the input autoFocus.

###Button
New Props:
- icon: Icon shown in the button.
- secondary: Renders Button as a secondary button.

###Combobox
New Component

###Contextmenu
New Component

###Icon
New Component

###Input/DynamicInput

###ModeSwitch/Mode
Props changed:
group/groups/mode/modes => modes

Removed ModeSwitch Functions:
- hide
- show
- isUserInGroup
- isChaynsManager

###SmallWaitCursor
Removed Props:
- absolute (you can use the style tag instead)

New Props:
- showBackground

###Tooltip
New Props:
- content: content of the tooltip (see Readme)
- removeIcon: Show X icon in the upper right corner
- width: Width of the tooltip
- position: Position of the tooltip

###Upload
New Props:
- customIcon: Icon shown in the component



# Migrating from v1 to v2

1. Remove the package `tobit-chayns_components`
```bash
npm remove tobit-chayns_components -S
```
2. Install the package `chayns-components`

```
npm install chayns-components
```

3. Change your old javascript imports
```javascript
// import COMPONENT from 'tobit-chayns_components/COMPONENT'; => v1

import { COMPONENT } from 'chayns-components'; // => v2

import { Input, Accordion, Checkbox } from 'chayns-components'; // example
```

4. Change your old css imports
```scss
 // import 'tobit-chayns_components/<component>/style.css'; => v1

 import 'chayns-components/lib/<component>/index.css'; // => v2
```

## Components

### Checkbox
Change staticChecked to checked
```jsx
// <Checkbox staticChecked={true} onChange={this.handleChange} /> => v1

<Checkbox checked={true} onChange={this.handleChange} /> // => v2
```

### Input
Change staticValue to value
```jsx
// <Input staticValue="Lorem ipsum" onChange={this.handleChange} /> => v1

<Input value="Lorem ipsum" onChange={this.handleChange} /> // => v2
```
Set the default-style manually (if needed):
```jsx
// <Input defaultValue="Lorem ipsum" /> => v1

<Input
       defaultValue="Lorem ipsum"
       style={{
             width: '100%',
             marginBottom: '5px'
       }}
/> // => v2
```

The behaviour of value-prop has changed on v2. Maybe you could use the defaultValue as alternative:
```jsx
// <Input value="Lorem ipsum" /> => v1

<Input defaultValue="Lorem ipsum" /> // => v2
```

### TextArea
You have to change your onChange-function on the TextArea:
```jsx
// <TextArea
//     defaultValue="Lorem ipsum"
//     onChange={(event) => {
//         console.log(event.target.value);
//     }}
// /> => v1

<TextArea
       defaultValue="Lorem ipsum"
       onChange={(value) => {
           console.log(value);
       }}
/> // => v2
```

### Wizard
You should add a title and description to your Wizard:
```jsx
// <SetupWizard
//     ready={this.ready}
// > => v1

<SetupWizard
    ready={this.ready}
    title="Wizard"
    description={'A wizard will be shown to setup the tapp.'}
> // => v2
```

You have to add `accordion__content` to your step's classNames and should use the function `stepComplete` to mark the step as completed. To mark a step as required, you simply have to add the `required` parameter to your `SetupWizardItem`. There is a callback `notComplete`, which is called when you call `nextStep` on a not-completed item.
````jsx
// static contextTypes = {
//     nextStep: PropTypes.func
// };
// 
// render() {
//     return(
//          <div>
//              <p>Lorem ipsum dolor sit amet...</p>
//              <div style={{ textAlign: 'center' }}>
//                  <div className="button" onClick={this.context.nextStep}>Next</div>
//              </div>
//          </div>
//     );
// } => v1

static contextTypes = {
    nextStep: PropTypes.func,
    stepComplete: PropTypes.func
};

render() {
    return (
        <div className="accordion__content">
            <p>Lorem ipsum dolor sit amet...</p>
            <div style={{ textAlign: 'center' }}>
                <div
                    className="button"
                    onClick={() => {
                        this.context.stepComplete(true);
                        this.context.nextStep();
                    }}
                >
                    Next
                </div>
            </div>
        </div>
    );
} // => v2
```
