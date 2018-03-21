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